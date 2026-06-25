import Image from "next/image";
import Link from "next/link";
import { getSimilarProducts } from "@/app/catalog/_queries";

type Props = { slug: string; category: string };

export default async function SimilarProducts({ slug, category }: Props) {
  // Simulated delay — streams in independently after ProductDetail (1s)
  await new Promise((r) => setTimeout(r, 2000));
  const products = await getSimilarProducts(slug, category);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Produits similaires
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/catalog/products/${p.slug}`}
            className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                {p.category}
              </p>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
                {p.name}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {p.price.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
