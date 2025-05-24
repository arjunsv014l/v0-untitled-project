import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://dreamclerk.com", // Replace with your actual domain
        "X-Title": "DreamClerk Assistant",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for DreamClerk, a platform that connects students with opportunities. Be friendly, concise, and helpful. Limit responses to 2-3 sentences when possible.",
          },
          ...messages,
        ],
      }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
