<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
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
            'stock_qty' => 'required|numeric|min:0',
            'description' => 'nullable'
        ]);


        $product = Product::create($validated);


        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    function delete(Request $request, $prodcutId)
    {
        $product = Product::findOrFail($prodcutId);
        Gate::authorize('delete', $product);

        try {
            $product->delete();

            return response()->json([
                'message' => 'Product deleted successfully',
                'data' => $product
            ], 201);
        } catch (QueryException $excp) {
            return response()->json(['error' => $excp->getMessage()], 401);
        }
    }

    function update(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable',
            'id' => 'required',
            'name' => 'required|min:3',
            'price' => 'required|numeric|min:1',
            'stock_qty' => 'required|numeric|min:0',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $product = Product::findOrFail($validated['id']);
                $product->update($validated);
            });
            return response()->json(["Success fully updated "], 200);
        } catch (QueryException $excp) {
            return response()->json(['error' => $excp->getMessage()], 400);
        }
    }
}
