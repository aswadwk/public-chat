<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\DashboardController;
use Illuminate\Support\Facades\Route;

const MID_AUTH = 'auth:web';
const MID_GUEST = 'guest:web';

// Auth
Route::controller(AuthController::class)
    ->middleware(MID_GUEST)
    ->group(function () {
        Route::get('auth/login', 'login')->name('login');
        Route::post('auth/login', 'doLogin')->name('web.auth.doLogin');
    });

Route::controller(AuthController::class)
    ->middleware(MID_AUTH)
    ->group(function () {
        Route::post('auth/logout', 'doLogout')->name('web.auth.logout');
    });

Route::controller(DashboardController::class)
    ->middleware(MID_AUTH)
    ->group(function () {
        Route::get('/', 'index')->name('web.home');
    });
