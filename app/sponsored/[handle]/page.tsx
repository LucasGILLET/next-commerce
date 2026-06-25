import Image from "next/image";
import { notFound } from "next/navigation";
import { getSponsoredProductByHandle } from "@/app/_lib/graphql";

type PageProps = {
  params: Promise<{ handle: string }>;
};

export default async function SponsoredProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Sponsorisé
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {product.title}
          </h1>

          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {product.price.toLocaleString("fr-FR", {
              style: "currency",
              currency: product.currency,
            })}
          </p>

          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
