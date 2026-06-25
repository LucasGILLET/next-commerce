import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/app/catalog/_queries";
import AddToCartButton from "./_components/add-to-cart-button";
import ProductTabs from "./_components/product-tabs";
import SimilarProducts from "./_components/similar-products";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
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

          <Suspense
            fallback={
              <div className="h-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            }
          >
            <ProductTabs
              description={product.description}
              specifications={product.specifications}
            />
          </Suspense>

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
    <SimilarProducts slug={product.slug} category={product.category} />
    </>
  );
}
