import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductEditForm from "./_components/product-edit-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/products"
          className="text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          ← Produits
        </Link>
        <span className="text-zinc-300 dark:text-zinc-600">/</span>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {product.name}
        </h1>
      </div>

      <ProductEditForm product={product} />
    </div>
  );
}
