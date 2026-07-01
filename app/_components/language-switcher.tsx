'use client'

import { useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const router = useRouter()

  function setLocale(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    router.refresh()
  }

  return (
    <div className="flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
      <button
        onClick={() => setLocale('fr')}
        className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        FR
      </button>
      <span>|</span>
      <button
        onClick={() => setLocale('en')}
        className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        EN
      </button>
    </div>
  )
}
