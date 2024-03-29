<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\StadiumController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UsersController;

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
    Route::post('/changePassword', [UsersController::class, 'changePassword']);
    Route::put('/editUserInfo', [UsersController::class, 'editUserInfo']);             #TODO
    Route::get('/viewUserInfo', [UsersController::class, 'viewUserInfo']);             #TODO
    Route::get('/signOut', [AuthenticationController::class, 'signOut']);
});

Route::prefix('unauth')->group(function () {
    Route::post('/signUp', [AuthenticationController::class, 'signUp']);
    Route::post('/signIn', [AuthenticationController::class, 'signIn']);
    // Route::get('/viewMatchDetails', [MatchController::class, 'viewMatchDetails']);   // Deprecated
    Route::get('/viewMatches', [MatchController::class, 'viewMatches']);
    Route::get('/viewSeatsStatus', [TicketController::class, 'viewSeatsStatus']);
});

Route::prefix('admin')->middleware('jwt-admin:api')->group(function() {
    Route::get('/showNonApprovedManagers', [AdminController::class, 'showNonApprovedManagers']);
    Route::put('/approveOrDisapproveManager', [AdminController::class, 'approveOrDisapproveManager']);
    Route::get('/showAllUsers', [AdminController::class, 'showAllUsers']);
    Route::delete('/removeUser', [AdminController::class, 'removeUser']);
});

Route::prefix('manager')->middleware('jwt-manager:api')->group(function() {
    Route::post('/addStadium', [StadiumController::class, 'addStadium']);
    Route::get('/viewStadiums', [StadiumController::class, 'viewStadiums']);
    Route::post('/createMatch', [MatchController::class, 'createMatch']);
    Route::put('/editMatch', [MatchController::class, 'editMatch']);                        #TODO
});

Route::prefix('fan')->middleware('jwt-fan:api')->group(function() {
    Route::post('/reserveTicket', [TicketController::class, 'reserveTicket']);
    Route::delete('/cancelTicket', [TicketController::class, 'cancelTicket']);
    Route::get('/viewFutureTickets', [TicketController::class, 'viewFutureTickets']);
});
