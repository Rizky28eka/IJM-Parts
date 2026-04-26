<?php

namespace Database\Seeders;

use App\Models\StockAdjustment;
use App\Models\Part;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class StockAdjustmentSeeder extends Seeder
{
    public function run(): void
    {
        $parts = Part::all();
        $user = User::where('role', 'admin')->first() ?? User::first();

        if ($parts->isEmpty()) {
            return;
        }

        if (StockAdjustment::count() > 0) {
            return;
        }

        // Simulate 10 stock adjustments
        for ($i = 0; $i < 10; $i++) {
            $part = $parts->random();
            $systemQty = $part->stock;
            $physicalQty = $systemQty + rand(-5, 5); // Some discrepancies
            $discrepancy = $physicalQty - $systemQty;

            if ($discrepancy == 0) continue;

            StockAdjustment::create([
                'part_id' => $part->id,
                'date' => Carbon::now()->subDays(rand(0, 15))->toDateString(),
                'system_qty' => $systemQty,
                'physical_qty' => $physicalQty,
                'discrepancy' => $discrepancy,
                'reason' => 'Stock opname rutin bulanan',
                'user_id' => $user->id,
            ]);

            // Actually update the part stock to match physical for realism
            $part->update(['stock' => $physicalQty]);
        }
    }
}
