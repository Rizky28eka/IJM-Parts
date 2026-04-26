<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\StockAdjustment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockAdjustmentController extends Controller
{
    public function index()
    {
        $adjustments = StockAdjustment::with(['part', 'user'])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('StockOpname/Index', [
            'adjustments' => $adjustments
        ]);
    }

    public function create()
    {
        $parts = Part::orderBy('name')->get(['id', 'name', 'sku', 'stock', 'unit']);
        
        return Inertia::render('StockOpname/Create', [
            'parts' => $parts
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'part_id' => 'required|exists:parts,id',
            'date' => 'required|date',
            'physical_qty' => 'required|integer|min:0',
            'reason' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($request) {
            $part = Part::findOrFail($request->part_id);
            $system_qty = $part->stock;
            $physical_qty = $request->physical_qty;
            $discrepancy = $physical_qty - $system_qty;

            // Create adjustment record
            StockAdjustment::create([
                'part_id' => $part->id,
                'user_id' => Auth::id(),
                'date' => $request->date,
                'system_qty' => $system_qty,
                'physical_qty' => $physical_qty,
                'discrepancy' => $discrepancy,
                'reason' => $request->reason,
            ]);

            // Update part stock
            $part->update(['stock' => $physical_qty]);
        });

        return redirect()->route('stock-adjustments.index')
            ->with('success', 'Stock adjustment successfully recorded.');
    }
}
