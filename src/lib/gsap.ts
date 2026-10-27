import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  duration: 0.7,
  ease: 'power3.out',
  overwrite: 'auto',
})

export const EASE_OUT = 'power3.out'
export const EASE_IN_OUT = 'power2.inOut'

export { gsap, ScrollTrigger }
