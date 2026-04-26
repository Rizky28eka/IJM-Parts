<?php

namespace App\Http\Controllers;

use App\Models\Inbound;
use App\Models\Part;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InboundController extends Controller
{
    public function index()
    {
        $inbounds = Inbound::with(['supplier', 'user', 'details.part'])
            ->latest()
            ->get()
            ->map(function ($inbound) {
                return [
                    'id'             => $inbound->id,
                    'invoice_number' => $inbound->invoice_number,
                    'date'           => $inbound->date,
                    'notes'          => $inbound->notes,
                    'supplier'       => $inbound->supplier?->name,
                    'user'           => $inbound->user?->name,
                    'total_items'    => $inbound->details->count(),
                    'total_qty'      => $inbound->details->sum('quantity'),
                ];
            });

        return Inertia::render('Inbound/Index', [
            'inbounds' => $inbounds,
        ]);
    }

    public function create()
    {
        return Inertia::render('Inbound/Create', [
            'suppliers' => Supplier::orderBy('name')->get(['id', 'name']),
            'parts'     => Part::orderBy('name')->get(['id', 'name', 'sku', 'unit', 'stock']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'supplier_id'        => 'required|exists:suppliers,id',
            'date'               => 'required|date',
            'invoice_number'     => 'nullable|string|max:255',
            'notes'              => 'nullable|string',
            'items'              => 'required|array|min:1',
            'items.*.part_id'    => 'required|exists:parts,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $inbound = Inbound::create([
                'supplier_id'    => $request->supplier_id,
                'date'           => $request->date,
                'invoice_number' => $request->invoice_number,
                'notes'          => $request->notes,
                'user_id'        => Auth::id(),
            ]);

            foreach ($request->items as $item) {
                $inbound->details()->create([
                    'part_id'  => $item['part_id'],
                    'quantity' => $item['quantity'],
                ]);

                // Auto-increment stock
                Part::where('id', $item['part_id'])->increment('stock', $item['quantity']);
            }
        });

        return redirect()->route('inbounds.index')->with('success', 'Barang masuk berhasil dicatat.');
    }

    public function show(Inbound $inbound)
    {
        $inbound->load(['supplier', 'user', 'details.part.category', 'details.part.brand']);

        return Inertia::render('Inbound/Show', [
            'inbound' => $inbound,
        ]);
    }

    public function destroy(Inbound $inbound)
    {
        DB::transaction(function () use ($inbound) {
            // Rollback stock before deleting
            foreach ($inbound->details as $detail) {
                Part::where('id', $detail->part_id)->decrement('stock', $detail->quantity);
            }
            $inbound->delete();
        });

        return redirect()->route('inbounds.index')->with('success', 'Transaksi barang masuk dibatalkan.');
    }
}
