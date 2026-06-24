import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/catalog/_queries";
import AddToCartButton from "./_components/add-to-cart-button";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { tab = "description" } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Spécifications" },
  ];

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

          <div className="border-b border-zinc-200 dark:border-zinc-800">
            <nav className="flex gap-4">
              {tabs.map(({ id, label }) => {
                const isActive = tab === id;
                return (
                  <Link
                    key={id}
                    href={`?tab=${id}`}
                    className={`pb-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50"
                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {tab === "specifications" ? (
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
          ) : (
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
          )}

          <AddToCartButton
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            }}
          />
        </div>
      </div>
    </div>
  );
}
