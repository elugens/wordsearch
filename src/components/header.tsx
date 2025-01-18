'use client';

import { Brain } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-1.5 bg-sky-500">
            <Brain className="h-5 w-5 text-primary-foreground bg-sky-500" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            WordSearch.diy
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:flex bg-sky-400"
          >
            <Link href="https://buymeacoffee.com/elugens" target="_blank" rel="noopener noreferrer">
              <span className="mr-2">☕</span>
              Buy Me a Coffee
            </Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
