// 'use server'
'use server';

/**
 * @fileOverview Generates personalized meditation prompts based on user mood and goals.
 *
 * - generatePersonalizedMeditationPrompt - A function to generate personalized meditation prompts.
 * - GeneratePersonalizedMeditationPromptInput - The input type for the generatePersonalizedMeditationPrompt function.
 * - GeneratePersonalizedMeditationPromptOutput - The output type for the generatePersonalizedMeditationPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedMeditationPromptInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
  goals: z.string().describe('The meditation goals of the user.'),
});
export type GeneratePersonalizedMeditationPromptInput = z.infer<typeof GeneratePersonalizedMeditationPromptInputSchema>;

const GeneratePersonalizedMeditationPromptOutputSchema = z.object({
  prompt: z.string().describe('A personalized meditation prompt based on the user input.'),
});
export type GeneratePersonalizedMeditationPromptOutput = z.infer<typeof GeneratePersonalizedMeditationPromptOutputSchema>;

export async function generatePersonalizedMeditationPrompt(
  input: GeneratePersonalizedMeditationPromptInput
): Promise<GeneratePersonalizedMeditationPromptOutput> {
  return generatePersonalizedMeditationPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedMeditationPromptPrompt',
  input: {schema: GeneratePersonalizedMeditationPromptInputSchema},
  output: {schema: GeneratePersonalizedMeditationPromptOutputSchema},
  prompt: `You are a meditation expert. Generate a personalized meditation prompt based on the user's mood and goals.

Mood: {{{mood}}}
Goals: {{{goals}}}

Prompt:`,
});

const generatePersonalizedMeditationPromptFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedMeditationPromptFlow',
    inputSchema: GeneratePersonalizedMeditationPromptInputSchema,
    outputSchema: GeneratePersonalizedMeditationPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
