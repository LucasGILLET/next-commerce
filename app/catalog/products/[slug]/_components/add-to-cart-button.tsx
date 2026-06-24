"use client";

import { useCart } from "@/app/_components/cart-provider";

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
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className="mt-auto w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      Ajouter au panier
    </button>
  );
}
