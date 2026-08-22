<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Techception Admin',
            'email' => 'admin@bizztopia.com',
        ]);

        $this->call([
            IdeasSeeder::class,
            EngageSeeder::class,
            SocialSeeder::class,
            InspireSeeder::class,
        ]);
    }
}
