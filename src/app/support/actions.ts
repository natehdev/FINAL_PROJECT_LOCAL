"use server";

import { getSupportResponse } from "@/ai/flows/support-chat";

interface Message {
  role: "user" | "model";
  content: string;
}

export async function getAiSupportResponse(
  history: Message[],
  message: string
): Promise<{ response: string } | { error: string }> {
  try {
    if (!message) {
      throw new Error("Message cannot be empty.");
    }
    const result = await getSupportResponse({ history, message });
    return result;
  } catch (e: any) {
    console.error("Error getting AI support response:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}
