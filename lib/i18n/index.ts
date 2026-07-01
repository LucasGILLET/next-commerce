import { cookies } from 'next/headers'
import fr from './fr.json'
import en from './en.json'

export type Locale = 'fr' | 'en'
export type Dictionary = typeof fr

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export async function getDictionary(): Promise<Dictionary> {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value ?? 'fr') as Locale
  return dictionaries[locale] ?? fr
}
