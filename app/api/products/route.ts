import { getAllProducts } from "@/app/catalog/_queries";

export async function GET() {
  const products = await getAllProducts();
  return Response.json(products);
}
