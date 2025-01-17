import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-8 p-4 text-center bg-background/80 backdrop-blur-sm border-t border-border/40">
      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
        Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by{' '}
        <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          Elugens
        </span>
      </p>
    </footer>
  );
}
