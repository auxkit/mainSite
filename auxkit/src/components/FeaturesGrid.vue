<template>
  <section class="features section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Features</span>
        <h2>Everything you need, nothing you don't</h2>
        <p>Six real capabilities that power your storefront, from upload to payout.</p>
      </div>

      <div class="grid grid-3">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="feature-card"
          v-motion-slide-visible-bottom
          :delay="index * 75"
        >
          <div class="feature-icon" :style="{ background: feature.color }">
            <component :is="feature.icon" :size="24" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
          <a href="#" class="feature-link">
            Learn more
            <ArrowRight :size="14" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  PackageOpen,
  AudioLines,
  Code,
  CreditCard,
  ShieldCheck,
  Globe,
  ArrowRight
} from 'lucide-vue-next'

const features = [
  {
    icon: PackageOpen,
    title: 'Pack Manager',
    description: 'Create packs, upload samples with artwork, BPM/key metadata. Publish triggers an automatic download-bundle build.',
    color: 'rgba(99, 102, 241, 0.15)'
  },
  {
    icon: AudioLines,
    title: 'Audio Previews',
    description: 'Streaming previews auto-generated for every sample you upload.',
    color: 'rgba(34, 197, 94, 0.15)'
  },
  {
    icon: Code,
    title: 'Embed Widget',
    description: 'One script tag, zero runtime dependencies. Grid or single-pack view, dropped into any page.',
    color: 'rgba(236, 72, 153, 0.15)'
  },
  {
    icon: CreditCard,
    title: 'Stripe Payouts',
    description: 'Connect onboarding, direct charges — you\'re the merchant of record, sales settle in your own account.',
    color: 'rgba(139, 92, 246, 0.15)'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Delivery',
    description: 'Email delivery with tokenized links — 5 downloads / 7 days, one-click resend, and extension grants (+5 downloads, +7 days).',
    color: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Globe,
    title: 'Portfolio Sites & Song Feeds',
    description: 'A hosted home for your music and catalogue — free, no code required.',
    color: 'rgba(6, 182, 212, 0.15)'
  }
]
</script>

<style scoped>
.features {
  background: var(--color-bg);
}

.feature-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  transition: all var(--transition-base);
}

.feature-card:hover {
  border-color: var(--color-border);
  background: var(--color-bg-hover);
  transform: translateY(-4px);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.feature-card h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.feature-card p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.feature-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  transition: gap var(--transition-fast);
}

.feature-link:hover {
  gap: var(--space-sm);
}
</style>
