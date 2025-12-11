<template>
  <section class="comparison section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Why AuxKit?</span>
        <h2>Built different. Works better.</h2>
        <p>See how AuxKit stacks up against the alternatives.</p>
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
              <span class="product-name muted">Notion + Zapier</span>
            </div>
            <div class="product-col">
              <span class="product-name muted">Monday.com</span>
            </div>
            <div class="product-col">
              <span class="product-name muted">Custom Build</span>
            </div>
          </div>

          <!-- Categories -->
          <div 
            v-for="category in comparisonData" 
            :key="category.name"
            class="category-section"
          >
            <div class="category-header">{{ category.name }}</div>
            <div 
              v-for="feature in category.features" 
              :key="feature.name"
              class="feature-row"
            >
              <div class="feature-col">
                <span class="feature-name">{{ feature.name }}</span>
                <span v-if="feature.tooltip" class="feature-tooltip">
                  <Info :size="14" />
                  <span class="tooltip-text">{{ feature.tooltip }}</span>
                </span>
              </div>
              <div class="product-col auxkit">
                <CheckCircle2 v-if="feature.auxkit === true" :size="20" class="check" />
                <XCircle v-else-if="feature.auxkit === false" :size="20" class="cross" />
                <span v-else class="value">{{ feature.auxkit }}</span>
              </div>
              <div class="product-col">
                <CheckCircle2 v-if="feature.notionZapier === true" :size="20" class="check dim" />
                <XCircle v-else-if="feature.notionZapier === false" :size="20" class="cross" />
                <span v-else class="value dim">{{ feature.notionZapier }}</span>
              </div>
              <div class="product-col">
                <CheckCircle2 v-if="feature.monday === true" :size="20" class="check dim" />
                <XCircle v-else-if="feature.monday === false" :size="20" class="cross" />
                <span v-else class="value dim">{{ feature.monday }}</span>
              </div>
              <div class="product-col">
                <CheckCircle2 v-if="feature.custom === true" :size="20" class="check dim" />
                <XCircle v-else-if="feature.custom === false" :size="20" class="cross" />
                <span v-else class="value dim">{{ feature.custom }}</span>
              </div>
            </div>
          </div>

          <!-- Pricing Row -->
          <div class="pricing-row">
            <div class="feature-col">
              <span class="feature-name">Starting Price</span>
            </div>
            <div class="product-col auxkit">
              <span class="price-value">$0<span class="price-period">/mo</span></span>
              <span class="price-note">Free tier included</span>
            </div>
            <div class="product-col">
              <span class="price-value dim">$8+<span class="price-period">/mo</span></span>
              <span class="price-note">Per tool, adds up</span>
            </div>
            <div class="product-col">
              <span class="price-value dim">$10<span class="price-period">/seat/mo</span></span>
              <span class="price-note">Per-seat pricing</span>
            </div>
            <div class="product-col">
              <span class="price-value dim">$50K+</span>
              <span class="price-note">Dev cost estimate</span>
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
          <p>{{ diff.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { 
  CheckCircle2, XCircle, Info, ArrowRight,
  Puzzle, Zap, Lock, DollarSign
} from 'lucide-vue-next'

const comparisonData = [
  {
    name: 'Core Capabilities',
    features: [
      { name: 'Visual Workflow Builder', auxkit: true, notionZapier: 'Limited', monday: true, custom: 'Depends', tooltip: 'Drag-and-drop workflow creation' },
      { name: 'Unified Data Layer', auxkit: true, notionZapier: false, monday: false, custom: true, tooltip: 'Single source of truth across modules' },
      { name: 'Native Automations', auxkit: true, notionZapier: 'Via Zapier', monday: 'Basic', custom: true },
      { name: 'Real-time Collaboration', auxkit: true, notionZapier: true, monday: true, custom: 'Complex' },
      { name: 'API Access', auxkit: 'Full', notionZapier: 'Partial', monday: 'Partial', custom: true }
    ]
  },
  {
    name: 'Flexibility',
    features: [
      { name: 'Modular Architecture', auxkit: true, notionZapier: false, monday: false, custom: true, tooltip: 'Pick only the modules you need' },
      { name: 'Custom Fields & Types', auxkit: 'Unlimited', notionZapier: 'Limited', monday: 'Limited', custom: true },
      { name: 'White-label Option', auxkit: true, notionZapier: false, monday: false, custom: true },
      { name: 'Self-hosted Deployment', auxkit: true, notionZapier: false, monday: false, custom: true }
    ]
  },
  {
    name: 'Enterprise Ready',
    features: [
      { name: 'SSO / SAML', auxkit: true, notionZapier: true, monday: true, custom: 'DIY' },
      { name: 'SOC 2 Compliance', auxkit: true, notionZapier: true, monday: true, custom: 'Expensive' },
      { name: 'Audit Logs', auxkit: 'Unlimited', notionZapier: '90 days', monday: '1 year', custom: true },
      { name: 'Dedicated Support', auxkit: true, notionZapier: 'Extra cost', monday: 'Extra cost', custom: false }
    ]
  }
]

const differentiators = [
  {
    icon: Puzzle,
    title: 'Truly Modular',
    description: 'Unlike monolithic tools, AuxKit lets you pick exactly the modules you need. No bloat, no unused features.',
    color: 'rgba(99, 102, 241, 0.15)'
  },
  {
    icon: Zap,
    title: 'Native Performance',
    description: 'Everything is built to work together from day one. No glue code, no sync delays, no integration headaches.',
    color: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Lock,
    title: 'Your Data, Your Rules',
    description: 'Enterprise-grade security with flexible deployment options. Cloud, hybrid, or fully on-premise.',
    color: 'rgba(34, 197, 94, 0.15)'
  },
  {
    icon: DollarSign,
    title: 'Honest Pricing',
    description: 'No per-seat games. No surprise limits. A generous free tier and straightforward Pro pricing.',
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
  min-width: 900px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

/* Header */
.table-header {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
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

/* Category */
.category-header {
  padding: var(--space-md) var(--space-xl);
  background: var(--color-bg-elevated);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Rows */
.feature-row {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
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

.feature-tooltip {
  position: relative;
  color: var(--color-text-muted);
  cursor: help;
}

.tooltip-text {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-fast);
  z-index: 10;
}

.feature-tooltip:hover .tooltip-text {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-8px);
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
}

/* Pricing Row */
.pricing-row {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.pricing-row .feature-col,
.pricing-row .product-col {
  padding: var(--space-xl);
  flex-direction: column;
  align-items: flex-start;
}

.pricing-row .product-col {
  align-items: center;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.price-value.dim {
  color: var(--color-text-secondary);
}

.price-period {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text-muted);
}

.price-note {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
}

/* CTA Row */
.cta-row {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
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
  margin-bottom: var(--space-sm);
}

.diff-card p {
  font-size: 0.875rem;
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
