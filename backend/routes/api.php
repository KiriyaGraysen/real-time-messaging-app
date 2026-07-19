<?php

use Illuminate\Support\Facades\Route;

Route::get('/greeting', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'The React and Laravel connection is fully working!'
    ]);
});
