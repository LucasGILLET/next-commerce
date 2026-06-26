"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const ProductSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  description: z.string().min(1, "La description est requise."),
  price: z.coerce.number().positive("Le prix doit être positif."),
  category: z.string().min(1, "La catégorie est requise."),
  image: z.string().url("L'image doit être une URL valide."),
  specifications: z.string(),
});

export type ProductState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        price?: string[];
        category?: string[];
        image?: string[];
        specifications?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export async function updateProduct(
  id: string,
  prevState: ProductState,
  formData: FormData
): Promise<ProductState> {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { message: "Non autorisé." };
  }

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    image: formData.get("image"),
    specifications: formData.get("specifications") ?? "",
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.product.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/admin/products");
  revalidatePath("/");

  return { success: true, message: "Produit mis à jour avec succès." };
}
