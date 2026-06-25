import { getProductBySlug } from "@/app/catalog/_queries";
import SimilarProducts from "../_components/similar-products";

type PageProps = { params: Promise<{ slug: string }> };

export default async function SimilarSlot({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return null;

  return <SimilarProducts slug={slug} category={product.category} />;
}
