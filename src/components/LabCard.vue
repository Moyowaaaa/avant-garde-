<script setup lang="ts">
import { ref } from 'vue'
import type { LabPrototype } from '../types'

defineProps<{
  prototype: LabPrototype
  image?: string
  variant: 'magnet' | 'glow' | 'shimmer' | 'embers'
}>()

const glow = ref({ x: 50, y: 50, active: false })

function onMove(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  glow.value = {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100,
    active: true,
  }
}
</script>

<template>
  <article class="proto">
    <header class="proto__head">
      <span class="proto__id">{{ prototype.id }}</span>
      <strong class="proto__title">{{ prototype.title }}</strong>
      <span class="proto__hint">{{ prototype.hint }}</span>
    </header>
    <div
      class="proto__canvas"
      :class="`proto__canvas--${variant}`"
      :style="
        variant === 'glow'
          ? { '--gx': `${glow.x}%`, '--gy': `${glow.y}%`, '--gop': glow.active ? 1 : 0 }
          : undefined
      "
      @mousemove="variant === 'glow' || variant === 'magnet' ? onMove($event) : undefined"
      @mouseleave="glow.active = false"
    >
      <img v-if="image" :src="image" :alt="prototype.title" class="proto__img" />
      <span v-if="variant === 'shimmer'" class="proto__headline">SOMETHING</span>
      <span v-if="variant === 'glow'" class="proto__cursor" aria-hidden="true" />
    </div>
    <p class="proto__desc">{{ prototype.description }}</p>
  </article>
</template>

<style scoped>
.proto {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 6px;
  background: var(--bg-elev);
}
.proto__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
}
.proto__id {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--accent);
}
.proto__title {
  font-size: 13px;
  letter-spacing: 1px;
}
.proto__hint {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--text-secondary);
}
.proto__canvas {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 420px;
  overflow: hidden;
}
.proto__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.proto__canvas--magnet .proto__img {
  transition: transform 0.3s ease;
}
.proto__canvas--magnet:hover .proto__img {
  transform: scale(1.05);
}
.proto__canvas--glow {
  background: radial-gradient(
    circle 180px at var(--gx, 50%) var(--gy, 50%),
    rgba(255, 59, 47, calc(0.45 * var(--gop, 0))),
    transparent 70%
  );
}
.proto__cursor {
  position: absolute;
  left: var(--gx, 50%);
  top: var(--gy, 50%);
  width: 40px;
  height: 40px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: var(--gop, 0);
  animation: breathe 2s ease-in-out infinite;
}
@keyframes breathe {
  50% {
    transform: translate(-50%, -50%) scale(1.25);
  }
}
.proto__headline {
  font-family: var(--font-display);
  font-size: 92px;
  font-weight: 700;
  font-style: italic;
  background: linear-gradient(100deg, var(--text-primary) 40%, #fff 50%, var(--text-primary) 60%);
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: sweep 5s linear infinite;
}
@keyframes sweep {
  from {
    background-position: 120% 0;
  }
  to {
    background-position: -120% 0;
  }
}
.proto__canvas--embers {
  background:
    radial-gradient(2px 2px at 20% 80%, var(--accent), transparent),
    radial-gradient(2px 2px at 60% 60%, var(--accent-soft), transparent),
    radial-gradient(1px 1px at 80% 30%, var(--accent), transparent),
    radial-gradient(1px 1px at 35% 45%, var(--accent-soft), transparent),
    #0d0505;
}
.proto__desc {
  margin: 0;
  padding: 16px 20px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-secondary);
}
</style>
