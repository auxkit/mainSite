<template>
  <section class="value-props section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Why AuxKit</span>
        <h2>Built for musicians who sell direct</h2>
        <p>Three pillars that define how AuxKit works—and how you keep more of every sale.</p>
      </div>

      <div class="grid grid-3">
        <div 
          v-for="(prop, index) in valueProps" 
          :key="prop.title"
          class="value-card"
          v-motion-slide-visible-once-bottom
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
import { Code, CreditCard, Home, Check } from 'lucide-vue-next'

const valueProps = [
  {
    icon: Code,
    title: 'Your storefront, anywhere',
    description: 'The embed widget is a single dependency-free script tag — drop it into any page that accepts one.',
    features: [
      'Grid or single-pack detail views',
      'Auto-generated audio previews',
      'Prices formatted per currency, Stripe checkout built in',
      'Dark-mode aware, zero runtime dependencies'
    ]
  },
  {
    icon: CreditCard,
    title: 'Direct-to-fan commerce',
    description: 'Stripe Connect direct charges — you are the merchant of record, not AuxKit.',
    features: [
      'Sales settle straight into your own Stripe account',
      'Flat 10% platform fee, only when you sell',
      'Refunds from your Stripe dashboard auto-revoke downloads',
      'AuxKit\'s fee is rebated automatically on a refund'
    ]
  },
  {
    icon: Home,
    title: 'A home for your music',
    description: 'A hosted portfolio site with song feeds and your pack catalogue, ready in minutes.',
    features: [
      'Free tier: portfolio + song feeds + 3 GB storage',
      'No code required to set up',
      'One place for your portfolio, packs, and song feeds'
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
