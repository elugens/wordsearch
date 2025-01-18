interface NumberSearchOptions {
  size?: number;
  minNumber?: number;
  maxNumber?: number;
  numbersToFind?: number;
  complexity: 'easy' | 'medium' | 'hard';
  includeEquations?: boolean;
}

interface EquationInfo {
  equation: string;
  result: number;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEquation(targetNumber: number, complexity: 'easy' | 'medium' | 'hard'): EquationInfo {
  switch (complexity) {
    case 'easy':
      // Simple addition or subtraction
      if (Math.random() > 0.5 && targetNumber > 2) {
        const num1 = generateRandomNumber(1, targetNumber - 1);
        return {
          equation: `${num1} + ${targetNumber - num1} = ?`,
          result: targetNumber
        };
      } else {
        const num1 = generateRandomNumber(targetNumber + 1, targetNumber + 10);
        return {
          equation: `${num1} - ${num1 - targetNumber} = ?`,
          result: targetNumber
        };
      }
    
    case 'medium':
      // Multiplication or division
      if (Math.random() > 0.5) {
        const factor = generateRandomNumber(2, 5);
        return {
          equation: `${targetNumber} × ${factor} = ?`,
          result: targetNumber * factor
        };
      } else {
        const factor = generateRandomNumber(2, 5);
        const product = targetNumber * factor;
        return {
          equation: `${product} ÷ ${factor} = ?`,
          result: targetNumber
        };
      }
    
    case 'hard':
      // Mixed operations
      const operations = ['+', '-', '×'];
      const op = operations[Math.floor(Math.random() * operations.length)];
      const num1 = generateRandomNumber(1, 10);
      const num2 = generateRandomNumber(1, 10);
      
      switch (op) {
        case '+':
          return {
            equation: `(${num1} × ${num2}) + ${targetNumber - (num1 * num2)} = ?`,
            result: targetNumber
          };
        case '-':
          return {
            equation: `(${num1} × ${num2}) - ${(num1 * num2) - targetNumber} = ?`,
            result: targetNumber
          };
        case '×':
          if (targetNumber % num1 === 0) {
            return {
              equation: `${targetNumber / num1} × ${num1} =`,
              result: targetNumber
            };
          } else {
            return {
              equation: `${num1} × ${num2} + ${targetNumber - (num1 * num2)} = ?`,
              result: targetNumber
            };
          }
      }
  }
  
  // Fallback simple equation
  return {
    equation: `? = ${targetNumber}`,
    result: targetNumber
  };
}

function canPlaceNumber(
  grid: string[][],
  number: string,
  row: number,
  col: number,
  direction: [number, number]
): boolean {
  const numLength = number.length;
  const [dRow, dCol] = direction;
  const size = grid.length;

  // Check if the number fits within the grid bounds
  if (
    row + dRow * (numLength - 1) >= size ||
    row + dRow * (numLength - 1) < 0 ||
    col + dCol * (numLength - 1) >= size ||
    col + dCol * (numLength - 1) < 0
  ) {
    return false;
  }

  // Check if the cells are empty
  for (let i = 0; i < numLength; i++) {
    if (grid[row + dRow * i][col + dCol * i] !== '') {
      return false;
    }
  }

  return true;
}

function placeNumber(
  grid: string[][],
  number: string,
  row: number,
  col: number,
  direction: [number, number]
): void {
  const [dRow, dCol] = direction;
  const digits = number.split('');
  digits.forEach((digit, i) => {
    grid[row + dRow * i][col + dCol * i] = digit;
  });
}

function getDirections(complexity: 'easy' | 'medium' | 'hard'): [number, number][] {
  const directions: [number, number][] = [
    [0, 1],   // right
    [1, 0],   // down
  ];

  if (complexity === 'medium' || complexity === 'hard') {
    directions.push(
      [1, 1],  // diagonal down-right
      [-1, 1]  // diagonal up-right
    );
  }

  return directions;
}

export function generateNumberSearch({
  size = 15,
  minNumber = 1,
  maxNumber = 999,
  numbersToFind = 8,
  complexity = 'medium',
  includeEquations = false
}: NumberSearchOptions) {
  // Initialize empty grid
  const grid: string[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(''));

  // Generate random numbers
  const numbers: number[] = [];
  const equations: EquationInfo[] = [];
  
  while (numbers.length < numbersToFind) {
    const num = generateRandomNumber(minNumber, maxNumber);
    if (!numbers.includes(num)) {
      numbers.push(num);
      if (includeEquations) {
        equations.push(generateEquation(num, complexity));
      }
    }
  }

  // Sort numbers for consistent difficulty
  numbers.sort((a, b) => b.toString().length - a.toString().length);

  const directions = getDirections(complexity);

  // Place numbers in the grid
  numbers.forEach(number => {
    const numStr = number.toString();
    let placed = false;
    let attempts = 0;
    const maxAttempts = size * size;

    while (!placed && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      const direction = directions[Math.floor(Math.random() * directions.length)];

      if (canPlaceNumber(grid, numStr, row, col, direction)) {
        placeNumber(grid, numStr, row, col, direction);
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      console.warn(`Could not place number ${number}`);
    }
  });

  // Fill empty cells with random digits
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = Math.floor(Math.random() * 10).toString();
      }
    }
  }

  return {
    grid,
    numbers,
    equations: includeEquations ? equations : undefined
  };
}