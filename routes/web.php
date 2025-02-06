<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\ChatController;
use App\Http\Controllers\Web\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('web.home');
});

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

Route::controller(ChatController::class)
    // ->middleware("guest:web")
    ->group(function () {
        Route::get('chats/{tableId}', 'chats')->name('web.chats');
        Route::post('chat/{tableId}', 'sendMessage')->name('web.chat.sendMessage');

        // Admin
        Route::get('chats-admin/{tableId}', 'chatsAll')->name('web.chatsAll');
    });
