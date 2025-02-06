<?php

namespace App\Http\Controllers\Web;

use App\Events\MessageSend;
use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function chats($tableId)
    {
        return inertia('Chat/Index', [
            'tableId' => $tableId,
        ]);
    }

    public function sendMessage(Request $request, $from)
    {
        broadcast(
            new MessageSend(new ChatMessage([
                'sender' => $from,
                'user_id' => 'some-user-id',
                'message' => $request->message,
                'time' => now()->toIso8601String(),
            ]))
        );

        return response()->json([
            'message' => 'Message sent successfully',
        ]);
    }

    public function chatsAll($tableId)
    {
        return inertia('Chat/Admin/Index', [
            // return inertia('Chat/Admin/Example', [
            'tableId' => $tableId,
        ]);
    }
}
