<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PartRequest;
use App\Models\PartRequestDetail;
use App\Models\Part;
use App\Models\Outbound;
use App\Models\OutboundDetail;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PartRequestController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = PartRequest::with(['user', 'details.part', 'approver']);

        if ($user->role === 'karyawan') {
            $query->where('user_id', $user->id);
        }

        return Inertia::render('PartRequests/Index', [
            'requests' => $query->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('PartRequests/Create', [
            'parts' => Part::where('stock', '>', 0)->with(['category', 'brand'])->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
            'items' => 'required|array|min:1',
            'items.*.part_id' => 'required|exists:parts,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $partRequest = PartRequest::create([
                'user_id' => auth()->id(),
                'reason' => $request->reason,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                PartRequestDetail::create([
                    'part_request_id' => $partRequest->id,
                    'part_id' => $item['part_id'],
                    'quantity' => $item['quantity'],
                ]);
            }
        });

        return redirect()->route('part-requests.index')->with('success', 'Permintaan barang berhasil dikirim.');
    }

    public function approve(Request $request, PartRequest $partRequest)
    {
        if ($partRequest->status !== 'pending') {
            return back()->with('error', 'Permintaan sudah diproses.');
        }

        DB::transaction(function () use ($partRequest, $request) {
            $partRequest->update([
                'status' => 'approved',
                'approved_at' => now(),
                'approved_by' => auth()->id(),
                'admin_notes' => $request->admin_notes,
            ]);

            // Create Outbound
            $outbound = Outbound::create([
                'reference_number' => 'REQ-' . $partRequest->id,
                'date' => now(),
                'type' => 'service',
                'notes' => 'Dari Permintaan #' . $partRequest->id . ': ' . $partRequest->reason,
                'user_id' => auth()->id(),
            ]);

            foreach ($partRequest->details as $detail) {
                OutboundDetail::create([
                    'outbound_id' => $outbound->id,
                    'part_id' => $detail->part_id,
                    'quantity' => $detail->quantity,
                ]);

                // Deduct stock
                $detail->part->decrement('stock', $detail->quantity);
            }
        });

        return redirect()->route('part-requests.index')->with('success', 'Permintaan barang disetujui.');
    }

    public function reject(Request $request, PartRequest $partRequest)
    {
        if ($partRequest->status !== 'pending') {
            return back()->with('error', 'Permintaan sudah diproses.');
        }

        $partRequest->update([
            'status' => 'rejected',
            'admin_notes' => $request->admin_notes,
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return redirect()->route('part-requests.index')->with('success', 'Permintaan barang ditolak.');
    }
}
