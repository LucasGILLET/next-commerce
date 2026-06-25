import { cacheLife, cacheTag } from "next/cache";

const ENDPOINT =
  "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

export type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  price: number;
  currency: string;
};

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const { data } = await res.json();
  return data;
}

function mapProduct(n: {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: { url: string };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}): SponsoredProduct {
  return {
    id: n.id,
    title: n.title,
    handle: n.handle,
    description: n.description,
    image: n.featuredImage?.url ?? "",
    price: parseFloat(n.priceRange.minVariantPrice.amount),
    currency: n.priceRange.minVariantPrice.currencyCode,
  };
}

export async function getSponsoredProducts(count = 4): Promise<SponsoredProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("sponsored");
  const data = await gql<{ products: { nodes: Parameters<typeof mapProduct>[0][] } }>(
    `query GetSponsoredProducts($first: Int!) {
      products(first: $first) {
        nodes {
          id title handle description
          featuredImage { url }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }`,
    { first: count }
  );
  return data.products.nodes.map(mapProduct);
}

export async function getSponsoredProductByHandle(
  handle: string
): Promise<SponsoredProduct | null> {
  const data = await gql<{ productByHandle: Parameters<typeof mapProduct>[0] | null }>(
    `query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id title handle description
        featuredImage { url }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }`,
    { handle }
  );
  if (!data.productByHandle) return null;
  return mapProduct(data.productByHandle);
}
