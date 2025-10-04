'use server';

/**
 * @fileOverview This file defines a Genkit flow for an AI-powered support chatbot.
 *
 * - getSupportResponse - A function that takes a user's message and conversation history to generate a response.
 * - SupportChatInput - The input type for the getSupportResponse function.
 * - SupportChatOutput - The return type for the getSupportResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const SupportChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

const SupportChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response.'),
});
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;


export async function getSupportResponse(
  input: SupportChatInput
): Promise<SupportChatOutput> {
  return supportChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportChatPrompt',
  input: {schema: SupportChatInputSchema},
  output: {schema: SupportChatOutputSchema},
  prompt: `You are a friendly and knowledgeable customer support agent for Fotoprix, a company that specializes in high-quality photo printing, personalized gifts, photo albums, and home decor.

Your role is to assist users with their questions about products, services, order status, and general inquiries. Be helpful, polite, and provide clear and concise answers.

Here is the conversation history so far:
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}

Here is the user's latest message:
- user: {{{message}}}

Provide a helpful response to the user's message.`,
});

const supportChatFlow = ai.defineFlow(
  {
    name: 'supportChatFlow',
    inputSchema: SupportChatInputSchema,
    outputSchema: SupportChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
        response: output!.response
    };
  }
);
