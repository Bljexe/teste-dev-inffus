<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CharacterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('characters')->group(function () {
    Route::get('/', [CharacterController::class, 'index']);
    Route::get('/{id}', [CharacterController::class, 'show']);
    Route::get('/stats/overview', [CharacterController::class, 'stats']);
});

Route::prefix('sync')->group(function () {
    Route::post('/characters', [CharacterController::class, 'import']);
    Route::post('/characters/update', [CharacterController::class, 'sync']);
});
