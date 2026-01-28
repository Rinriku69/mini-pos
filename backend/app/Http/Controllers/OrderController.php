<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            $order = Order::create([
                'order_total' => $request['total']
            ]);

            foreach ($request->order_item as $item) {
                $order->orderItems()->create([
                    'product_id' => $item['product']['id'],
                    'qty' => $item['qty']
                ]);
            }
        });

        return response()->json(['status' => 'ok']);
    }
}
