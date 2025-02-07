import { cn, formatDateBetter } from "@/Lib/utils";
import React from "react";
import { Message as MessageType } from "../Index";

// Updated getUserColor function to account for letter casing
function getUserColor(username: string): string {
  const colors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-purple-50",
    "bg-pink-50",
    "bg-yellow-50",
    "bg-orange-50",
    "bg-teal-50",
    "bg-indigo-50",
  ];

  // Normalize username to lower case for consistent hashing
  const normalized = username.toLowerCase();
  const hash = normalized.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the hash to pick a color
  return colors[Math.abs(hash) % colors.length];
}

const Message = ({
  message,
  marginClass,
  index,
}: {
  message: MessageType;
  marginClass: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] w-fit rounded-sm m-2",
        marginClass,
        index % 2 === 0 ? "ml-auto" : "mr-auto", // Alternate between left and right
        "transition-all duration-300" // Smooth animation for position changes
      )}
      style={{
        marginLeft: `${Math.random() * 20}%`, // Random horizontal position
      }}
    >
      <div
        className={cn(
          "flex flex-col rounded-xl shadow-md p-4", // Updated rounded class to rounded-xl
          getUserColor(message.sender)
        )}
      >
        <span className="font-semibold text-gray-800">{message.sender}</span>
        <p className="text-gray-600">{message.message}</p>
        <span className="mt-1 text-xs text-gray-400">
          {formatDateBetter(message.time)}
        </span>
      </div>
    </div>
  );
};

export default Message;
