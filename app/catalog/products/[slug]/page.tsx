import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/catalog/_queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              {product.category}
            </span>
            <h1 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {product.name}
            </h1>
          </div>

          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {product.price.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}
          </p>

          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Spécifications
            </h2>
            <dl className="divide-y divide-zinc-100 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex px-4 py-3 text-sm">
                  <dt className="w-1/2 font-medium text-zinc-700 dark:text-zinc-300">
                    {key}
                  </dt>
                  <dd className="w-1/2 text-zinc-500 dark:text-zinc-400">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <button className="mt-auto w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
