<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Part;
use App\Models\Supplier;
use App\Models\Mechanic;
use App\Models\Inbound;
use App\Models\Outbound;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();
        $low_stock_count = Part::whereColumn('stock', '<=', 'min_stock')->count();

        $stats = [
            'total_parts' => Part::count(),
            'low_stock_count' => $low_stock_count,
            'inbound_today' => (int)\App\Models\InboundDetail::whereHas('inbound', function($q) use ($today) {
                $q->where('date', $today);
            })->sum('quantity'),
            'outbound_today' => (int)\App\Models\OutboundDetail::whereHas('outbound', function($q) use ($today) {
                $q->where('date', $today);
            })->sum('quantity'),
            'total_asset_value' => (float)Part::select(DB::raw('SUM(stock * buy_price) as total_asset'))->value('total_asset'),
        ];

        // 7-day Chart Data
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $inbound = \App\Models\InboundDetail::whereHas('inbound', function($q) use ($date) {
                $q->where('date', $date);
            })->sum('quantity');
            
            $outbound = \App\Models\OutboundDetail::whereHas('outbound', function($q) use ($date) {
                $q->where('date', $date);
            })->sum('quantity');

            $chartData[] = [
                'date' => now()->subDays($i)->format('d M'),
                'inbound' => (int)$inbound,
                'outbound' => (int)$outbound,
            ];
        }

        $low_stock_parts = Part::with(['category', 'brand'])
            ->whereColumn('stock', '<=', 'min_stock')
            ->orderBy('stock', 'asc')
            ->limit(5)
            ->get()
            ->map(function($p) {
                return [
                    'id' => $p->id,
                    'sku' => $p->sku,
                    'name' => $p->name,
                    'stock' => $p->stock,
                    'min_stock' => $p->min_stock,
                ];
            });

        $recent_inbounds = Inbound::with(['details.part'])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $recent_outbounds = Outbound::with(['details.part'])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $recentActivities = collect();
        
        foreach($recent_inbounds as $in) {
            foreach($in->details as $detail) {
                $recentActivities->push([
                    'id' => 'in-'.$detail->id,
                    'type' => 'inbound',
                    'sku' => $detail->part->sku,
                    'name' => $detail->part->name,
                    'qty' => $detail->quantity,
                    'time' => $in->date,
                    'timestamp' => $in->created_at
                ]);
            }
        }

        foreach($recent_outbounds as $out) {
            foreach($out->details as $detail) {
                $recentActivities->push([
                    'id' => 'out-'.$detail->id,
                    'type' => 'outbound',
                    'sku' => $detail->part->sku,
                    'name' => $detail->part->name,
                    'qty' => $detail->quantity,
                    'time' => $out->date,
                    'timestamp' => $out->created_at
                ]);
            }
        }

        $fast_moving_parts = Part::with(['category', 'brand'])
            ->join('outbound_details', 'parts.id', '=', 'outbound_details.part_id')
            ->join('outbounds', 'outbounds.id', '=', 'outbound_details.outbound_id')
            ->where('outbounds.date', '>=', now()->subDays(30))
            ->select('parts.id', 'parts.sku', 'parts.name', 'parts.stock', 'parts.unit', DB::raw('SUM(outbound_details.quantity) as total_outbound'))
            ->groupBy('parts.id', 'parts.sku', 'parts.name', 'parts.stock', 'parts.unit')
            ->orderByDesc('total_outbound')
            ->limit(5)
            ->get();

        $recentActivities = $recentActivities->sortByDesc('timestamp')->values()->take(8);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'lowStockParts' => $low_stock_parts,
            'recentActivities' => $recentActivities,
            'fastMovingParts' => $fast_moving_parts,
        ]);
    }
}
