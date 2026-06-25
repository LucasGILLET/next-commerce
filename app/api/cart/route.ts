import { cookies } from "next/headers";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export async function POST(request: Request) {
  const product = await request.json();
  const cookieStore = await cookies();

  const raw = cookieStore.get("cart")?.value;
  const items: CartItem[] = raw ? JSON.parse(raw) : [];

  const idx = items.findIndex((i) => i.id === product.id);
  if (idx >= 0) {
    items[idx].quantity += 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }

  cookieStore.set("cart", JSON.stringify(items), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return Response.json({ success: true, totalCount });
}
