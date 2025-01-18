'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import WordSearchGrid from '@/components/WordSearchGrid';
import DownloadPDFButton from '@/components/DownloadPDFButton';
import { generateWordSearch } from '@/lib/wordSearchGenerator';



export default function Home() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [numWords, setNumWords] = useState(5);
  const [complexity, setComplexity] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [wordSearch, setWordSearch] = useState<{
    grid: string[][];
    words: string[];
    title: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateWordSearch = async () => {
    setLoading(true);
    try {
      const result = await generateWordSearch(category, numWords, complexity);
      setWordSearch({ ...result, title: title || category });
    } catch (error) {
      console.error('Error generating word search:', error);
    }
    setLoading(false);
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
        <div className="space-y-4">
          <h1 className="text-3xl md:text-3xl font-bold text-center title-gradient">
            AI Word Search Generator
          </h1>
          <p className="text-md md:text-lg text-center text-muted-foreground">
            Generate a word search puzzle using AI to find words related to a specific category. 
            Choose the number of words, complexity, and title for your word search. Download as a PDF.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create Your Word Search</CardTitle>
            <CardDescription>
              Fill in the details below to generate your custom word search puzzle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your word search"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category or Theme</Label>
              <Input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter a category (e.g., animals, countries)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numWords">Number of Words (Max Words: 25)</Label>
              <Input
                id="numWords"
                type="number"
                min={3}
                max={25}
                value={numWords}
                onChange={(e) => setNumWords(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity</Label>
              <select
                id="complexity"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value as 'easy' | 'medium' | 'hard')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="easy">Easy (only horizontal and vertical)</option>
                <option value="medium">Medium (includes diagonal)</option>
                <option value="hard">Hard (includes reverse words)</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCreateWordSearch}
              disabled={!category || loading}
              className="w-full"
            >
              {loading ? 'Generating...' : 'Generate Word Search'}
            </Button>
          </CardFooter>
        </Card>

        {wordSearch && (
          <Card>
            <CardHeader>
              <CardTitle>{wordSearch.title}</CardTitle>
              <CardDescription>Find all the words listed below in the grid.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <WordSearchGrid wordSearch={wordSearch} />
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-primary">Words to Find:</h2>
                <div className="flex flex-wrap gap-2">
                  {wordSearch.words.map((word, index) => (
                    <span key={index} className="word-item">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <DownloadPDFButton
                title={wordSearch.title}
                grid={wordSearch.grid}
                words={wordSearch.words}
              />
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
    
  );
}
