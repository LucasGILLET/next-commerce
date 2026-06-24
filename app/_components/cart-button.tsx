"use client";

import { useCart } from "./cart-provider";

export default function CartButton() {
  const { totalCount } = useCart();

  return (
    <button className="relative flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
      <span>Panier</span>
      {totalCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-white dark:bg-zinc-50 dark:text-zinc-900">
          {totalCount}
        </span>
      )}
    </button>
  );
}
