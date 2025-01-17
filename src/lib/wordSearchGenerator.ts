import { generateWordsForCategory } from './ai';

const GRID_SIZE = 15;

// Direction vectors for word placement
const DIRECTIONS = {
  easy: [
    [0, 1],   // right
    [1, 0],   // down
  ],
  medium: [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal down-right
    [-1, 1],  // diagonal up-right
  ],
  hard: [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal down-right
    [-1, 1],  // diagonal up-right
    [0, -1],  // left (reverse)
    [-1, 0],  // up (reverse)
    [-1, -1], // diagonal up-left (reverse)
    [1, -1],  // diagonal down-left (reverse)
  ]
};

function createEmptyGrid(size: number): string[][] {
  return Array(size).fill(null).map(() => Array(size).fill(''));
}

function canPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dRow: number,
  dCol: number
): boolean {
  if (
    row + dRow * (word.length - 1) >= grid.length ||
    row + dRow * (word.length - 1) < 0 ||
    col + dCol * (word.length - 1) >= grid[0].length ||
    col + dCol * (word.length - 1) < 0
  ) {
    return false;
  }

  for (let i = 0; i < word.length; i++) {
    const currentCell = grid[row + dRow * i][col + dCol * i];
    if (currentCell !== '' && currentCell !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dRow: number,
  dCol: number
): void {
  for (let i = 0; i < word.length; i++) {
    grid[row + dRow * i][col + dCol * i] = word[i];
  }
}

function fillEmptyCells(grid: string[][]): void {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}

export async function generateWordSearch(
  category: string,
  numWords: number = 5,
  complexity: 'easy' | 'medium' | 'hard' = 'medium'
) {
  try {
    // Get words from AI based on category
    const words = await generateWordsForCategory(category, numWords);
    
    if (!words || words.length === 0) {
      throw new Error('No words generated');
    }

    const grid = createEmptyGrid(GRID_SIZE);
    const placedWords: string[] = [];
    const availableDirections = DIRECTIONS[complexity];

    // Try to place each word
    for (const word of words) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;

      // Skip words that are too long
      if (word.length > GRID_SIZE) {
        console.warn(`Word "${word}" is too long for the grid`);
        continue;
      }

      while (!placed && attempts < maxAttempts) {
        const direction = availableDirections[Math.floor(Math.random() * availableDirections.length)];
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        if (canPlaceWord(grid, word, row, col, direction[0], direction[1])) {
          placeWord(grid, word, row, col, direction[0], direction[1]);
          placedWords.push(word);
          placed = true;
        }

        attempts++;
      }

      if (!placed) {
        console.warn(`Could not place word "${word}" after ${maxAttempts} attempts`);
      }
    }

    // If no words were placed, throw an error
    if (placedWords.length === 0) {
      throw new Error('Could not place any words in the grid');
    }

    fillEmptyCells(grid);

    return {
      grid,
      words: placedWords,
    };
  } catch (error) {
    console.error('Error in generateWordSearch:', error);
    // Return a simple default puzzle if something goes wrong
    const defaultGrid = createEmptyGrid(GRID_SIZE);
    const defaultWords = ['ERROR'];
    placeWord(defaultGrid, 'ERROR', 0, 0, 0, 1);
    fillEmptyCells(defaultGrid);
    return {
      grid: defaultGrid,
      words: defaultWords,
    };
  }
}
