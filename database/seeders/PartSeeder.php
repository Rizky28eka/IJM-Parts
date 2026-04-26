<?php

namespace Database\Seeders;

use App\Models\Part;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PartSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();
        $brands = Brand::all();

        if ($categories->isEmpty() || $brands->isEmpty()) {
            return;
        }

        $parts = [
            // Oli
            ['name' => 'Yamalube Super Sport 1L', 'category' => 'Oli', 'brand' => 'Yamaha', 'unit' => 'Botol', 'min_stock' => 10, 'sku_pfx' => 'OIL'],
            ['name' => 'AHM Oil SPX2 0.8L', 'category' => 'Oli', 'brand' => 'Honda', 'unit' => 'Botol', 'min_stock' => 12, 'sku_pfx' => 'OIL'],
            ['name' => 'Castrol Power1 4T 10W-40', 'category' => 'Oli', 'brand' => 'Castrol', 'unit' => 'Botol', 'min_stock' => 8, 'sku_pfx' => 'OIL'],
            
            // Ban
            ['name' => 'Ban Luar 80/90-14 Tubeless', 'category' => 'Ban', 'brand' => 'Aspira', 'unit' => 'Pcs', 'min_stock' => 5, 'sku_pfx' => 'TYR'],
            ['name' => 'Ban Luar 90/90-14 Tubeless', 'category' => 'Ban', 'brand' => 'Aspira', 'unit' => 'Pcs', 'min_stock' => 5, 'sku_pfx' => 'TYR'],
            
            // Busi
            ['name' => 'Busi Denso U24EPR-9', 'category' => 'Busi', 'brand' => 'Denso', 'unit' => 'Pcs', 'min_stock' => 20, 'sku_pfx' => 'SPK'],
            ['name' => 'Busi NGK CPR9EA-9', 'category' => 'Busi', 'brand' => 'Suzuki', 'unit' => 'Pcs', 'min_stock' => 20, 'sku_pfx' => 'SPK'],
            
            // Aki
            ['name' => 'Aki GS Astra GTZ5S', 'category' => 'Aki', 'brand' => 'Aspira', 'unit' => 'Pcs', 'min_stock' => 4, 'sku_pfx' => 'BAT'],
            ['name' => 'Aki Yuasa YTZ6V', 'category' => 'Aki', 'brand' => 'Honda', 'unit' => 'Pcs', 'min_stock' => 3, 'sku_pfx' => 'BAT'],
            
            // Kampas Rem
            ['name' => 'Kampas Rem Depan Vario 125', 'category' => 'Kampas Rem', 'brand' => 'Honda', 'unit' => 'Set', 'min_stock' => 15, 'sku_pfx' => 'BRK'],
            ['name' => 'Kampas Rem Belakang NMAX', 'category' => 'Kampas Rem', 'brand' => 'Yamaha', 'unit' => 'Set', 'min_stock' => 10, 'sku_pfx' => 'BRK'],
            
            // Gear Set
            ['name' => 'Gear Set RX King', 'category' => 'Gear Set', 'brand' => 'Yamaha', 'unit' => 'Set', 'min_stock' => 2, 'sku_pfx' => 'GER'],
            ['name' => 'Rantai Aspira 428-110', 'category' => 'Gear Set', 'brand' => 'Aspira', 'unit' => 'Pcs', 'min_stock' => 5, 'sku_pfx' => 'GER'],
            
            // Lampu
            ['name' => 'Bohlam Depan LED H6', 'category' => 'Lampu', 'brand' => 'Aspira', 'unit' => 'Pcs', 'min_stock' => 10, 'sku_pfx' => 'LMP'],
            ['name' => 'Lampu Sein Belakang Beat', 'category' => 'Lampu', 'brand' => 'Honda', 'unit' => 'Pcs', 'min_stock' => 6, 'sku_pfx' => 'LMP'],
        ];

        foreach ($parts as $pData) {
            $cat = $categories->where('name', $pData['category'])->first() ?? $categories->random();
            $brand = $brands->where('name', $pData['brand'])->first() ?? $brands->random();

            Part::updateOrCreate(
                ['name' => $pData['name']],
                [
                    'sku' => $pData['sku_pfx'] . '-' . strtoupper(Str::random(5)),
                    'category_id' => $cat->id,
                    'brand_id' => $brand->id,
                    'location' => 'RAK-' . rand(1, 5) . chr(rand(65, 70)) . '-' . rand(1, 20),
                    'unit' => $pData['unit'],
                    'stock' => rand(0, 50),
                    'min_stock' => $pData['min_stock'],
                    'buy_price' => rand(15, 300) * 1000,
                ]
            );
        }
    }
}
