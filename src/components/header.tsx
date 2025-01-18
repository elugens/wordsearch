'use client';

import { Brain, Menu, Search, Hash } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({ isMobile = false }) => (
    <>
      <Link
        href="/"
        className={`group inline-flex items-center rounded-md text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
          pathname === '/' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Search className="mr-2 h-4 w-4" />
        Word Search
      </Link>
      <Link
        href="/numbersearch"
        className={`group inline-flex items-center rounded-md text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
          pathname === '/numbersearch' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Hash className="mr-2 h-4 w-4" />
        Number Search
      </Link>
      {isMobile && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-sky-400"
        >
          <Link href="https://buymeacoffee.com/elugens" target="_blank" rel="noopener noreferrer">
            <span className="mr-2">☕</span>
            Buy Me a Coffee
          </Link>
        </Button>
      )}
    </>
  );

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
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <NavLinks isMobile={false} />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks isMobile={true} />
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Buy Me a Coffee Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:flex bg-sky-400"
          >
            <Link href="https://buymeacoffee.com/elugens" target="_blank" rel="noopener noreferrer">
              <span className="mr-2">☕</span>
              Buy Me a Coffee
            </Link>
          </Button>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
