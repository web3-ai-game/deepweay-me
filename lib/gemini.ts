import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gemini API 配置
 * 支持付费和免费 API Key，自动故障转移
 */

// 从环境变量获取 API Keys
const PAID_API_KEY = process.env.GEMINI_API_KEY_PAID || "";
const FREE_API_KEYS = process.env.GEMINI_API_KEY_FREE?.split(",") || [];

// 当前使用的免费 Key 索引
let currentFreeKeyIndex = 0;

/**
 * 获取可用的 Gemini API Key
 * 优先使用付费 Key，失败时切换到免费 Key 集群
 */
function getApiKey(useFree: boolean = false): string {
  if (!useFree && PAID_API_KEY) {
    return PAID_API_KEY;
  }

  if (FREE_API_KEYS.length === 0) {
    throw new Error("No Gemini API keys available");
  }

  // 轮询免费 Keys
  const key = FREE_API_KEYS[currentFreeKeyIndex];
  currentFreeKeyIndex = (currentFreeKeyIndex + 1) % FREE_API_KEYS.length;
  return key;
}

/**
 * 创建 Gemini AI 实例
 */
export function createGeminiClient(useFree: boolean = false) {
  const apiKey = getApiKey(useFree);
  return new GoogleGenerativeAI(apiKey);
}

/**
 * 生成 AI 回复（流式输出）
 */
export async function* streamGeminiResponse(
  prompt: string,
  conversationHistory: { role: string; text: string }[] = []
) {
  try {
    // 先尝试付费 API
    const genAI = createGeminiClient(false);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // 构建聊天历史
    const chat = model.startChat({
      history: conversationHistory.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    });

    // 流式生成回复
    const result = await chat.sendMessageStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
      }
    }
  } catch (error: any) {
    console.error("Paid API failed, switching to free API:", error.message);

    // 如果付费 API 失败，切换到免费 API
    try {
      const genAI = createGeminiClient(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const chat = model.startChat({
        history: conversationHistory.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
      });

      const result = await chat.sendMessageStream(prompt);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (freeError: any) {
      console.error("Free API also failed:", freeError.message);
      throw new Error("All Gemini API keys exhausted");
    }
  }
}

/**
 * 生成 AI 回复（非流式）
 */
export async function generateGeminiResponse(
  prompt: string,
  conversationHistory: { role: string; text: string }[] = []
): Promise<string> {
  try {
    const genAI = createGeminiClient(false);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const chat = model.startChat({
      history: conversationHistory.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error("Paid API failed, switching to free API:", error.message);

    // 故障转移到免费 API
    const genAI = createGeminiClient(true);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const chat = model.startChat({
      history: conversationHistory.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }
}
