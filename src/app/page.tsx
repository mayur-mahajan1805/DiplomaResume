"use client"

import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { HeroSection } from '@/components/hero-section';
import { FullScreen } from '@/components/full-screen';
import DotGrid from '@/components/ui/dot-grid';
import { Navbar } from '@/components/navbar';
import { ChatInterface } from '@/components/chat/chat-interface';
import { useTheme } from 'next-themes';

export default function DashboardPage() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <main className="min-h-screen bg-background overflow-hidden relative selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <DotGrid
          dotSize={2}
          gap={24}
          baseColor={isDark ? "#404040" : "#d1d5db"}
          activeColor={isDark ? "#ffffff" : "#000000"}
          speedTrigger={100}
        />
      </div>

      <Navbar />

      <div className="relative z-10 px-4 md:px-8">
        <FullScreen className="w-full xl:w-[95%] mx-auto flex items-center">
          <HeroSection />
        </FullScreen>

        <div className="w-full xl:w-[90%] mx-auto py-20" id="dashboard">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            {/* Dashboard Column */}
            <div className="xl:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold text-center xl:text-left bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-500">
                {/* Your Career Dashboard */}
              </h2>
              <DashboardClient />
            </div>

            {/* Chat Column */}
            <div className="xl:col-span-1 space-y-8 sticky top-24">
              <h2 className="text-3xl font-bold text-center xl:text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-500">
                AI Assistant
              </h2>
              <div className="border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950/50 backdrop-blur-md shadow-2xl h-[600px] xl:h-[700px]">
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
