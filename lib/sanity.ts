import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

// Server-side client (no CDN, uses API token) — for Server Actions
export const sanityServerClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null

export async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch<T>(query)
  } catch {
    return null
  }
}

export async function sanityFetchFresh<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!sanityServerClient) return null
  try {
    return await sanityServerClient.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[sanityFetchFresh] error:', err)
    return null
  }
}

export const queries = {
  portfolio: `*[_type == "portfolio"] | order(order asc) {
    _id, title, coupleName, location, category, mediaType, videoUrl, tag,
    coverImage { asset->{ url } }
  }`,
  testimonials: `*[_type == "testimonial"] | order(order asc) {
    _id, name, initials, event, text
  }`,
  services: `*[_type == "service"] | order(order asc) {
    _id, title, description, badge, iconKey
  }`,
  siteSettings: `*[_type == "siteSettings"][0] {
    whatsapp, email, instagram, tiktok, youtube, about, adminEmail
  }`,
}
