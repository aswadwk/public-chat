import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import ChatLayout from "@/Components/Layout/ChatLayout";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/Components/ui/card";
import { formatDateBetter } from "@/Lib/utils";
import "./card.css";

interface Message {
  id: string;
  message: string;
  sender: string;
  time: string;
}

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

const options = {
  size: 180,
  minSize: 20,
  gutter: 8,
  provideProps: true,
  numCols: 6,
  fringeWidth: 160,
  yRadius: 130,
  xRadius: 220,
  cornerRadius: 50,
  showGuides: false,
  compact: true,
  gravitation: 5,
};

const Index = ({ tableId }: any) => {
  const [currentMessage, setCurrentMessage] = useState(""); // New state for current message
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "1",
      message: "Hello",
      sender: "Grace Miller",
      time: "2022-01-01 12:00:00",
    },
  ]);
  const [isMobile, setIsMobile] = useState(false);

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
        setCurrentMessage(response.message.message);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const children = chatMessages.map((data, i) => {
    return <div className="child" key={i} />;
  });

  return (
    <>
      <Head title="Chat" />
      {/* Updated inline CSS for new message animation */}
      <style>{`
        @keyframes slideFromBottom {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideFromBottom 0.5s ease-out;
        }
      `}</style>

      <ScrollArea className="pb-10 bg-gradient-to-r from-blue-500 to-green-400">
        {/* Container remains relative to support absolute positioning on large screens */}
        <div className="relative w-full min-h-screen p-4 m-0">
          {chatMessages?.map((message: Message, i: number) => {
            if (isMobile) {
              return (
                <div
                  key={message.id}
                  className="relative p-6 m-4 transition-transform duration-300 bg-white shadow-lg animate-slideUp rounded-xl hover:scale-105"
                >
                  <div>
                    <div className="mb-2 text-lg font-semibold text-gray-800">
                      {message.sender}
                    </div>
                    <div className="mb-2 text-gray-600">{message.message}</div>
                    <div className="text-sm text-gray-400">{message.time}</div>
                  </div>
                </div>
              );
            } else {
              const randomLeft = Math.floor(Math.random() * 80) + 5; // 5% to 85%
              const computedTop = 5 + i * 15 + Math.floor(Math.random() * 5); // base 5% plus offset to avoid overlap
              return (
                <div
                  key={message.id}
                  style={{ left: `${randomLeft}%`, top: `${computedTop}%` }}
                  className="absolute p-6 m-4 transition-transform duration-300 bg-white shadow-lg animate-slideUp rounded-xl hover:scale-105"
                >
                  <div>
                    <div className="mb-2 text-lg font-semibold text-gray-800">
                      {message.sender}
                    </div>
                    <div className="mb-2 text-gray-600">{message.message}</div>
                    <div className="text-sm text-gray-400">{message.time}</div>
                  </div>
                </div>
              );
            }
          })}
          <div className="mb-10" ref={messageContainer}></div>
        </div>
      </ScrollArea>
    </>
  );
};

export default Index;
