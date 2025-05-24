import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { studentProfile, query } = await request.json()

    const systemPrompt = `You are an expert career counselor for college students. 
    You have access to the following student information:
    - Major: ${studentProfile.major}
    - Year: ${studentProfile.year}
    - Interests: ${studentProfile.interests.join(", ")}
    - Skills: ${studentProfile.skills.join(", ")}
    - Career Goals: ${studentProfile.careerGoals}
    
    Provide personalized, actionable career advice. Be encouraging and specific.`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://dreamclerk.com",
        "X-Title": "DreamClerk Career Counselor",
      },
      body: JSON.stringify({
        model: "openai/gpt-4", // Using GPT-4 for more nuanced advice
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in career counselor API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
