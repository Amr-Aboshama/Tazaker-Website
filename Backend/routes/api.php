<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\StadiumController;

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
    Route::get('/viewMatchDetails', [MatchController::class, 'viewMatchDetails']);

});

Route::prefix('admin')->middleware('jwt-admin:api')->group(function() {
    Route::get('/showNonApprovedManagers', [AdminController::class, 'showNonApprovedManagers']);
    Route::put('/approveOrDisapproveManagers', [AdminController::class, 'approveOrDisapproveManagers']);
    Route::get('/showAllUsers', [AdminController::class, 'showAllUsers']);
    Route::delete('/removeUsers', [AdminController::class, 'removeUsers']);
});

Route::prefix('manager')->middleware('jwt-manager:api')->group(function() {
    Route::post('/addStadium', [StadiumController::class, 'addStadium']);
    Route::get('/viewStadiums', [StadiumController::class, 'viewStadiums']);
});
