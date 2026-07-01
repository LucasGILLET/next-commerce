'use client'

export function SiteName() {
  return (
    <span className="font-(family-name:--font-dancing-script) text-2xl font-bold text-zinc-900 dark:text-zinc-50">
      {process.env.NEXT_PUBLIC_SITE_NAME}
    </span>
  )
}
