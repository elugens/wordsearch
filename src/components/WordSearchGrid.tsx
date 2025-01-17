interface WordSearchGridProps {
  wordSearch: {
    grid: string[][];
    words: string[];
    title: string;
  };
}

export default function WordSearchGrid({ wordSearch }: WordSearchGridProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {wordSearch.title && (
        <h2 className="text-2xl font-bold text-primary mb-4">
          {wordSearch.title}
        </h2>
      )}
      <div className="grid grid-cols-15 gap-0.5">
        {wordSearch.grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="word-search-cell"
            >
              {letter}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
