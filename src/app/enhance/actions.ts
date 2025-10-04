"use server";

import { enhancePhotoSuggestions } from "@/ai/flows/enhance-photo-suggestions";
import type { EnhancePhotoSuggestionsOutput } from "@/ai/flows/enhance-photo-suggestions";

export async function getPhotoEnhancementSuggestions(
  photoDataUri: string
): Promise<{ suggestions: string } | { error: string }> {
  try {
    if (!photoDataUri || !photoDataUri.startsWith("data:image/")) {
      throw new Error("Invalid photo data URI provided.");
    }
    const result: EnhancePhotoSuggestionsOutput = await enhancePhotoSuggestions({ photoDataUri });
    return result;
  } catch (e: any) {
    console.error("Error getting photo enhancement suggestions:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}
