'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import NumberSearchGrid from '@/components/NumberSearchGrid';
import DownloadPDFButton from '@/components/DownloadPDFButton';
import { generateNumberSearch } from '@/lib/numberSearchGenerator';

const NumberSearchPDF = dynamic(() => import('@/components/NumberSearchPDF'), {
  ssr: false,
});

export default function NumberSearch() {
  const [title, setTitle] = useState('');
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(999);
  const [numbersToFind, setNumbersToFind] = useState(8);
  const [complexity, setComplexity] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [includeEquations, setIncludeEquations] = useState(false);
  const [numberSearch, setNumberSearch] = useState<{
    grid: string[][];
    numbers: number[];
    equations?: { equation: string; result: number; }[];
    title: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateNumberSearch = async () => {
    if (!title) {
      alert('Please enter a title for your number search puzzle');
      return;
    }

    setLoading(true);
    try {
      const result = generateNumberSearch({
        minNumber,
        maxNumber,
        numbersToFind,
        complexity,
        includeEquations,
      });

      setNumberSearch({
        ...result,
        title,
      });
    } catch (error) {
      console.error('Error generating number search:', error);
      alert('Failed to generate number search puzzle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 md:py-12 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center mb-6">
          <a 
            href="https://www.producthunt.com/posts/wordsearch-diy?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-wordsearch&#0045;diy" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=794725&theme=light&t=1737225303705" 
              alt="WordSearch.diy - Create custom word search puzzles with AI!" 
              width="250" 
              height="54" 
              style={{ width: '250px', height: '54px' }}
            />
          </a>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold text-center">AI Number Search Puzzle Generator</h1>
          <p className="text-muted-foreground text-center max-w-[600px]">
            Create your own number search puzzle! Enter a title and customize your settings below. Include equations if desired. Download as a PDF.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Number Search</CardTitle>
            <CardDescription>
              Customize your number search puzzle settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your number search"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minNumber">Minimum Number</Label>
                <Input
                  id="minNumber"
                  type="number"
                  value={minNumber}
                  onChange={(e) => setMinNumber(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxNumber">Maximum Number</Label>
                <Input
                  id="maxNumber"
                  type="number"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(Number(e.target.value))}
                  min={minNumber}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numbersToFind">Numbers to Find</Label>
              <Input
                id="numbersToFind"
                type="number"
                value={numbersToFind}
                onChange={(e) => setNumbersToFind(Number(e.target.value))}
                min={1}
                max={20}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity</Label>
              <select
                id="complexity"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value as 'easy' | 'medium' | 'hard')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeEquations"
                  checked={includeEquations}
                  onChange={(e) => setIncludeEquations(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="includeEquations">Include Equations</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate equations that students need to solve to find the numbers
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateNumberSearch} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Number Search'}
            </Button>
          </CardFooter>
        </Card>

        {numberSearch && (
          <Card>
            <CardHeader>
              <CardTitle>{numberSearch.title}</CardTitle>
              {numberSearch.equations ? (
                <>
                  <CardDescription>
                    Solve these equations to find the numbers:
                  </CardDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {numberSearch.equations.map((eq, index) => (
                      <div key={index} className="p-2 bg-muted rounded-md">
                        {eq.equation}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <CardDescription>
                  Find these numbers: {numberSearch.numbers.join(', ')}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex justify-center">
              <NumberSearchGrid grid={numberSearch.grid} />
            </CardContent>
            <CardFooter className="flex justify-center">
              <DownloadPDFButton
                type="number"
                title={numberSearch.title}
                grid={numberSearch.grid}
                numbers={numberSearch.numbers}
                equations={numberSearch.equations}
              />
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
