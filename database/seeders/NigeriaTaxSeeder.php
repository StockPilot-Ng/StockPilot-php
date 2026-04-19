<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class NigeriaTaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $tax = new Tax();
        $tax->name = 'VAT (7.5%)';
        $tax->rate = 7.5;
        $tax->save();
    }
}
