import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full">
      <aside className="w-56 shrink-0 border-r border-zinc-200 bg-zinc-900 dark:border-zinc-700">
        <div className="px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Administration
          </p>
        </div>
        <nav className="px-3 pb-6">
          <Link
            href="/admin/products"
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            Produits
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
