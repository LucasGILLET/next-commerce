import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/app/_actions/auth";

function trigram(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function AuthButton() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        Connexion
      </Link>
    );
  }

  const isAdmin = session.user.role === "admin";

  return (
    <div className="flex items-center gap-3">
      {isAdmin && (
        <Link
          href="/admin/products"
          className="text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
        >
          Admin
        </Link>
      )}
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-50 dark:text-zinc-900"
        title={session.user.name}
      >
        {trigram(session.user.name ?? "")}
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}
