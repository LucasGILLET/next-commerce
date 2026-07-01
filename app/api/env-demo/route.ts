import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    // Accessible partout (inlinée au build)
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    // Accessible côté serveur uniquement — undefined dans un client component
    AUTH_SECRET_defined: process.env.AUTH_SECRET !== undefined,
  })
}
