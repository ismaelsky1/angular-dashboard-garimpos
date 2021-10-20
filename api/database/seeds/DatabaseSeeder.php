<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        // $this->call(ProductCategorySeed::class);
        // $this->call(StoreCategorySeed::class);
        // $this->call(UserSeed::class);
        $this->call(WebServiceSeed::class);
        Model::reguard();        
    }
}
