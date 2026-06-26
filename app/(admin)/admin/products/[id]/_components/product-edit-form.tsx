"use client";

import { useActionState } from "react";
import { updateProduct, simulateError, type ProductState } from "@/app/_actions/products";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  specifications: string;
};

export default function ProductEditForm({ product }: { product: Product }) {
  const updateWithId = updateProduct.bind(null, product.id);
  const [state, action, isPending] = useActionState(updateWithId, undefined);
  const [errorState, errorAction, isErrorPending] = useActionState(simulateError, undefined);

  return (
    <div className="flex flex-col gap-8">
      <form
        action={errorAction}
        className="rounded-lg border border-dashed border-red-300 p-4 dark:border-red-800"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400">
          Test d&apos;erreur serveur
        </p>
        {errorState?.message && (
          <p className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {errorState.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isErrorPending}
          className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-700 dark:hover:bg-red-900/20"
        >
          {isErrorPending ? "Simulation…" : "Provoquer une erreur"}
        </button>
      </form>

      <form action={action} className="flex flex-col gap-5">
        {state?.success && (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {state.message}
          </p>
        )}
        {state?.message && !state.success && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {state.message}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Slug <span className="text-zinc-400">(non modifiable)</span>
          </label>
          <input
            value={product.slug}
            readOnly
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <Field label="Nom" name="name" defaultValue={product.name} errors={state?.errors?.name} />
        <Field label="Catégorie" name="category" defaultValue={product.category} errors={state?.errors?.category} />

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Prix (€)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            required
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
          />
          {state?.errors?.price && <FieldError messages={state.errors.price} />}
        </div>

        <Field label="Image (URL)" name="image" defaultValue={product.image} errors={state?.errors?.image} />

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            rows={4}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
          />
          {state?.errors?.description && <FieldError messages={state.errors.description} />}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="specifications" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Spécifications
          </label>
          <textarea
            id="specifications"
            name="specifications"
            defaultValue={product.specifications}
            rows={3}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 self-start rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isPending ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  errors,
}: {
  label: string;
  name: string;
  defaultValue: string;
  errors?: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
      />
      {errors && <FieldError messages={errors} />}
    </div>
  );
}

function FieldError({ messages }: { messages: string[] }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {messages.map((m) => (
        <li key={m} className="text-xs text-red-500">
          {m}
        </li>
      ))}
    </ul>
  );
}
