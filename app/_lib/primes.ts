import { unstable_cache } from "next/cache";

// Crible d'Ératosthène — O(n log log n)
export function computePrimes(limit: number): number[] {
  const sieve = new Uint8Array(limit + 1).fill(1);
  sieve[0] = sieve[1] = 0;
  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) sieve[j] = 0;
    }
  }
  return Array.from(sieve).reduce<number[]>((acc, v, i) => {
    if (v) acc.push(i);
    return acc;
  }, []);
}

// unstable_cache (Next.js ≤15) — remplacé par 'use cache' en Next.js 16
// Équivalent moderne :
//   async function getCachedPrimes(limit: number) {
//     'use cache'
//     cacheLife('max')
//     cacheTag('primes')
//     ...
//   }
export const getCachedPrimes = unstable_cache(
  async (limit: number) => {
    const start = performance.now();
    const primes = computePrimes(limit);
    const duration = Math.round(performance.now() - start);
    return {
      primes,
      count: primes.length,
      duration,
      computedAt: new Date().toISOString(),
    };
  },
  ["primes"],
  { revalidate: false }
);
