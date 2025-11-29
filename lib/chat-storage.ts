import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export interface ChatMessage {
  id?: string;
  userId: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

/**
 * 保存聊天消息到 Firestore
 */
export async function saveChatMessage(
  userId: string,
  role: "user" | "assistant",
  text: string
): Promise<string> {
  try {
    const messagesRef = collection(db, "chat_messages");
    const docRef = await addDoc(messagesRef, {
      userId,
      role,
      text,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
}

/**
 * 获取用户的聊天历史
 */
export async function getChatHistory(
  userId: string,
  limit: number = 50
): Promise<ChatMessage[]> {
  try {
    const messagesRef = collection(db, "chat_messages");
    const q = query(
      messagesRef,
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    const messages: ChatMessage[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        userId: data.userId,
        role: data.role,
        text: data.text,
        timestamp: data.timestamp.toDate(),
      });
    });

    // 返回最新的 N 条消息（倒序）
    return messages.reverse().slice(-limit);
  } catch (error) {
    console.error("Error getting chat history:", error);
    return [];
  }
}

/**
 * 批量保存聊天消息
 */
export async function saveChatMessages(
  userId: string,
  messages: { role: "user" | "assistant"; text: string }[]
): Promise<void> {
  try {
    const messagesRef = collection(db, "chat_messages");
    const promises = messages.map((msg) =>
      addDoc(messagesRef, {
        userId,
        role: msg.role,
        text: msg.text,
        timestamp: Timestamp.now(),
      })
    );
    await Promise.all(promises);
  } catch (error) {
    console.error("Error saving chat messages:", error);
    throw error;
  }
}
