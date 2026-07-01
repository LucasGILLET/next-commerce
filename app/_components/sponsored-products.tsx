import Image from "next/image";
import Link from "next/link";
import { getSponsoredProducts } from "@/app/_lib/graphql";
import RefreshSponsoredButton from "./refresh-sponsored-button";

export default async function SponsoredProducts() {
  const products = await getSponsoredProducts(4);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Produits sponsorisés
        </h2>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Sponsorisé
        </span>
        <RefreshSponsoredButton />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, index) => (
          <Link
            key={p.id}
            href={`/sponsored/${p.handle}`}
            className="group overflow-hidden rounded-xl border border-amber-200 bg-white transition-shadow hover:shadow-md dark:border-amber-900/40 dark:bg-zinc-950"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                priority={index === 0}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
                {p.title}
              </p>
              <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {p.price.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: p.currency,
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
