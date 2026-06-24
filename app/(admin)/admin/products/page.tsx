import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Produits ({products.length})
        </h1>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-zinc-600 dark:text-zinc-400">
                Nom
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-600 dark:text-zinc-400">
                Catégorie
              </th>
              <th className="px-4 py-3 text-right font-semibold text-zinc-600 dark:text-zinc-400">
                Prix
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-600 dark:text-zinc-400">
                Slug
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white transition-colors hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                  {product.category}
                </td>
                <td className="px-4 py-3 text-right font-medium text-zinc-900 dark:text-zinc-50">
                  {product.price.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  {product.slug}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
