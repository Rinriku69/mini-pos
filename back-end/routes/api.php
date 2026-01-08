<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
// บรรทัดนี้บรรทัดเดียว สำหรับ GET, POST, PUT, DELETE 
// Route::apiResource('products', ProductController::class);
Route::get('/categories', [CategoryController::class, 'index']);
