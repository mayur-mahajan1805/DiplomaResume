'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending job roles based on a user's skills.
 *
 * - recommendJobsBasedOnSkills - A function that takes a list of skills and recommends job roles.
 * - RecommendJobsBasedOnSkillsInput - The input type for the recommendJobsBasedOnSkills function.
 * - RecommendJobsBasedOnSkillsOutput - The return type for the recommendJobsBasedOnSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendJobsBasedOnSkillsInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills extracted from the user\u2019s resume.'),
});
export type RecommendJobsBasedOnSkillsInput = z.infer<typeof RecommendJobsBasedOnSkillsInputSchema>;

const JobRecommendationSchema = z.object({
  jobRole: z.string().describe('The name of the recommended job role.'),
  matchPercentage: z.number().describe('The percentage of skills that match the job role requirements.'),
  explanation: z.string().describe('An explanation of why this job role is recommended based on the user\u2019s skills.'),
});

const RecommendJobsBasedOnSkillsOutputSchema = z.object({
  recommendations: z.array(JobRecommendationSchema).describe('A list of recommended job roles with match percentages and explanations.'),
});
export type RecommendJobsBasedOnSkillsOutput = z.infer<typeof RecommendJobsBasedOnSkillsOutputSchema>;

export async function recommendJobsBasedOnSkills(input: RecommendJobsBasedOnSkillsInput): Promise<RecommendJobsBasedOnSkillsOutput> {
  return recommendJobsBasedOnSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendJobsBasedOnSkillsPrompt',
  input: {schema: RecommendJobsBasedOnSkillsInputSchema},
  output: {schema: RecommendJobsBasedOnSkillsOutputSchema},
  prompt: `You are an AI career advisor. You will receive a list of skills from a user's resume and will respond with job recommendations.

  Recommend 3-5 job roles that best match the user's skills. For each role, provide a match percentage (0-100) indicating how well the user's skills align with the role's requirements. Also, explain why each role is recommended based on the user's skills.
  Skills: {{skills}}

  Format your output as a JSON object that adheres to the following schema:
  ${JSON.stringify(RecommendJobsBasedOnSkillsOutputSchema.shape, null, 2)}`,
});

const recommendJobsBasedOnSkillsFlow = ai.defineFlow(
  {
    name: 'recommendJobsBasedOnSkillsFlow',
    inputSchema: RecommendJobsBasedOnSkillsInputSchema,
    outputSchema: RecommendJobsBasedOnSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
