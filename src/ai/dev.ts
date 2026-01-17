import { config } from 'dotenv';
config();

import '@/ai/flows/identify-skill-gaps.ts';
import '@/ai/flows/recommend-jobs-based-on-skills.ts';
import '@/ai/flows/parse-resume-extract-skills.ts';
import '@/ai/flows/answer-career-questions.ts';