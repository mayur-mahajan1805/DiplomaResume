'use server';

/**
 * @fileOverview A resume parsing AI agent that extracts skills, experience, and education.
 *
 * - parseResumeExtractSkills - A function that handles the resume parsing process.
 * - ParseResumeExtractSkillsInput - The input type for the parseResumeExtractSkills function.
 * - ParseResumeExtractSkillsOutput - The return type for the parseResumeExtractSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeExtractSkillsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be parsed.'),
});
export type ParseResumeExtractSkillsInput = z.infer<
  typeof ParseResumeExtractSkillsInputSchema
>;

const ParseResumeExtractSkillsOutputSchema = z.object({
  skills: z.array(z.string()).describe('A list of technical and soft skills.'),
  experience: z
    .string()
    .describe('A summary of the work experience detailed in the resume.'),
  education: z
    .string()
    .describe('A summary of the education history detailed in the resume.'),
});
export type ParseResumeExtractSkillsOutput = z.infer<
  typeof ParseResumeExtractSkillsOutputSchema
>;

export async function parseResumeExtractSkills(
  input: ParseResumeExtractSkillsInput
): Promise<ParseResumeExtractSkillsOutput> {
  return parseResumeExtractSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseResumeExtractSkillsPrompt',
  input: {schema: ParseResumeExtractSkillsInputSchema},
  output: {schema: ParseResumeExtractSkillsOutputSchema},
  prompt: `You are an AI expert in resume parsing. Your task is to extract key information from the resume text provided, including skills, experience, and education. Return the information in the format specified in the output schema.

Resume Text: {{{resumeText}}}`,
});

const parseResumeExtractSkillsFlow = ai.defineFlow(
  {
    name: 'parseResumeExtractSkillsFlow',
    inputSchema: ParseResumeExtractSkillsInputSchema,
    outputSchema: ParseResumeExtractSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
