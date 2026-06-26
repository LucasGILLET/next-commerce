import { Suspense } from "react";
import SponsoredProducts from "./_components/sponsored-products";
import ProductGrid from "./_components/product-grid";

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Nos produits
        </h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900"
                />
              ))}
            </div>
          }
        >
          <ProductGrid />
        </Suspense>
      </div>
      <SponsoredProducts />
    </>
  );
}
