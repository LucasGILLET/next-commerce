"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

export default function HoverPrefetchLink({
  href,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={() => router.prefetch(String(href))}
      {...props}
    >
      {children}
    </Link>
  );
}
