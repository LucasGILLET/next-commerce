import { cookies } from "next/headers";

export default async function CartButton() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("cart")?.value;
  const items: Array<{ quantity: number }> = raw ? JSON.parse(raw) : [];
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="relative flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
      <span>Panier</span>
      {totalCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-white dark:bg-zinc-50 dark:text-zinc-900">
          {totalCount}
        </span>
      )}
    </div>
  );
}
