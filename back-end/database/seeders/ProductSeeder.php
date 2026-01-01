<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $phone = Category::where('name', 'Phone')->first();
        $laptop = Category::where('name', 'Laptop')->first();
        $tablet = Category::where('name', 'Tablet')->first();
        $acc = Category::where('name', 'Accessories')->first();

        $products = [

            [
                'name' => 'iPhone 15 Pro Max',
                'description' => 'Chip A17 Pro, Titanium design, 5x Telephoto camera.',
                'price' => 48900,
                'category_id' => $phone->id ?? 1,
            ],
            [
                'name' => 'Samsung Galaxy S24 Ultra',
                'description' => 'Galaxy AI is here. 200MP Camera, Titanium frame.',
                'price' => 46900,
                'category_id' => $phone->id ?? 1,
            ],

            [
                'name' => 'MacBook Air M2',
                'description' => 'Supercharged by M2. Up to 18 hours battery life.',
                'price' => 39900,
                'category_id' => $laptop->id ?? 2,
            ],
            [
                'name' => 'ASUS TUF Gaming F15',
                'description' => 'Intel Core i7, RTX 4060, 144Hz Display.',
                'price' => 32990,
                'category_id' => $laptop->id ?? 2,
            ],

            [
                'name' => 'iPad Air 5',
                'description' => 'M1 chip, 10.9-inch Liquid Retina display.',
                'price' => 23900,
                'category_id' => $tablet->id ?? 3,
            ],

            [
                'name' => 'AirPods Pro (2nd Gen)',
                'description' => 'Active Noise Cancellation, Transparency mode.',
                'price' => 8990,
                'category_id' => $acc->id ?? 4,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
