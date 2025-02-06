<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('room.public', function () {

    // info([
    //     'user' => $user,
    //     'chatId' => $chatId,
    // ]);

    // info([$user->id, $chatId]);
    info('room.public');

    return true;

    // $exist = ChatUser::where('chat_id', $chatId)
    //     ->where('user_id', $user->id)
    //     ->exists();

    // if ($exist) {
    //     return ['id' => $user->id, 'name' => $user->email];
    // }
});
