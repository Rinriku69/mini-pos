<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductLog extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'type',
        'amount',
    ];
    function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
    function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
