<?php

namespace App\Http\Controllers;

use App\Models\Mechanic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MechanicController extends Controller
{
    public function index()
    {
        return Inertia::render('Mechanics/Index', [
            'mechanics' => Mechanic::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Mechanics/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        Mechanic::create($request->all());

        return redirect()->route('mechanics.index')->with('success', 'Mechanic created successfully.');
    }

    public function edit(Mechanic $mechanic)
    {
        return Inertia::render('Mechanics/Edit', [
            'mechanic' => $mechanic
        ]);
    }

    public function update(Request $request, Mechanic $mechanic)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $mechanic->update($request->all());

        return redirect()->route('mechanics.index')->with('success', 'Mechanic updated successfully.');
    }

    public function destroy(Mechanic $mechanic)
    {
        $mechanic->delete();

        return redirect()->route('mechanics.index')->with('success', 'Mechanic deleted successfully.');
    }
}
