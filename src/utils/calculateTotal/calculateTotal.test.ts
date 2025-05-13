// calculateTotal.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculateTotal';

describe('calculateTotal', () => {
  it('sums numbers separated by commas', () => {
    expect(calculateTotal('100,200,300')).toBe(600);
  });

  it('sums numbers separated by newlines', () => {
    expect(calculateTotal('100\n200\n300')).toBe(600);
  });

  it('sums numbers with mixed commas and newlines', () => {
    expect(calculateTotal('100\n200,300\n400')).toBe(1000);
  });

  it('ignores extra spaces and invalid entries', () => {
    expect(calculateTotal(' 100 , abc , 200 , \n300 ')).toBe(600);
  });

  it('returns 0 for empty input', () => {
    expect(calculateTotal('')).toBe(0);
  });
});
