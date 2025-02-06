import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import ChatLayout from "@/Components/Layout/ChatLayout";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/Components/ui/card";
import { formatDateBetter } from "@/Lib/utils";

interface Message {
  id: string;
  message: string;
  sender: string;
  time: string;
}

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

const Index = ({ tableId }: any) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "1",
      message: "Hello",
      sender: "Grace Miller",
      time: "2022-01-01 12:00:00",
    },
  ]);

  // Load persisted messages on mount
  useEffect(() => {
    const stored = localStorage.getItem("chatMessages");
    if (stored) {
      setChatMessages(JSON.parse(stored));
    }
  }, []);

  // Persist messages to storage whenever updated
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  // useRef to scroll to the bottom of the chat container
  const messageContainer = useRef<any>(null);

  const connectWebSocket = () => {
    if (tableId) {
      console.log("Connecting to websocket");

      window.Echo.channel(`room.public`, {
        user_id: tableId,
      }).listen("MessageSend", (response: any) => {
        console.log("Received message");

        console.log(response);

        const newMessage: Message = {
          id: randomId(),
          message: response.message.message,
          sender: response.message.sender,
          time: response.message.time,
        };

        setChatMessages((prev) => [...prev, newMessage]);
      });
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      window.Echo.leave(`room.public`);
    };
  }, []);

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollIntoView(false, {
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  return (
    <>
      <Head title="Chat" />
      {/* Inline CSS for updated slideUp animation */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
      <ChatLayout>
        <div className="">
          <ScrollArea className="h-screen max-h-screen p-4">
            <div className="flex flex-wrap gap-4 mb-6">
              {chatMessages?.map((message: Message) => (
                <div key={message.id} className="animate-slideUp">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-semibold">
                      {message.sender}
                    </span>
                    <Card className="px-4 py-2 text-black bg-white border border-gray-200 shadow-sm rounded-2xl">
                      {message.message}
                    </Card>
                  </div>
                </div>
              ))}
              <div ref={messageContainer}></div>
            </div>
          </ScrollArea>
        </div>
      </ChatLayout>
    </>
  );
};

export default Index;
