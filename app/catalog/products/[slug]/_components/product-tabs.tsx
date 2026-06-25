"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  description: string;
  specifications: Record<string, string>;
};

export default function ProductTabs({ description, specifications }: Props) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "description";

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Spécifications" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="flex gap-4">
          {tabs.map(({ id, label }) => {
            const isActive = tab === id;
            return (
              <Link
                key={id}
                href={`?tab=${id}`}
                className={`pb-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {tab === "specifications" ? (
        <dl className="divide-y divide-zinc-100 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="flex px-4 py-3 text-sm">
              <dt className="w-1/2 font-medium text-zinc-700 dark:text-zinc-300">
                {key}
              </dt>
              <dd className="w-1/2 text-zinc-500 dark:text-zinc-400">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
