<template>
  <section class="stats section">
    <div class="container">
      <div class="stats-container" v-motion-fade-visible>
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="stat-card"
          v-motion-slide-visible-bottom
          :delay="index * 100"
        >
          <div class="stat-icon" :style="{ background: stat.color }">
            <component :is="stat.icon" :size="24" />
          </div>
          <div class="stat-content">
            <div class="stat-value">
              <span class="stat-prefix" v-if="stat.prefix">{{ stat.prefix }}</span>
              <span class="stat-number" ref="numberRefs">
                <AnimatedNumber :value="stat.value" :duration="2000" :delay="index * 200" />
              </span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-description" v-if="stat.description">{{ stat.description }}</p>
          </div>
          <div class="stat-trend" v-if="stat.trend" :class="stat.trend.direction">
            <component :is="stat.trend.direction === 'up' ? TrendingUp : TrendingDown" :size="14" />
            {{ stat.trend.value }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, ref, watch, onMounted } from 'vue'
import { 
  Users, Zap, Clock, Shield, TrendingUp, TrendingDown, 
  Globe, Building2, Workflow, Server
} from 'lucide-vue-next'

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
        const el = document.querySelector('.stats-container')
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
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Active Users',
    description: 'Teams using AuxKit daily',
    color: 'rgba(99, 102, 241, 0.15)',
    trend: { value: '+23%', direction: 'up' }
  },
  {
    icon: Workflow,
    value: 2400000,
    suffix: '',
    label: 'Workflows Executed',
    description: 'Last 30 days',
    color: 'rgba(34, 197, 94, 0.15)',
    trend: { value: '+45%', direction: 'up' }
  },
  {
    icon: Clock,
    value: 99,
    suffix: '.99%',
    label: 'Uptime SLA',
    description: 'Enterprise reliability',
    color: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Globe,
    value: 140,
    suffix: '+',
    label: 'Countries',
    description: 'Global presence',
    color: 'rgba(236, 72, 153, 0.15)'
  },
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Enterprise Clients',
    description: 'Fortune 500 included',
    color: 'rgba(6, 182, 212, 0.15)',
    trend: { value: '+18%', direction: 'up' }
  },
  {
    icon: Server,
    value: 15,
    prefix: '<',
    suffix: 'ms',
    label: 'API Response',
    description: 'Average latency',
    color: 'rgba(139, 92, 246, 0.15)'
  }
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

.stat-card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  transition: all var(--transition-base);
}

.stat-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--space-xs);
  color: var(--color-text-primary);
}

.stat-prefix {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.stat-suffix {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-accent);
}

.stat-label {
  font-size: 1.0625rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.stat-description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.stat-trend {
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px var(--space-sm);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-trend.up {
  background: rgba(34, 197, 94, 0.15);
  color: var(--color-success);
}

.stat-trend.down {
  background: rgba(239, 68, 68, 0.15);
  color: var(--color-error);
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .stat-value {
    font-size: 2rem;
  }
}
</style>
