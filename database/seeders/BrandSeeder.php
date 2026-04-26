<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            'Yamaha', 'Honda', 'Suzuki', 'Kawasaki', 
            'Castrol', 'Federal Oil', 'Aspira', 'Denso'
        ];

        foreach ($brands as $brand) {
            \App\Models\Brand::updateOrCreate(['name' => $brand]);
        }
    }

}
