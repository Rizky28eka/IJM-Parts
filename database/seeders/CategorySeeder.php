<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Oli', 'slug' => 'oli'],
            ['name' => 'Ban', 'slug' => 'ban'],
            ['name' => 'Busi', 'slug' => 'busi'],
            ['name' => 'Aki', 'slug' => 'aki'],
            ['name' => 'Kampas Rem', 'slug' => 'kampas-rem'],
            ['name' => 'Gear Set', 'slug' => 'gear-set'],
            ['name' => 'Lampu', 'slug' => 'lampu'],
            ['name' => 'Lain-lain', 'slug' => 'lain-lain'],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::updateOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
        }
    }

}
