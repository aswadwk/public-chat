import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import ChatLayout from "@/Components/Layout/ChatLayout";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/Components/ui/card";
import { cn, formatDateBetter } from "@/Lib/utils";
import "./card.css";
import Message from "./Components/Message";

export interface Message {
  id: string;
  message: string;
  sender: string;
  time: string;
  randomOffset?: number; // new property: value between 0 and 1
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
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load persisted messages on mount
  useEffect(() => {
    const stored = localStorage.getItem("chatMessages");
    if (stored) {
      setChatMessages(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (scrollRef.current) {
        setContainerWidth(scrollRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
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

        const newMessage: Message = {
          id: randomId(),
          message: response.message.message,
          sender: response.message.sender,
          time: response.message.time,
          randomOffset: Math.random(), // assign random offset once
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

    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

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

      <div
        ref={scrollRef}
        className="w-full h-screen bg-gradient-to-br from-blue-500 via-teal-500 to-green-500"
      >
        <ScrollArea className="h-full p-4">
          <div className="flex flex-wrap gap-2">
            {chatMessages.map((message, index) => {
              const maxWidth = Math.min(300, containerWidth * 1); // Max width of 70% of container or 300px
              // Compute margin using stored randomOffset, fallback to 0 if missing
              const marginLeft = `${(
                (message.randomOffset ?? 0) *
                (containerWidth - maxWidth)
              ).toFixed(0)}px`;
              return (
                <div
                  key={message.id}
                  ref={
                    index === chatMessages.length - 1 ? lastMessageRef : null
                  }
                  className="flex-shrink-0 transition-all duration-300"
                  style={{
                    maxWidth: `${maxWidth}px`,
                    minWidth: `${Math.min(200, maxWidth)}px`,
                    marginLeft,
                  }}
                >
                  <Message message={message} index={index} marginClass="mx-2" />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Index;
