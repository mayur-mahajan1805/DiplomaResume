'use server';

import { parseResumeExtractSkills } from '@/ai/flows/parse-resume-extract-skills';
import { recommendJobsBasedOnSkills } from '@/ai/flows/recommend-jobs-based-on-skills';
import { identifySkillGaps } from '@/ai/flows/identify-skill-gaps';
import { answerCareerQuestion } from '@/ai/flows/answer-career-questions';

export async function handleResumeAnalysis(resumeText: string) {
  if (!resumeText.trim()) {
    return { error: 'Resume text cannot be empty.' };
  }
  try {
    const result = await parseResumeExtractSkills({ resumeText });
    return { data: result };
  } catch (e: any) {
    console.error('Error in handleResumeAnalysis:', e);
    return { error: e.message || 'Failed to analyze resume.' };
  }
}

export async function handleJobRecommendation(skills: string[]) {
  if (!skills || skills.length === 0) {
    return { error: 'No skills provided for job recommendation.' };
  }
  try {
    const result = await recommendJobsBasedOnSkills({ skills });
    return { data: result };
  } catch (e: any) {
    console.error('Error in handleJobRecommendation:', e);
    return { error: e.message || 'Failed to recommend jobs.' };
  }
}

export async function handleSkillGapAnalysis(
  resumeText: string,
  jobRole: string
) {
  if (!resumeText.trim() || !jobRole.trim()) {
    return { error: 'Resume text and job role are required.' };
  }
  try {
    const result = await identifySkillGaps({ resumeText, jobRole });
    return { data: result };
  } catch (e: any) {
    console.error('Error in handleSkillGapAnalysis:', e);
    return { error: e.message || 'Failed to analyze skill gaps.' };
  }
}

export async function handleCareerQuestion(question: string) {
  if (!question.trim()) {
    return { error: 'Question cannot be empty.' };
  }
  try {
    const result = await answerCareerQuestion({ question });
    return { data: result };
  } catch (e: any) {
    console.error('Error in handleCareerQuestion:', e);
    return { error: e.message || 'Failed to answer career question.' };
  }
}
