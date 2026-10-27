import type { ServiceItem, WorkItem } from '../types'

/**
 * Portfolio grid content. Images live in `public/images/`
 * (copied from the pen.dev `untitled-assets/` folder).
 */
export const works: WorkItem[] = [
  { slug: 'fw26-look-01', title: 'FW26 — Look 01', meta: 'Editorial', image: '/images/generated-2.png', height: 520 },
  { slug: 'vol-12', title: 'Editorial — Vol. 12', meta: 'Print story', image: '/images/generated-3.png', height: 360 },
  { slug: 'fw25-look-14', title: 'FW25 — Look 14', meta: 'Backstage', image: '/images/generated-4.png', height: 360 },
  { slug: 'aw25', title: 'Campaign — AW25', meta: 'Campaign', image: '/images/generated-5.png', height: 520 },
  { slug: 'portraits', title: 'Portrait Series', meta: 'Portrait', image: '/images/generated-1.png', height: 440 },
  { slug: 'ss26', title: 'Runway — SS26', meta: 'Runway', image: '/images/generated-6.png', height: 440 },
]

export const heroImage = '/images/generated-2.png'

export const caseHeroImage = '/images/generated-2.png'
export const caseGalleryTall = '/images/generated-1.png'
export const caseGalleryStack = ['/images/generated-5.png', '/images/generated-6.png']

export const labImages: Record<string, string> = {
  p01: '/images/generated-2.png',
}

export const services: ServiceItem[] = [
  { index: '/01', title: 'Editorial', description: 'Vogue, i-D, Dazed — stories with narrative tension' },
  {
    index: '/02',
    title: 'Campaign',
    description: 'Full creative direction — hover expands the row, title turns italic, preview image follows',
    active: true,
    previewImage: '/images/generated-4.png',
  },
  { index: '/03', title: 'Runway', description: 'Backstage and live show documentation' },
  { index: '/04', title: 'Portrait', description: 'Intimate artist and designer portraits' },
]
