export function calculateTotal(input: string): number {
  return input
    .split(/[\n,]+/) // Support splitting by newline or comma
    .map((s) => Number(s.trim())) // Trim whitespace and convert to number
    .filter((n) => !isNaN(n)) // Filter out invalid numbers
    .reduce((a, b) => a + b, 0); // Sum up the numbers
}
