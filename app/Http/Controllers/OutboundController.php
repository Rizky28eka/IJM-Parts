<?php

namespace App\Http\Controllers;

use App\Models\Mechanic;
use App\Models\Outbound;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OutboundController extends Controller
{
    public function index()
    {
        $outbounds = Outbound::with(['mechanic', 'user', 'details.part'])
            ->orderBy('date', 'desc')
            ->latest()
            ->get()
            ->map(function ($outbound) {
                return [
                    'id'               => $outbound->id,
                    'reference_number' => $outbound->reference_number,
                    'date'             => $outbound->date,
                    'type'             => $outbound->type,
                    'license_plate'    => $outbound->license_plate,
                    'notes'            => $outbound->notes,
                    'mechanic'         => $outbound->mechanic?->name,
                    'user'             => $outbound->user?->name,
                    'total_items'      => $outbound->details->count(),
                    'total_qty'        => $outbound->details->sum('quantity'),
                ];
            });

        return Inertia::render('Outbound/Index', [
            'outbounds' => $outbounds,
        ]);
    }

    public function create()
    {
        return Inertia::render('Outbound/Create', [
            'mechanics' => Mechanic::orderBy('name')->get(['id', 'name']),
            'parts'     => Part::orderBy('name')->get(['id', 'name', 'sku', 'unit', 'stock']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'reference_number'   => 'nullable|string|max:255',
            'date'               => 'required|date',
            'type'               => 'required|in:sales,service,scrap',
            'license_plate'      => 'nullable|string|max:20',
            'mechanic_id'        => 'nullable|exists:mechanics,id',
            'notes'              => 'nullable|string',
            'items'              => 'required|array|min:1',
            'items.*.part_id'    => 'required|exists:parts,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        // Validate stock availability before committing anything
        foreach ($request->items as $item) {
            $part = Part::find($item['part_id']);
            if ($part->stock < $item['quantity']) {
                return back()->withErrors([
                    'items' => "Stok {$part->name} tidak mencukupi. Stok saat ini: {$part->stock} {$part->unit}.",
                ])->withInput();
            }
        }

        DB::transaction(function () use ($request) {
            $outbound = Outbound::create([
                'reference_number' => $request->reference_number,
                'date'             => $request->date,
                'type'             => $request->type,
                'license_plate'    => $request->license_plate,
                'mechanic_id'      => $request->mechanic_id,
                'notes'            => $request->notes,
                'user_id'          => Auth::id(),
            ]);

            foreach ($request->items as $item) {
                $outbound->details()->create([
                    'part_id'  => $item['part_id'],
                    'quantity' => $item['quantity'],
                ]);

                // Auto-decrement stock
                Part::where('id', $item['part_id'])->decrement('stock', $item['quantity']);
            }
        });

        return redirect()->route('outbounds.index')->with('success', 'Barang keluar berhasil dicatat.');
    }

    public function show(Outbound $outbound)
    {
        $outbound->load(['mechanic', 'user', 'details.part.category', 'details.part.brand']);

        return Inertia::render('Outbound/Show', [
            'outbound' => $outbound,
        ]);
    }

    public function destroy(Outbound $outbound)
    {
        DB::transaction(function () use ($outbound) {
            // Rollback stock before deleting
            foreach ($outbound->details as $detail) {
                Part::where('id', $detail->part_id)->increment('stock', $detail->quantity);
            }
            $outbound->delete();
        });

        return redirect()->route('outbounds.index')->with('success', 'Transaksi barang keluar dibatalkan.');
    }
}
