import { Input } from "@/Components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import { Send, Loader2 } from "lucide-react";
import axios from "axios";
import ChatLayout from "@/Components/Layout/ChatLayout";
// import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = ({ tableId }: any) => {
  const { post, data, setData } = useForm({
    message: "",
    receiver_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(route("web.chat.sendMessage", tableId), data)
      .then(() => {
        setData("message", "");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // New handler for keydown, checking for Ctrl+Enter or Meta+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // Create a synthetic event to reuse handleSendMessage
      handleSendMessage(e);
    }
  };

  return (
    <>
      <Head title="Chat" />
      <ChatLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-lg p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-center">
              Simple Chat
            </h2>
            <form className="flex flex-col gap-2" onSubmit={handleSendMessage}>
              <textarea
                className="flex-1 p-2 border rounded-md resize-none"
                placeholder="Type your message..."
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
                // Added onKeyDown event handler to submit via Ctrl+Enter or Meta+Enter
                onKeyDown={handleKeyDown}
                rows={3}
              />
              <Button
                type="submit"
                className="mt-2"
                disabled={isSubmitting}
                title="Press Ctrl+Enter (Windows) or ⌘+Enter (Mac) to send"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-1" />
                )}
                Send
              </Button>
            </form>
          </Card>
        </div>
      </ChatLayout>
    </>
  );
};

export default Index;
