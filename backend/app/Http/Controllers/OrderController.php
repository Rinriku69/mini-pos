<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    function index()
    {
        $orders = Order::with('orderItems.product')->get();

        return OrderResource::collection($orders);
    }

    function store(Request $request)
    {
        DB::transaction(function () use ($request) {

            $productIds = collect($request->order_item)->pluck('product.id')->toArray();
            $productsFromDb = Product::whereIn('id', $productIds)->get()->keyBy('id');
            $orderItemsData = [];
            foreach ($request->order_item as $item) {
                $reqProductId = $item['product']['id'];
                $product = $productsFromDb[$reqProductId];

                $orderItemsData[] = [
                    'product_id'   => $product->id,
                    'product_name' => $product->name,
                    'price'     => $product->price,
                    'qty'          => $item['qty'],
                ];
            }
            $total = 0;

            foreach ($orderItemsData as $item) {
                $total += $item['qty'] * $item['price'];
            }

            $order = Order::create([
                'order_total' => $total,
                'user_id' => Auth::user()->id
            ]);
            $order->orderItems()->createMany($orderItemsData);
        });

        return response()->json(['status' => 'ok']);
    }
}
