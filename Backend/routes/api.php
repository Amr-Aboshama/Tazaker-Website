<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->middleware('jwt:api')->group(function () {

});

Route::prefix('unauth')->group(function () {
    Route::post('/signUp', [AuthenticationController::class, 'signUp']);
    Route::post('/signIn', [AuthenticationController::class, 'signIn']);

});

Route::prefix('admin')->middleware('jwt-admin:api')->group(function() {

});
