/** Shared prop / data types for the Avant portfolio. */

export interface WorkItem {
  slug: string
  title: string
  meta: string
  image: string
  height: number
}

export interface ServiceItem {
  index: string
  title: string
  description: string
  /** @deprecated No longer used for permanent styling — hover drives the effect. */
  active?: boolean
  previewImage?: string
  /** Case-study slug this row links to. */
  workSlug?: string
}

export interface FactItem {
  key: string
  value: string
}

export interface LabPrototype {
  id: string
  title: string
  hint: string
  description: string
}

export interface CaseDetail {
  slug: string
  tag: string
  title: string
  image: string
  meta: FactItem[]
  statement: string
  facts: FactItem[]
  galleryTall: string
  galleryStack: string[]
  nextSlug: string
  nextTitle: string
}
