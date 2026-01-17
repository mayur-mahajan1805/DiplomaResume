"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Github, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    const routes = [
        {
            href: "/",
            label: "All",
        },
        {
            href: "/dashboard",
            label: "Experience", // Mapping Dashboard -> Experience concept from ref
        },
        {
            href: "/chat",
            label: "Projects", // Mapping Chat -> Projects concept from ref
        },
        {
            href: "/about",
            label: "About"
        }
    ]

    // Simplified menu mapping for actual routes
    const navItems = [
        { name: 'All', href: '/' },
        { name: 'Dashboard', href: '/#dashboard' },
        // { name: 'Projects', href: '/projects' }, // Placeholder
        // { name: 'About', href: '/about' }, // Placeholder 
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <div className="flex w-full max-w-7xl items-center justify-between pointer-events-auto">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
                        <span className="text-white">CB</span>
                        {/* Placeholder Logo Initials matching reference style */}
                    </Link>
                </div>

                {/* Center Nav */}
                <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1 backdrop-blur-md">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                                    isActive ? "text-white" : "text-zinc-400"
                                )}
                            >
                                {isActive && (
                                    <span className="absolute inset-0 rounded-full bg-white/10" />
                                )}
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full border border-white/10 bg-black/50 text-zinc-400 hover:bg-white/10 hover:text-white"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
