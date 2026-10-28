import type { CaseDetail, ServiceItem, WorkItem } from '../types'

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
  {
    index: '/01',
    title: 'Editorial',
    description: 'Vogue, i-D, Dazed — stories with narrative tension',
    previewImage: '/images/generated-3.png',
    workSlug: 'vol-12',
  },
  {
    index: '/02',
    title: 'Campaign',
    description: 'Full creative direction — hover expands the row, title turns italic, preview image follows',
    previewImage: '/images/generated-4.png',
    workSlug: 'aw25',
  },
  {
    index: '/03',
    title: 'Runway',
    description: 'Backstage and live show documentation',
    previewImage: '/images/generated-6.png',
    workSlug: 'ss26',
  },
  {
    index: '/04',
    title: 'Portrait',
    description: 'Intimate artist and designer portraits',
    previewImage: '/images/generated-1.png',
    workSlug: 'portraits',
  },
]

const caseOrder = ['fw26-look-01', 'vol-12', 'fw25-look-14', 'aw25', 'portraits', 'ss26']

function buildCases(): Record<string, CaseDetail> {
  const details: Record<string, CaseDetail> = {
    'fw26-look-01': {
      slug: 'fw26-look-01',
      tag: 'EDITORIAL — FW26 / LOOK 01',
      title: 'Noir Study',
      image: '/images/generated-2.png',
      meta: [
        { key: 'CLIENT', value: 'Maison Margiela' },
        { key: 'YEAR', value: '2026' },
        { key: 'ROLE', value: 'Photo + Direction' },
      ],
      statement: 'Black is never one color. Twelve looks, one Paris night — leather, lace and smoke.',
      facts: [
        { key: 'LOCATION', value: 'Palais Royal, Paris' },
        { key: 'FILM', value: 'Portra 800 + Digital' },
        { key: 'TEAM', value: 'Styling: A. Chen / MUA: R. Diallo' },
      ],
      galleryTall: '/images/generated-2.png',
      galleryStack: ['/images/generated-3.png', '/images/generated-4.png'],
      nextSlug: 'vol-12',
      nextTitle: 'Vol. 12',
    },
    'vol-12': {
      slug: 'vol-12',
      tag: 'EDITORIAL — VOL. 12 / PRINT STORY',
      title: 'Soft Armour',
      image: '/images/generated-3.png',
      meta: [
        { key: 'CLIENT', value: 'Vogue' },
        { key: 'YEAR', value: '2025' },
        { key: 'ROLE', value: 'Photography' },
      ],
      statement: 'A quiet print story about protection — cotton, skin and morning light.',
      facts: [
        { key: 'LOCATION', value: 'Studio 11, Paris' },
        { key: 'FILM', value: 'Portra 400' },
        { key: 'TEAM', value: 'Styling: J. Moreau / Hair: L. Fontaine' },
      ],
      galleryTall: '/images/generated-3.png',
      galleryStack: ['/images/generated-1.png', '/images/generated-2.png'],
      nextSlug: 'fw25-look-14',
      nextTitle: 'Look 14',
    },
    'fw25-look-14': {
      slug: 'fw25-look-14',
      tag: 'BACKSTAGE — FW25 / LOOK 14',
      title: 'Before Lights',
      image: '/images/generated-4.png',
      meta: [
        { key: 'CLIENT', value: 'Rick Owens' },
        { key: 'YEAR', value: '2025' },
        { key: 'ROLE', value: 'Backstage + Show' },
      ],
      statement: 'The thirty minutes before the lights — steam, tape and held breath.',
      facts: [
        { key: 'LOCATION', value: 'Palais de Tokyo, Paris' },
        { key: 'FILM', value: 'Digital + 35mm' },
        { key: 'TEAM', value: 'Production: R. Owens Studio' },
      ],
      galleryTall: '/images/generated-4.png',
      galleryStack: ['/images/generated-6.png', '/images/generated-2.png'],
      nextSlug: 'aw25',
      nextTitle: 'AW25',
    },
    aw25: {
      slug: 'aw25',
      tag: 'CAMPAIGN — MAISON MARGIELA / AW25',
      title: 'Rouge Noir',
      image: '/images/generated-2.png',
      meta: [
        { key: 'CLIENT', value: 'Maison Margiela' },
        { key: 'YEAR', value: '2026' },
        { key: 'ROLE', value: 'Photo + Direction' },
      ],
      statement: 'Black is never one color. Twelve looks, one Paris night — leather, lace and smoke.',
      facts: [
        { key: 'LOCATION', value: 'Palais Royal, Paris' },
        { key: 'FILM', value: 'Portra 800 + Digital' },
        { key: 'TEAM', value: 'Styling: A. Chen / MUA: R. Diallo' },
      ],
      galleryTall: '/images/generated-1.png',
      galleryStack: ['/images/generated-5.png', '/images/generated-6.png'],
      nextSlug: 'portraits',
      nextTitle: 'Portraits',
    },
    portraits: {
      slug: 'portraits',
      tag: 'PORTRAIT — ARTIST SERIES',
      title: 'Sitters',
      image: '/images/generated-1.png',
      meta: [
        { key: 'CLIENT', value: 'Personal' },
        { key: 'YEAR', value: '2025' },
        { key: 'ROLE', value: 'Direction + Photo' },
      ],
      statement: 'Intimate portraits of artists and designers, shot slowly between shows.',
      facts: [
        { key: 'LOCATION', value: 'Le Marais, Paris' },
        { key: 'FILM', value: 'Portra 800' },
        { key: 'TEAM', value: 'Solo — natural light' },
      ],
      galleryTall: '/images/generated-1.png',
      galleryStack: ['/images/generated-3.png', '/images/generated-5.png'],
      nextSlug: 'ss26',
      nextTitle: 'SS26',
    },
    ss26: {
      slug: 'ss26',
      tag: 'RUNWAY — SS26',
      title: 'Heat Line',
      image: '/images/generated-6.png',
      meta: [
        { key: 'CLIENT', value: 'The Row' },
        { key: 'YEAR', value: '2026' },
        { key: 'ROLE', value: 'Runway + Backstage' },
      ],
      statement: 'Linen and sun — a runway documented like a road trip.',
      facts: [
        { key: 'LOCATION', value: 'Hyères, France' },
        { key: 'FILM', value: 'Digital' },
        { key: 'TEAM', value: 'Production: The Row Studio' },
      ],
      galleryTall: '/images/generated-6.png',
      galleryStack: ['/images/generated-4.png', '/images/generated-1.png'],
      nextSlug: 'fw26-look-01',
      nextTitle: 'Noir Study',
    },
  }
  // Keep next links consistent with display order.
  caseOrder.forEach((slug, i) => {
    const next = details[caseOrder[(i + 1) % caseOrder.length]]
    details[slug].nextSlug = next.slug
    details[slug].nextTitle = next.title
  })
  return details
}

export const cases: Record<string, CaseDetail> = buildCases()

export const defaultCaseSlug = 'aw25'
