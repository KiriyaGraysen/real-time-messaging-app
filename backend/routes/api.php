<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/greeting', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'The React and Laravel connection is fully working!'
    ]);
});

// Auth routes used by the React frontend (Login.jsx / Register.jsx / Chat.jsx)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (\Illuminate\Http\Request $request) {
        return $request->user();
    });
});
