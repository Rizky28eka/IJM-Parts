<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'name' => 'PT. Indomarco',
                'address' => 'Jl. Industri No. 10, Jakarta',
                'phone' => '021-12345678',
                'contact_person' => 'Budi'
            ],
            [
                'name' => 'CV. Berkah Jaya',
                'address' => 'Jl. Raya Bogor No. 25, Depok',
                'phone' => '021-87654321',
                'contact_person' => 'Siti'
            ],
            [
                'name' => 'Toko Maju Terus',
                'address' => 'Pasar Klender Blok A',
                'phone' => '081234567890',
                'contact_person' => 'Andi'
            ],
        ];

        foreach ($suppliers as $supplier) {
            \App\Models\Supplier::updateOrCreate(
                ['name' => $supplier['name']],
                [
                    'address' => $supplier['address'],
                    'phone' => $supplier['phone'],
                    'contact_person' => $supplier['contact_person']
                ]
            );
        }
    }

}
