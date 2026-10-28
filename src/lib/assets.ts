/**
 * Image preloading + Cache-Storage-backed caching.
 *
 * Two layers:
 * 1. In-memory decode (`new Image()`) so first paint doesn't flash.
 * 2. Cache Storage (`caches.open`) so repeat visits don't re-download —
 *    the browser still sends a conditional request, but a fresh cache hit
 *    resolves locally without touching the network.
 */

const CACHE_NAME = 'avant-images-v1'

/** The full working set, derived from data/works. Keep in sync there. */
export const IMAGE_SET = [
  '/images/generated-1.png',
  '/images/generated-2.png',
  '/images/generated-3.png',
  '/images/generated-4.png',
  '/images/generated-5.png',
  '/images/generated-6.png',
] as const

function supportsCacheStorage(): boolean {
  return typeof window !== 'undefined' && 'caches' in window
}

/** Store successful same-origin responses in Cache Storage for later visits. */
async function primeCache(urls: readonly string[]): Promise<void> {
  if (!supportsCacheStorage()) return
  try {
    const cache = await window.caches.open(CACHE_NAME)
    await Promise.all(
      urls.map(async (url) => {
        try {
          const hit = await cache.match(url, { ignoreSearch: true })
          if (hit) return
          const response = await fetch(url, { credentials: 'same-origin' })
          if (response.ok) await cache.put(url, response)
        } catch {
          // Single-image failure must not break the loader.
        }
      }),
    )
  } catch {
    // Cache Storage unavailable (private mode, quota) — decode-only fallback.
  }
}

function decode(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = url
  })
}

/**
 * Preload every image, reporting fractional progress (0 → 1).
 * Resolves when all settle (success or failure — never hangs the loader).
 */
export async function preloadImages(
  urls: readonly string[] = IMAGE_SET,
  onProgress?: (fraction: number) => void,
): Promise<void> {
  let done = 0
  onProgress?.(0)
  const tick = () => {
    done += 1
    onProgress?.(done / urls.length)
  }
  // Decode for instant paint + prime Cache Storage in parallel.
  const caching = primeCache(urls)
  await Promise.all(
    urls.map(async (url) => {
      try {
        if (supportsCacheStorage()) {
          const cache = await window.caches.open(CACHE_NAME)
          const hit = await cache.match(url, { ignoreSearch: true }).catch(() => undefined)
          if (hit) {
            // Warm decode from the cache entry.
            await decode(url)
            tick()
            return
          }
        }
        await decode(url)
        tick()
      } catch {
        tick()
      }
    }),
  )
  await caching
}
