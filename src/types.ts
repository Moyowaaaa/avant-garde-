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
  active?: boolean
  previewImage?: string
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
