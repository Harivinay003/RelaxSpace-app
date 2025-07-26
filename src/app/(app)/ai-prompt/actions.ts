'use server';

import { generatePersonalizedMeditationPrompt, GeneratePersonalizedMeditationPromptInput } from '@/ai/flows/generate-personalized-meditation-prompt';

export async function generatePersonalizedMeditationPromptAction(
  input: GeneratePersonalizedMeditationPromptInput
) {
  try {
    const result = await generatePersonalizedMeditationPrompt(input);
    return result;
  } catch (error) {
    console.error("Error generating personalized prompt:", error);
    // In a real app, you might want to throw a more user-friendly error
    throw new Error('Failed to generate meditation prompt. Please try again later.');
  }
}
