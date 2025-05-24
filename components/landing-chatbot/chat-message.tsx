import type React from "react"
import { cn } from "@/lib/utils"

type ChatMessageProps = {
  message: string
  isUser: boolean
  isLoading?: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, isLoading = false }) => {
  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 border-2 border-dashed",
          isUser ? "bg-purple-100 border-purple-300 text-purple-900" : "bg-blue-50 border-blue-200 text-blue-900",
          "relative overflow-hidden",
        )}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message}</p>
        )}

        {/* Doodle decorations */}
        <div
          className={cn(
            "absolute w-6 h-6 border-2 border-dashed rounded-full",
            isUser ? "border-purple-300 -top-1 -right-1" : "border-blue-300 -top-1 -left-1",
          )}
        ></div>
        <div
          className={cn(
            "absolute w-4 h-4 border-2 border-dashed rounded-full",
            isUser ? "border-purple-300 -bottom-1 -left-1" : "border-blue-300 -bottom-1 -right-1",
          )}
        ></div>
      </div>
    </div>
  )
}
