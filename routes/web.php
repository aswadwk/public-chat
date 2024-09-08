<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\DashboardController;
use Illuminate\Support\Facades\Route;

// Auth
Route::controller(AuthController::class)
    ->middleware("guest:web")
    ->group(function () {
        Route::get('auth/login', 'login')->name('login');
        Route::post('auth/login', 'doLogin')->name('web.auth.doLogin');
    });

Route::controller(AuthController::class)
    ->middleware("auth:web")
    ->group(function () {
        Route::post('auth/logout', 'doLogout')->name('web.auth.logout');
    });

Route::controller(DashboardController::class)
    ->middleware("auth:web")
    ->group(function () {
        Route::get('/home', 'index')->name('web.home');
    });
