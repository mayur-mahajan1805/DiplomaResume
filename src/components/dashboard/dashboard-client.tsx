'use client';

import * as React from 'react';
import {
  handleResumeAnalysis,
  handleJobRecommendation,
  handleSkillGapAnalysis,
} from '@/lib/actions';
import type {
  ParseResumeExtractSkillsOutput,
  RecommendJobsBasedOnSkillsOutput,
  IdentifySkillGapsOutput,
} from '@/ai/flows';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Sparkles, Briefcase, GraduationCap, ClipboardList, Lightbulb, Search, BarChart, FileText } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Input } from '../ui/input';

type LoadingState = 'resume' | 'jobs' | 'gaps' | false;

export function DashboardClient() {
  const [resumeText, setResumeText] = React.useState('');
  const [analysisResult, setAnalysisResult] = React.useState<ParseResumeExtractSkillsOutput | null>(null);
  const [jobRecommendations, setJobRecommendations] = React.useState<RecommendJobsBasedOnSkillsOutput | null>(null);
  const [skillGapAnalysis, setSkillGapAnalysis] = React.useState<{ jobRole: string; analysis: IdentifySkillGapsOutput } | null>(null);
  const [loading, setLoading] = React.useState<LoadingState>(false);
  const { toast } = useToast();

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload a PDF file.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setLoading('resume');

    try {
      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to parse PDF.');
      }

      const data = await response.json();
      setResumeText(data.text);
      await triggerResumeAnalysis(data.text);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not parse the PDF file.',
      });
      setLoading(false);
    }
  };

  const triggerResumeAnalysis = async (text: string) => {
    if (!text.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Resume content cannot be empty.',
      });
      return;
    }
    setLoading('resume');
    setAnalysisResult(null);
    setJobRecommendations(null);
    setSkillGapAnalysis(null);

    const result = await handleResumeAnalysis(text);
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: result.error,
      });
      setLoading(false);
    } else {
      setAnalysisResult(result.data!);
      toast({
        title: 'Analysis Complete',
        description: 'Your resume has been successfully analyzed.',
      });
      setLoading(false);
    }
  };

  const triggerJobRecommendation = async () => {
    if (!analysisResult?.skills) return;

    setLoading('jobs');
    setJobRecommendations(null);
    setSkillGapAnalysis(null);
    const result = await handleJobRecommendation(analysisResult.skills);
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Recommendation Failed',
        description: result.error,
      });
    } else {
      setJobRecommendations(result.data!);
    }
    setLoading(false);
  };

  const triggerSkillGapAnalysis = async (jobRole: string) => {
    setLoading('gaps');
    setSkillGapAnalysis(null);
    const result = await handleSkillGapAnalysis(resumeText, jobRole);
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Skill Gap Analysis Failed',
        description: result.error,
      });
    } else {
      setSkillGapAnalysis({ jobRole, analysis: result.data! });
    }
    setLoading(false);
  };

  const chartData = jobRecommendations?.recommendations.map(r => ({
    name: r.jobRole,
    match: r.matchPercentage,
  })) || [];

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-primary">
            <FileText />
            Resume Analysis
          </CardTitle>
          <CardDescription>
            Paste your resume text below or upload a PDF to get started. Our AI will extract your skills, experience, and education.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Textarea
              placeholder="Paste your resume here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[200px] focus:ring-primary"
            />
            <div className="flex items-center gap-4">
              <Button onClick={() => triggerResumeAnalysis(resumeText)} disabled={loading === 'resume'}>
                {loading === 'resume' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Analyze Resume Text
              </Button>
              <div className="relative">
                <Button asChild variant="outline">
                    <label htmlFor="pdf-upload">
                        {loading === 'resume' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        Upload PDF
                    </label>
                </Button>
                <Input id="pdf-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onFileChange} accept=".pdf" disabled={loading === 'resume'} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {loading === 'resume' && <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>}

      {analysisResult && (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Extracted Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {analysisResult.skills.map((skill, i) => <Badge key={i} variant="secondary" className="text-sm">{skill}</Badge>)}
                </CardContent>
                <CardFooter>
                  <Button onClick={triggerJobRecommendation} disabled={loading === 'jobs'} className="w-full">
                    {loading === 'jobs' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                    Find Matching Jobs
                  </Button>
                </CardFooter>
            </Card>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase className="text-primary"/> Experience Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{analysisResult.experience}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GraduationCap className="text-primary"/> Education Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{analysisResult.education}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

      {loading === 'jobs' && <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>}

      {jobRecommendations && (
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/> Job Recommendations</CardTitle>
                  <CardDescription>Based on your skills, here are some job roles you might be a good fit for.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                            <Tooltip
                              contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                              labelStyle={{ color: "hsl(var(--foreground))" }}
                            />
                            <Bar dataKey="match" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {jobRecommendations.recommendations.map((job, i) => (
                      <Card key={i} className="bg-background/50">
                          <CardHeader>
                              <CardTitle>{job.jobRole}</CardTitle>
                              <CardDescription>
                                <Progress value={job.matchPercentage} className="w-full my-2 h-2" />
                                {`A ${job.matchPercentage}% match based on your skills.`}
                              </CardDescription>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground">{job.explanation}</p>
                          </CardContent>
                          <CardFooter>
                              <Button variant="link" onClick={() => triggerSkillGapAnalysis(job.jobRole)} disabled={loading === 'gaps' && skillGapAnalysis?.jobRole !== job.jobRole}>
                                  {loading === 'gaps' && skillGapAnalysis?.jobRole === job.jobRole ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Lightbulb className="mr-2 h-4 w-4" />}
                                  Analyze Skill Gaps
                              </Button>
                          </CardFooter>
                      </Card>
                  ))}
                </div>
              </CardContent>
          </Card>
      )}

      {skillGapAnalysis && (
          <Card className="border-accent/50">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <ClipboardList/>
                    Skill Gap Analysis for: {skillGapAnalysis.jobRole}
                  </CardTitle>
                  <CardDescription>{skillGapAnalysis.analysis.reasoning}</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                      <h3 className="font-semibold mb-2">Missing Skills</h3>
                      <div className="flex flex-col gap-2">
                        {skillGapAnalysis.analysis.missingSkills.map((skill, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                                <span className="text-sm">{skill}</span>
                            </div>
                        ))}
                      </div>
                  </div>
                   <div>
                      <h3 className="font-semibold mb-2">Suggested Learning Resources</h3>
                      <div className="flex flex-col gap-2">
                        {skillGapAnalysis.analysis.learningResources.map((resource, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                                <span className="text-sm">{resource}</span>
                            </div>
                        ))}
                      </div>
                  </div>
              </CardContent>
          </Card>
      )}

    </div>
  );
}
