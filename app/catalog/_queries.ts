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

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return rows.map(deserialize);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? deserialize(row) : undefined;
}

export async function getSimilarProducts(
  slug: string,
  category: string
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category, NOT: { slug } },
    take: 3,
    orderBy: { name: "asc" },
  });
  return rows.map(deserialize);
}
