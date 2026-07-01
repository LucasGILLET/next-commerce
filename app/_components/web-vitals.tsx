'use client'

import { useReportWebVitals } from 'next/web-vitals'

const RATING_COLORS: Record<string, string> = {
  good: '🟢',
  'needs-improvement': '🟡',
  poor: '🔴',
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    const rating = RATING_COLORS[metric.rating] ?? '⚪'
    console.groupCollapsed(
      `[Web Vitals] ${rating} ${metric.name} — ${Math.round(metric.value)}ms`
    )
    console.log('id     :', metric.id)
    console.log('value  :', metric.value)
    console.log('rating :', metric.rating)
    console.log('delta  :', metric.delta)
    console.log('entries:', metric.entries)
    console.groupEnd()
  })

  return null
}
