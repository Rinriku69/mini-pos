<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_name' => $this->name,
            'product_description' => $this->description,
            'price' => $this->price,
            'stock_qty' => $this->stock_qty,
            'category_name' => $this->category->name,
            'category_id' => $this->category->id,
        ];
    }
}
