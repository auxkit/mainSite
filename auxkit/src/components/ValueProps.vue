<template>
  <section class="value-props section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Why AuxKit</span>
        <h2>Built for teams that ship</h2>
        <p>Three pillars that define how we build tools—and how you'll work better.</p>
      </div>

      <div class="grid grid-3">
        <div 
          v-for="(prop, index) in valueProps" 
          :key="prop.title"
          class="value-card"
          v-motion-slide-visible-bottom
          :delay="index * 100"
        >
          <div class="value-icon">
            <component :is="prop.icon" :size="28" />
          </div>
          <h3>{{ prop.title }}</h3>
          <p>{{ prop.description }}</p>
          <ul class="value-features">
            <li v-for="feature in prop.features" :key="feature">
              <Check :size="16" />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Blocks, Plug, Users, Check } from 'lucide-vue-next'

const valueProps = [
  {
    icon: Blocks,
    title: 'Modular Tools',
    description: 'Build your stack your way—swap features in or out without breaking workflows.',
    features: [
      'Pick only what you need',
      'Zero dependency conflicts',
      'Instant module activation'
    ]
  },
  {
    icon: Plug,
    title: 'Effortless Integration',
    description: 'AuxKit plugs into existing systems with near-zero configuration.',
    features: [
      '50+ native integrations',
      'REST & GraphQL APIs',
      'Webhook support'
    ]
  },
  {
    icon: Users,
    title: 'Team-First Design',
    description: 'Designed for clarity, accountability, and speed across departments.',
    features: [
      'Role-based permissions',
      'Real-time collaboration',
      'Activity audit logs'
    ]
  }
]
</script>

<style scoped>
.value-props {
  background: var(--color-bg);
}

.value-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  transition: all var(--transition-base);
}

.value-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-accent-subtle);
  border-radius: var(--radius-lg);
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
}

.value-card h3 {
  font-size: 1.375rem;
  margin-bottom: var(--space-sm);
}

.value-card > p {
  font-size: 1rem;
  margin-bottom: var(--space-lg);
}

.value-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.value-features li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.value-features li svg {
  color: var(--color-success);
  flex-shrink: 0;
}
</style>
