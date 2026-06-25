"use client";

import { useTransition } from "react";
import { revalidateSponsored } from "@/app/_actions/revalidate";

export default function RefreshSponsoredButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => revalidateSponsored())}
      disabled={isPending}
      className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
    >
      <span className={isPending ? "animate-spin" : ""}>↻</span>
      {isPending ? "Actualisation…" : "Rafraîchir"}
    </button>
  );
}
