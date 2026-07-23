<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Auth routes used by the React frontend (Login.jsx / Register.jsx / Chat.jsx)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (\Illuminate\Http\Request $request) {
        return $request->user();
    });
});
