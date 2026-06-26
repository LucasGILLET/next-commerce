import { connection } from "next/server";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  specifications: Record<string, string>;
};

function deserialize(raw: {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  specifications: string;
}): Product {
  return {
    ...raw,
    specifications: JSON.parse(raw.specifications),
  };
}

export const getAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const rows = await prisma.product.findMany({ orderBy: { name: "asc" } });
    return rows.map(deserialize);
  },
  ["all-products"],
  { tags: ["products"], revalidate: false }
);

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  await connection();
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? deserialize(row) : undefined;
}

export async function getSimilarProducts(
  slug: string,
  category: string
): Promise<Product[]> {
  await connection();
  const rows = await prisma.product.findMany({
    where: { category, NOT: { slug } },
    take: 3,
    orderBy: { name: "asc" },
  });
  return rows.map(deserialize);
}
