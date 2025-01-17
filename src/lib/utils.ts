import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Conditionally joins class names together.
 *
 * @param inputs - Class names to conditionally join.
 * @returns The conditionally joined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
