'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered suggestions for enhancing uploaded photos.
 *
 * - enhancePhotoSuggestions - A function that takes a photo and returns enhancement suggestions.
 * - EnhancePhotoSuggestionsInput - The input type for the enhancePhotoSuggestions function.
 * - EnhancePhotoSuggestionsOutput - The return type for the enhancePhotoSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePhotoSuggestionsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo to be enhanced, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the typo here
    ),
});
export type EnhancePhotoSuggestionsInput = z.infer<typeof EnhancePhotoSuggestionsInputSchema>;

const EnhancePhotoSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('AI-powered suggestions for enhancing the photo, such as brightness, contrast, sharpness, etc.'),
});
export type EnhancePhotoSuggestionsOutput = z.infer<typeof EnhancePhotoSuggestionsOutputSchema>;

export async function enhancePhotoSuggestions(
  input: EnhancePhotoSuggestionsInput
): Promise<EnhancePhotoSuggestionsOutput> {
  return enhancePhotoSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhancePhotoSuggestionsPrompt',
  input: {schema: EnhancePhotoSuggestionsInputSchema},
  output: {schema: EnhancePhotoSuggestionsOutputSchema},
  prompt: `You are an AI-powered photo enhancement expert. A user will provide a photo, and you will provide suggestions for enhancing the photo to improve its quality before printing. Suggestions should include adjustments to brightness, contrast, sharpness, and other relevant image properties.

Photo: {{media url=photoDataUri}}`,
});

const enhancePhotoSuggestionsFlow = ai.defineFlow(
  {
    name: 'enhancePhotoSuggestionsFlow',
    inputSchema: EnhancePhotoSuggestionsInputSchema,
    outputSchema: EnhancePhotoSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
