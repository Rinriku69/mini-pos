<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
    ];
    function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    function productLogs(): HasMany
    {
        return $this->hasMany(ProductLog::class);
    }
}
