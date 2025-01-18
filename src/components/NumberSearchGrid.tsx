'use client';

interface NumberSearchGridProps {
  grid: string[][];
  className?: string;
}

export default function NumberSearchGrid({ grid, className = '' }: NumberSearchGridProps) {
  return (
    <div 
      className={`inline-grid gap-0.5 p-0.5 bg-gray-200 dark:bg-gray-700 ${className}`} 
      style={{ 
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((digit, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-8 h-8 flex items-center justify-center bg-background text-foreground text-sm font-medium select-none hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            {digit}
          </div>
        ))
      )}
    </div>
  );
}