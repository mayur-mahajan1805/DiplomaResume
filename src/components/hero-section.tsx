"use client"

import {
    type AnimationVariant,
    TextAnimate,
} from "@/components/magicui/text-animate"
import { Compare } from "@/components/ui/compare"
import { Cover } from "@/components/ui/cover"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { memo, useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

const ROLE_TITLES = [
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "AI Enthusiast",
]

const animationTypes: AnimationVariant[] = [
    "fadeIn",
    "blurIn",
    "blurInUp",
    "blurInDown",
    "slideUp",
    "slideDown",
    "slideLeft",
    "slideRight",
    "scaleUp",
    "scaleDown",
]

export const HeroSection = () => {
    const [currentText, setCurrentText] = useState(ROLE_TITLES[0])
    const [currentAnimation, setCurrentAnimation] = useState(animationTypes[0])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => {
                const textIndex = ROLE_TITLES.indexOf(prev)
                if (textIndex === ROLE_TITLES.length - 1) {
                    return ROLE_TITLES[0]
                }

                return ROLE_TITLES[textIndex + 1]
            })
            setCurrentAnimation(
                animationTypes[Math.floor(Math.random() * animationTypes.length)]
            )
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4 md:px-0 py-10 lg:py-0 relative">
            {/* Left Content */}
            <div className="flex-1 relative z-10 flex flex-col justify-center items-start w-full lg:max-w-xl">
                {/* Welcome Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-xs font-medium text-zinc-300 mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Welcome to my universe
                </div>

                {/* Main Title Group */}
                <div className="relative mb-8 z-20">
                    {/* Floating Badge 1 - AI Resume - Moved closer to Hello */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: [0, -10, 0] }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            y: {
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut",
                            },
                        }}
                        className="absolute -top-10 left-32 md:left-40 px-3 py-1.5 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-lg text-xs md:text-sm text-purple-200 font-medium rotate-6 hidden md:block"
                    >
                        Success Rate Analysis
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 mb-2 leading-[0.9]">
                        Hello
                    </h1>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 leading-[0.9]">
                        <span className="whitespace-nowrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl">I'm</span>
                        {/* Made box smaller with reduced padding and text size adjustment */}
                        <Cover className="px-3 py-1 text-3xl sm:text-4xl md:text-5xl lg:text-5xl">Mayur</Cover>
                    </div>

                    {/* Floating Badge 2 - Clean Code - Moved closer to Hello/I'm */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
                        transition={{
                            duration: 0.5,
                            delay: 0.4,
                            y: {
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut",
                                delay: 1.5, // Offset animation
                            },
                        }}
                        className="absolute top-0 -right-2 md:-right-12 px-3 py-1.5 bg-blue-900/40 backdrop-blur-sm border border-blue-500/30 rounded-lg text-xs md:text-sm text-blue-200 font-medium -rotate-6 hidden lg:block"
                    >
                        Smart Matching
                    </motion.div>
                </div>

                {/* Role & Description */}
                <div className="space-y-6 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-300 font-medium">
                        <span className="text-white">UI/UX Enthusiast</span>
                    </div>

                    <div className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                        <span className="text-white font-medium">This is My AI-Powered Career Guidance</span> <span className="inline-block animate-pulse">🚀</span> | Skill Gap Analysis <span className="inline-block">📊</span>
                        <br />
                        <span className="text-zinc-500 text-base mt-2 block">
                            Empowering your career journey with data-driven insights and personalized recommendations. <Sparkles className="inline w-4 h-4 text-yellow-500" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Content - Compare Demo */}
            <div className="flex-1 w-full lg:h-auto lg:min-h-[600px] flex items-center justify-center relative p-8 z-0">
                {/* Code Editor Style Wrapper for Compare Component */}
                <div className="w-full max-w-2xl relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10" />

                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-black/80 shadow-2xl backdrop-blur-sm">
                        {/* Editor Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="text-xs text-zinc-500 font-mono">portfolio.tsx</div>
                            <div className="w-10" />
                        </div>

                        {/* Compare Component Content */}
                        <div className="p-1 bg-zinc-950/50">
                            <Compare
                                firstImage="/code-snippet.jpg"
                                secondImage="https://voocgavdbpy2gucg.public.blob.vercel-storage.com/portfolio/image%20%284%29-Z38KH4uoJOoyhY6YDXVDNxRu8uWZUS.png"
                                firstImageClassName="object-cover object-left-top opacity-80"
                                secondImageClassname="object-cover object-left-top"
                                className="h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-xl"
                                slideMode="hover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CompareDemo() {
    // Kept for backward compatibility if imported elsewhere, but mostly unused now inside HeroSection
    return (
        <div className="w-full border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800">
            <Compare
                firstImage="/code-snippet.jpg"
                secondImage="https://voocgavdbpy2gucg.public.blob.vercel-storage.com/portfolio/image%20%284%29-Z38KH4uoJOoyhY6YDXVDNxRu8uWZUS.png"
                firstImageClassName="object-cover object-left-top"
                secondImageClassname="object-cover object-left-top"
                className="h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] w-full"
                slideMode="hover"
            />
        </div>
    )
}

export const Title = memo(() => {
    return (
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight sm:my-6 dark:text-zinc-300 text-zinc-700">
            <Cover>Future</Cover>
        </h1>
    )
})

Title.displayName = "Title"
