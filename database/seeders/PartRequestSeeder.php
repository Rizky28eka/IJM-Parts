<?php

namespace Database\Seeders;

use App\Models\PartRequest;
use App\Models\PartRequestDetail;
use App\Models\Part;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PartRequestSeeder extends Seeder
{
    public function run(): void
    {
        $karyawan = User::where('role', 'karyawan')->first() ?? User::first();
        $admin = User::where('role', 'admin')->first();
        $parts = Part::all();

        if ($parts->isEmpty()) {
            return;
        }

        // Avoid duplication if already seeded
        if (PartRequest::count() > 0) {
            return;
        }

        // Simulate 10 part requests over the last week
        for ($i = 0; $i < 10; $i++) {
            $date = Carbon::now()->subDays(rand(0, 7));
            $statuses = ['pending', 'approved', 'rejected'];
            $status = $statuses[rand(0, 2)];
            
            $request = PartRequest::create([
                'user_id' => $karyawan->id,
                'reason' => 'Permintaan sparepart untuk service kendaraan konsumen otomatis.',
                'status' => $status,
                'created_at' => $date,
                'updated_at' => $date,
                'approved_at' => $status !== 'pending' ? $date->copy()->addHours(rand(1, 4)) : null,
                'approved_by' => $status !== 'pending' && $admin ? $admin->id : null,
                'admin_notes' => $status !== 'pending' ? 'Telah ditinjau oleh Admin.' : null,
            ]);

            // Add 1-2 random parts
            $randomParts = $parts->random(rand(1, 2));
            foreach ($randomParts as $part) {
                PartRequestDetail::create([
                    'part_request_id' => $request->id,
                    'part_id' => $part->id,
                    'quantity' => rand(1, 2),
                ]);
            }
        }
    }
}
