<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\DashboardController;
use Illuminate\Support\Facades\Route;


// Auth
Route::controller(AuthController::class)->group(function () {
    Route::get('auth/login', 'login')->name('web.auth.login');
    Route::post('auth/login', 'doLogin')->name('web.auth.doLogin');
});

Route::controller(DashboardController::class)->group(function () {
    Route::get('/', 'index')->name('web.home');
});
