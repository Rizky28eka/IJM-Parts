<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MechanicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mechanics = [
            ['name' => 'Ujang', 'phone' => '081200001111'],
            ['name' => 'Asep', 'phone' => '081200002222'],
            ['name' => 'Deden', 'phone' => '081200003333'],
        ];

        foreach ($mechanics as $mechanic) {
            \App\Models\Mechanic::updateOrCreate(
                ['name' => $mechanic['name']],
                ['phone' => $mechanic['phone']]
            );
        }
    }

}
