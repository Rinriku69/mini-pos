<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        return ProductResource::collection($products);
    }
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|min:3',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:1',
            'description' => 'nullable'
        ]);


        $product = Product::create($validated);


        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }
}
