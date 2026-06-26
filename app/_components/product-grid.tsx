import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getAllProducts } from "@/app/catalog/_queries";
import HoverPrefetchLink from "./hover-prefetch-link";

export default async function ProductGrid() {
  const cookieStore = await cookies();
  const variant = cookieStore.get("ab")?.value ?? "A";
  const products = await getAllProducts();

  const ProductLink = variant === "B" ? HoverPrefetchLink : Link;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductLink
          key={product.id}
          href={`/catalog/products/${product.slug}`}
          className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="p-4">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              {product.category}
            </span>
            <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {product.name}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
              {product.description}
            </p>
            <p className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-50">
              {product.price.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </div>
        </ProductLink>
      ))}
    </div>
  );
}
