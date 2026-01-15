<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_id' => $this->id,
            'total' => $this->order_total,
            'date' => $this->created_at,
            'order_items' => OrderItemResource::collection(
                $this->whenLoaded('orderItems')
            )
        ];
    }
}
