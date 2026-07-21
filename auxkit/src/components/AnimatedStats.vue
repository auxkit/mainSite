<template>
  <section class="stats section">
    <div class="container">
      <p class="stats-intro">No usage theater — just how the platform works.</p>
      <div class="stat-strip stats-strip-grid" v-motion-fade-visible-once>
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="stat-strip__item"
          v-motion-fade-visible-once
          :delay="index * 80"
        >
          <div class="stat-strip__value">
            <span v-if="stat.prefix">{{ stat.prefix }}</span>
            <AnimatedNumber :value="stat.value" :duration="2000" :delay="index * 200" />
            <span>{{ stat.suffix }}</span>
          </div>
          <p class="stat-strip__label">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, ref, onMounted } from 'vue'

// Animated Number Component
const AnimatedNumber = {
  props: {
    value: { type: Number, required: true },
    duration: { type: Number, default: 2000 },
    delay: { type: Number, default: 0 }
  },
  setup(props) {
    const displayValue = ref(0)
    const hasAnimated = ref(false)
    
    onMounted(() => {
      // Use Intersection Observer for scroll-triggered animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.value) {
            hasAnimated.value = true
            animateValue()
          }
        })
      }, { threshold: 0.5 })
      
      // Delay getting parent to ensure mount
      setTimeout(() => {
        const el = document.querySelector('.stats-strip-grid')
        if (el) observer.observe(el)
      }, 100)
    })
    
    function animateValue() {
      setTimeout(() => {
        const startTime = Date.now()
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / props.duration, 1)
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          displayValue.value = Math.floor(eased * props.value)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            displayValue.value = props.value
          }
        }
        animate()
      }, props.delay)
    }
    
    return () => h('span', displayValue.value.toLocaleString())
  }
}

const stats = [
  { value: 10, suffix: '%', label: 'Flat platform fee, only when you sell' },
  { value: 87, suffix: '-90%', label: 'Of each sale goes to you' },
  { value: 1, suffix: '', label: 'Script tag to embed your store' },
  { value: 5, suffix: '', label: 'Downloads per purchase, 7-day window' },
  { value: 20, suffix: ' GB', label: 'Seller storage (3 GB free tier)' },
  { value: 60, suffix: '/min', label: 'Public API rate limit' }
]
</script>

<style scoped>
.stats {
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-elevated) 100%);
  padding: var(--space-4xl) 0;
}

.stats-intro {
  text-align: center;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-2xl);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

/* Column count for the shared .stat-strip primitive (defined in
   src/style.css). The primitive itself handles the bordered container,
   internal dividers, and responsive collapse below 768px. */
.stats-strip-grid {
  grid-template-columns: repeat(6, 1fr);
}
</style>
