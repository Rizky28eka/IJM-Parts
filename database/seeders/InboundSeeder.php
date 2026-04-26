<?php

namespace Database\Seeders;

use App\Models\Inbound;
use App\Models\InboundDetail;
use App\Models\Part;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class InboundSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = Supplier::all();
        $parts = Part::all();
        $user = User::where('role', 'admin')->first() ?? User::first();

        if ($suppliers->isEmpty() || $parts->isEmpty()) {
            return;
        }

        if (Inbound::count() > 0) {
            return;
        }

        // Simulate 20 inbound transactions over the last 30 days
        for ($i = 0; $i < 20; $i++) {
            $date = Carbon::now()->subDays(rand(0, 30));
            
            $inbound = Inbound::create([
                'supplier_id' => $suppliers->random()->id,
                'invoice_number' => 'INV/' . $date->format('Ymd') . '/' . strtoupper(\Illuminate\Support\Str::random(4)),
                'date' => $date->toDateString(),
                'notes' => 'Restock berkala via seeder',
                'user_id' => $user->id,
            ]);

            // Add 1-5 random parts per inbound
            $randomParts = $parts->random(rand(1, 5));
            foreach ($randomParts as $part) {
                InboundDetail::create([
                    'inbound_id' => $inbound->id,
                    'part_id' => $part->id,
                    'quantity' => rand(5, 50),
                ]);
            }
        }
    }
}
