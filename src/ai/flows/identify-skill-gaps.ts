'use server';

/**
 * @fileOverview Identifies skill gaps between a user's resume and recommended job roles,
 * suggesting learning resources for improvement.
 *
 * - identifySkillGaps - A function that handles the skill gap identification process.
 * - IdentifySkillGapsInput - The input type for the identifySkillGaps function.
 * - IdentifySkillGapsOutput - The return type for the identifySkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifySkillGapsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The plain text content of the user\'s resume.'),
  jobRole: z.string().describe('The recommended job role to analyze.'),
});
export type IdentifySkillGapsInput = z.infer<typeof IdentifySkillGapsInputSchema>;

const IdentifySkillGapsOutputSchema = z.object({
  missingSkills: z
    .array(z.string())
    .describe('A list of skills missing from the resume for the job role.'),
  learningResources: z
    .array(z.string())
    .describe('Suggested learning resources for the missing skills.'),
  reasoning: z
    .string()
    .describe('The AI\'s reasoning behind the identified skill gaps and suggested resources.'),
});
export type IdentifySkillGapsOutput = z.infer<typeof IdentifySkillGapsOutputSchema>;

export async function identifySkillGaps(input: IdentifySkillGapsInput): Promise<IdentifySkillGapsOutput> {
  return identifySkillGapsFlow(input);
}

const identifySkillGapsPrompt = ai.definePrompt({
  name: 'identifySkillGapsPrompt',
  input: {schema: IdentifySkillGapsInputSchema},
  output: {schema: IdentifySkillGapsOutputSchema},
  prompt: `You are an AI career advisor. Given the following resume text and a recommended job role, identify any skills missing from the resume that are required for the job role. Also, suggest learning resources for the missing skills.

Resume Text: {{{resumeText}}}

Job Role: {{{jobRole}}}

Format your response as follows:
Missing Skills: [list of missing skills]
Learning Resources: [list of suggested learning resources]
Reasoning: [explanation of the skill gaps and resource suggestions]`,
});

const identifySkillGapsFlow = ai.defineFlow(
  {
    name: 'identifySkillGapsFlow',
    inputSchema: IdentifySkillGapsInputSchema,
    outputSchema: IdentifySkillGapsOutputSchema,
  },
  async input => {
    const {output} = await identifySkillGapsPrompt(input);
    return output!;
  }
);
