<?php
  
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seeding Owner
        User::updateOrCreate(
            ['email' => 'owner@ijm.com'],
            [
                'name' => 'Owner IJM',
                'role' => 'owner',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Seeding Admin
        User::updateOrCreate(
            ['email' => 'admin@ijm.com'],
            [
                'name' => 'Admin IJM',
                'role' => 'admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Seeding Karyawan (Mekanik)
        User::updateOrCreate(
            ['email' => 'karyawan@ijm.com'],
            [
                'name' => 'Karyawan IJM',
                'role' => 'karyawan',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}
