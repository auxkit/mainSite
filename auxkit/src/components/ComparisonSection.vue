<template>
  <section class="comparison section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Why AuxKit?</span>
        <h2>Your storefront. Your audience. Your Stripe account.</h2>
        <p>See how selling direct with AuxKit compares to marketplaces and DIY setups.</p>
      </div>

      <div class="comparison-table-wrapper" v-motion-fade-visible>
        <div class="comparison-table">
          <!-- Header -->
          <div class="table-header">
            <div class="feature-col"></div>
            <div class="product-col auxkit">
              <div class="product-badge">
                <div class="auxkit-logo">
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor"/>
                    <rect x="18" y="2" width="12" height="12" rx="3" fill="currentColor" opacity="0.6"/>
                    <rect x="2" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.6"/>
                    <rect x="18" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.3"/>
                  </svg>
                </div>
                <span class="product-name">AuxKit</span>
              </div>
            </div>
            <div class="product-col">
              <span class="product-name muted">Marketplace platforms</span>
            </div>
            <div class="product-col">
              <span class="product-name muted">DIY (checkout + file links)</span>
            </div>
          </div>

          <!-- Rows -->
          <div
            v-for="feature in comparisonRows"
            :key="feature.name"
            class="feature-row"
          >
            <div class="feature-col">
              <span class="feature-name">{{ feature.name }}</span>
            </div>
            <div class="product-col auxkit">
              <CheckCircle2 v-if="feature.auxkit === true" :size="20" class="check" />
              <XCircle v-else-if="feature.auxkit === false" :size="20" class="cross" />
              <span v-else class="value">{{ feature.auxkit }}</span>
            </div>
            <div class="product-col">
              <CheckCircle2 v-if="feature.marketplace === true" :size="20" class="check dim" />
              <XCircle v-else-if="feature.marketplace === false" :size="20" class="cross" />
              <span v-else class="value dim">{{ feature.marketplace }}</span>
            </div>
            <div class="product-col">
              <CheckCircle2 v-if="feature.diy === true" :size="20" class="check dim" />
              <XCircle v-else-if="feature.diy === false" :size="20" class="cross" />
              <span v-else class="value dim">{{ feature.diy }}</span>
            </div>
          </div>

          <!-- CTA Row -->
          <div class="cta-row">
            <div class="feature-col"></div>
            <div class="product-col auxkit">
              <router-link to="/pricing" class="btn btn-primary">
                Start Free
                <ArrowRight :size="16" />
              </router-link>
            </div>
            <div class="product-col"></div>
            <div class="product-col"></div>
          </div>
        </div>
      </div>

      <!-- Key Differentiators -->
      <div class="differentiators">
        <div
          v-for="(diff, index) in differentiators"
          :key="diff.title"
          class="diff-card"
          v-motion-slide-visible-bottom
          :delay="index * 100"
        >
          <div class="diff-icon" :style="{ background: diff.color }">
            <component :is="diff.icon" :size="24" />
          </div>
          <h3>{{ diff.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  CheckCircle2, XCircle, ArrowRight,
  Globe2, Code2, Users, Percent
} from 'lucide-vue-next'

const comparisonRows = [
  { name: 'Sell from your own website', auxkit: true, marketplace: false, diy: true },
  { name: 'Own the customer relationship', auxkit: 'You', marketplace: 'The platform', diy: 'You' },
  { name: 'Merchant of record', auxkit: 'You, via Stripe Connect', marketplace: 'The platform', diy: 'Varies' },
  { name: 'Cost', auxkit: '10% per sale + Stripe fees', marketplace: 'Commission or subscription — varies', diy: 'Payment fees + weeks of build time' },
  { name: 'Audio previews + BPM/key metadata', auxkit: 'Built in', marketplace: 'Built in', diy: 'Build it yourself' },
  { name: 'Expiring tokenized downloads', auxkit: 'Built in', marketplace: 'n/a', diy: 'Build it yourself' },
  { name: 'Buyer self-service (resend, extensions)', auxkit: 'Built in', marketplace: 'Varies', diy: 'Build it yourself' },
  { name: 'Setup', auxkit: 'Paste one script tag', marketplace: 'Create a listing', diy: 'Glue code' }
]

const differentiators = [
  {
    icon: Percent,
    title: 'No subscription — €0 until you sell',
    color: 'rgba(99, 102, 241, 0.15)'
  },
  {
    icon: Code2,
    title: 'Embed anywhere',
    color: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Users,
    title: 'You keep your audience',
    color: 'rgba(34, 197, 94, 0.15)'
  },
  {
    icon: Globe2,
    title: 'Transparent flat 10% fee',
    color: 'rgba(236, 72, 153, 0.15)'
  }
]
</script>

<style scoped>
.comparison {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.comparison-table-wrapper {
  overflow-x: auto;
  margin-bottom: var(--space-4xl);
}

.comparison-table {
  min-width: 760px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

/* Header */
.table-header {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.table-header .feature-col,
.table-header .product-col {
  padding: var(--space-xl);
}

.product-col {
  text-align: center;
}

.product-col.auxkit {
  background: rgba(99, 102, 241, 0.05);
}

.product-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.auxkit-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-lg);
}

.product-name {
  font-weight: 600;
  font-size: 0.9375rem;
}

.product-name.muted {
  color: var(--color-text-muted);
  font-weight: 500;
}

/* Rows */
.feature-row {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid var(--color-border-subtle);
}

.feature-row:last-child {
  border-bottom: none;
}

.feature-col,
.product-col {
  padding: var(--space-lg) var(--space-xl);
  display: flex;
  align-items: center;
}

.feature-col {
  gap: var(--space-sm);
}

.feature-name {
  font-size: 0.9375rem;
  color: var(--color-text-primary);
}

.product-col {
  justify-content: center;
}

.check {
  color: var(--color-success);
}

.cross {
  color: var(--color-text-muted);
  opacity: 0.4;
}

.dim {
  opacity: 0.6;
}

.value {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-align: center;
}

/* CTA Row */
.cta-row {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  padding: var(--space-lg);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.cta-row .product-col {
  padding: 0;
}

/* Differentiators */
.differentiators {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

.diff-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.diff-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.diff-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-lg);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
}

.diff-card h3 {
  font-size: 1.0625rem;
}

@media (max-width: 1024px) {
  .differentiators {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .differentiators {
    grid-template-columns: 1fr;
  }
}
</style>
