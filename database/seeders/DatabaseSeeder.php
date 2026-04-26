<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            BrandSeeder::class,
            SupplierSeeder::class,
            MechanicSeeder::class,
            PartSeeder::class,
            InboundSeeder::class,
            OutboundSeeder::class,
            StockAdjustmentSeeder::class,
            PartRequestSeeder::class,
        ]);
    }
}
