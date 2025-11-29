import { NextRequest, NextResponse } from "next/server";
import { streamGeminiResponse } from "@/lib/gemini";

export const runtime = "edge";

/**
 * POST /api/chat
 * 处理 AI 聊天请求，支持流式输出
 */
export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 使用生成器逐块发送数据
          for await (const chunk of streamGeminiResponse(message, history || [])) {
            const text = encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`);
            controller.enqueue(text);
          }

          // 发送结束标记
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error: any) {
          console.error("Stream error:", error);
          const errorMessage = encoder.encode(
            `data: ${JSON.stringify({ error: error.message })}\n\n`
          );
          controller.enqueue(errorMessage);
          controller.close();
        }
      },
    });

    // 返回流式响应
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
