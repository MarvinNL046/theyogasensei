import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Conditional + deduplicated Tailwind class concatenation.
 * Standard Shadcn helper — every component in src/components/ui uses it.
 */
export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs))
}
