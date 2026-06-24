import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-8xl font-bold text-zinc-200 dark:text-zinc-800">
          404
        </p>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Page introuvable
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
