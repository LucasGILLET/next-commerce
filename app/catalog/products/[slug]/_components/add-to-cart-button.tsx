"use client";

import { useRouter } from "next/navigation";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const router = useRouter();

  async function handleAdd() {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    router.refresh();
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-auto w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      Ajouter au panier
    </button>
  );
}
