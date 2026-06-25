export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-6 w-44 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-amber-100 dark:bg-amber-900/30" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-amber-200 dark:border-amber-900/40"
          >
            <div className="aspect-video w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
