<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::orderBy('name')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'role' => 'required|string|in:owner,admin,karyawan',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Guard: admin cannot create owner
        if (Auth::user()->role === 'admin' && $request->role === 'owner') {
            return back()->with('error', 'Admin tidak diperbolehkan membuat akun Owner.');
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'email_verified_at' => now(),
        ]);

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil ditambahkan.');
    }

    public function edit(User $user)
    {
        // Guard: admin cannot edit owner
        if (Auth::user()->role === 'admin' && $user->role === 'owner') {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,'.$user->id,
            'role' => 'required|string|in:owner,admin,karyawan',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        // Guard: admin cannot edit owner or promote to owner
        if (Auth::user()->role === 'admin' && ($user->role === 'owner' || $request->role === 'owner')) {
            return back()->with('error', 'Admin tidak diperbolehkan memodifikasi akun Owner.');
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('users.index')->with('success', 'Informasi pengguna berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        // Guard: admin cannot delete owner
        if (Auth::user()->role === 'admin' && $user->role === 'owner') {
            return redirect()->route('users.index')->with('error', 'Admin tidak diperbolehkan menghapus akun Owner.');
        }

        if (Auth::id() === $user->id) {
            return redirect()->route('users.index')->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil dihapus.');
    }

    public function verify(User $user)
    {
        $user->email_verified_at = now();
        $user->save();

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil diverifikasi.');
    }

    public function toggleStatus(User $user)
    {
        if (Auth::user()->role === 'admin' && $user->role === 'owner') {
            abort(403, 'Unauthorized action.');
        }

        if (Auth::id() === $user->id) {
            return back()->with('error', 'Tidak bisa menonaktifkan akun Anda sendiri.');
        }

        $user->update(['is_active' => !$user->is_active]);

        return back()->with('success', 'Status pengguna berhasil diperbarui.');
    }
}
