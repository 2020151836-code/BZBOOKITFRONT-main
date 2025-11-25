import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { api } from "@/lib/api";

interface ChatResponse {
  reply: string;
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are a helpful assistant for BZ Book It.",
    },
    {
      role: "assistant",
      content: "Hello! I'm the BZ Book It assistant. How can I help you today? You can ask me about booking appointments, services, pricing, or anything else!",
    },
  ]);

  const chatMutation = useMutation({
    mutationFn: async (newMessages: Message[]) => {
      // The backend expects the model name and the message history
      const payload = {
        model: "gemini-1.5-flash-001", // Using gemini-1.5-flash-001 as requested
        messages: newMessages,
      };
      // We expect a response with a `reply` property
      return api<ChatResponse>("/chat", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: (data) => {
      // Add the AI's response to the message history
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    },
    onError: (error) => {
      console.error("Chat API error:", error);
      toast.error("Sorry, I'm having trouble connecting. Please try again later.");
      // Optional: remove the user's last message to allow them to retry
      setMessages((prev) => prev.slice(0, -1));
    },
  });

  const handleSendMessage = (content: string) => {
    // Add the user's new message to the state
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);

    // Call the mutation to send the full message history to the backend
    chatMutation.mutate(newMessages);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <AIChatBox
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={chatMutation.isPending}
          suggestedPrompts={[
            "What services do you offer?",
            "What are your business hours?",
            "How do I book an appointment?",
          ]}
        />
      </div>
    </div>
  );
}
