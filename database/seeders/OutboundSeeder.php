<?php

namespace Database\Seeders;

use App\Models\Outbound;
use App\Models\OutboundDetail;
use App\Models\Part;
use App\Models\Mechanic;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class OutboundSeeder extends Seeder
{
    public function run(): void
    {
        $mechanics = Mechanic::all();
        $parts = Part::all();
        $user = User::where('role', 'admin')->first() ?? User::first();

        if ($mechanics->isEmpty() || $parts->isEmpty()) {
            return;
        }

        // Avoid duplication if already seeded
        if (Outbound::count() > 0) {
            return;
        }

        // Simulate 40 outbound transactions over the last 30 days
        for ($i = 0; $i < 40; $i++) {
            $date = Carbon::now()->subDays(rand(0, 30));
            
            $type = ['sales', 'service', 'scrap'][rand(0, 2)];
            $outbound = Outbound::create([
                'reference_number' => 'OUT/' . $date->format('Ymd') . '/' . strtoupper(\Illuminate\Support\Str::random(4)),
                'date' => $date->toDateString(),
                'type' => $type,
                'license_plate' => $type === 'service' ? 'B ' . rand(1000, 9999) . ' ' . strtoupper(\Illuminate\Support\Str::random(3)) : null,
                'mechanic_id' => $mechanics->random()->id,
                'notes' => 'Pengambilan komponen via seeder',
                'user_id' => $user->id,
            ]);

            // Add 1-3 random parts per outbound
            $randomParts = $parts->random(rand(1, 3));
            foreach ($randomParts as $part) {
                OutboundDetail::create([
                    'outbound_id' => $outbound->id,
                    'part_id' => $part->id,
                    'quantity' => rand(1, 4),
                ]);
            }
        }
    }
}
