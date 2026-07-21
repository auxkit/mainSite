<template>
  <section class="stats section">
    <div class="container">
      <div class="stat-strip stats-strip-grid" v-motion-fade-visible>
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="stat-strip__item"
          v-motion-fade-visible
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
  { value: 50000, suffix: '+', label: 'Active Users' },
  { value: 2400000, suffix: '', label: 'Workflows Executed' },
  { value: 99, suffix: '.99%', label: 'Uptime SLA' },
  { value: 140, suffix: '+', label: 'Countries' },
  { value: 500, suffix: '+', label: 'Enterprise Clients' },
  { value: 15, prefix: '<', suffix: 'ms', label: 'API Response' }
]
</script>

<style scoped>
.stats {
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-elevated) 100%);
  padding: var(--space-4xl) 0;
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
