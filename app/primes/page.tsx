import { getCachedPrimes } from "@/app/_lib/primes";

const LIMIT = 1_000_000;

export default async function PrimesPage() {
  const { primes, count, duration, computedAt } = await getCachedPrimes(LIMIT);

  const first10 = primes.slice(0, 10);
  const last5 = primes.slice(-5);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Crible d&apos;Ératosthène
      </h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        Nombres premiers jusqu&apos;à {LIMIT.toLocaleString("fr-FR")} — résultat mis en cache par{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
          unstable_cache
        </code>
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Nombres premiers
          </p>
          <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {count.toLocaleString("fr-FR")}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Temps de calcul
          </p>
          <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {duration} ms
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Mis en cache le
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {new Date(computedAt).toLocaleTimeString("fr-FR")}
          </p>
          <p className="text-xs text-zinc-400">
            {new Date(computedAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            10 premiers
          </p>
          <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
            {first10.join(", ")}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            5 derniers (≤ {LIMIT.toLocaleString("fr-FR")})
          </p>
          <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
            {last5.join(", ")}
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs text-zinc-400">
        Rechargez la page — l&apos;heure de cache ne change pas, la durée affichée est celle du premier calcul.
      </p>
    </div>
  );
}
