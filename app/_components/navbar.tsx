import { Suspense } from "react";
import Link from "next/link";
import CartButton from "./cart-button";
import AuthButton from "./auth-button";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-(family-name:--font-dancing-script) text-2xl font-bold text-zinc-900 dark:text-zinc-50"
        >
          My Supa Store
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            href="/"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Produits
          </Link>
          <Suspense fallback={<span className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Panier</span>}>
            <CartButton />
          </Suspense>
          <Suspense fallback={<span className="text-sm text-zinc-400">…</span>}>
            <AuthButton />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
