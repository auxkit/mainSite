<template>
  <main class="pricing-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible-once>Pricing</span>
        <h1 v-motion-slide-visible-once-bottom>Simple, transparent pricing</h1>
        <p class="hero-desc" v-motion-slide-visible-once-bottom :delay="100">
          No subscription. Free forever for your portfolio — a flat 10% only when a pack sells.
        </p>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="pricing-cards section">
      <div class="container">
        <div class="pricing-grid">
          <div
            v-for="(plan, index) in plans"
            :key="plan.name"
            class="pricing-card"
            :class="{ featured: plan.featured }"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
          >
            <div v-if="plan.featured" class="featured-badge">Most Popular</div>

            <div class="plan-header">
              <h3>{{ plan.name }}</h3>
              <p>{{ plan.description }}</p>
            </div>

            <div class="plan-price">
              <span class="price-amount">{{ plan.price }}</span>
              <span v-if="plan.pricePeriod" class="price-period">{{ plan.pricePeriod }}</span>
            </div>

            <a
              :href="plan.cta.href"
              class="btn"
              :class="plan.featured ? 'btn-primary' : 'btn-secondary'"
            >
              {{ plan.cta.text }}
            </a>

            <ul class="plan-features">
              <li v-for="feature in plan.features" :key="feature">
                <Check :size="16" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Comparison -->
    <section class="comparison-section section">
      <div class="container">
        <div class="section-header">
          <h2>Compare plans</h2>
          <p>See exactly what's included in each plan.</p>
        </div>

        <div class="comparison-table-wrap">
          <div class="comparison-table">
            <div class="comparison-header">
              <div class="feature-name"></div>
              <div v-for="plan in plans" :key="plan.name" class="plan-name">
                {{ plan.name }}
              </div>
            </div>

            <div
              v-for="row in featureComparison"
              :key="row.name"
              class="comparison-row"
            >
              <div class="feature-name">{{ row.name }}</div>
              <div class="feature-value">
                <Check v-if="row.free === true" :size="18" class="check" />
                <span v-else-if="row.free === false" class="dash">—</span>
                <span v-else>{{ row.free }}</span>
              </div>
              <div class="feature-value">
                <Check v-if="row.seller === true" :size="18" class="check" />
                <span v-else-if="row.seller === false" class="dash">—</span>
                <span v-else>{{ row.seller }}</span>
              </div>
              <div class="feature-value">
                <Check v-if="row.custom === true" :size="18" class="check" />
                <span v-else-if="row.custom === false" class="dash">—</span>
                <span v-else>{{ row.custom }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why We Price This Way -->
    <section class="pricing-philosophy section">
      <div class="container container-narrow">
        <div class="philosophy-content" v-motion-fade-visible-once>
          <h2>Why we price this way</h2>
          <p>
            We only make money when you do. No seats, no tiers, no subscription — a flat 10% when a pack sells, and Stripe's processing fee. On a €20 pack you keep about €17.45.
          </p>
          <div class="philosophy-values">
            <div class="value-item">
              <Heart :size="24" />
              <span>Free portfolio, forever</span>
            </div>
            <div class="value-item">
              <Shield :size="24" />
              <span>You're the merchant of record</span>
            </div>
            <div class="value-item">
              <Zap :size="24" />
              <span>Pay only when you sell</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section section">
      <div class="container container-narrow">
        <div class="section-header">
          <h2>Frequently asked questions</h2>
        </div>

        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
            :class="{ open: openFaq === index }"
          >
            <button class="faq-question" @click="openFaq = openFaq === index ? null : index">
              {{ faq.question }}
              <ChevronDown :size="20" />
            </button>
            <Transition name="collapse">
              <div v-if="openFaq === index" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Check, Heart, Shield, Zap, ChevronDown } from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'

const openFaq = ref(null)

const plans = [
  {
    name: 'Free',
    description: 'A hosted home for your music, no strings attached.',
    price: '€0',
    pricePeriod: 'forever',
    featured: false,
    cta: { text: 'Create free account', href: '#' },
    features: [
      'Portfolio site',
      'Song feeds',
      '3 GB storage',
      'No credit card required'
    ]
  },
  {
    name: 'Seller',
    description: 'Turn on commerce when you\'re ready to sell.',
    price: '€0',
    pricePeriod: '+ 10% per sale',
    featured: true,
    cta: { text: 'Connect Stripe & start selling', href: '#' },
    features: [
      'Everything in Free',
      'Sell sample packs',
      '20 GB storage',
      '5 GB per pack',
      'Stripe Connect payouts',
      'Embed widget + API keys',
      'Secure buyer delivery'
    ]
  },
  {
    name: 'Custom',
    description: 'Need more room?',
    price: 'Custom',
    pricePeriod: '',
    featured: false,
    cta: { text: 'Get in touch', href: '#' },
    features: [
      'Everything in Seller',
      'Higher storage quotas on request',
      'Same 10% flat fee'
    ]
  }
]

const featureComparison = [
  { name: 'Portfolio site + song feeds', free: true, seller: true, custom: true },
  { name: 'Storage', free: '3 GB', seller: '20 GB', custom: 'By request' },
  { name: 'Sell sample packs', free: false, seller: true, custom: true },
  { name: 'Max pack size', free: false, seller: '5 GB', custom: '5 GB' },
  { name: 'Platform fee', free: false, seller: '10% per sale', custom: '10% per sale' },
  { name: 'Embed widget + API keys', free: false, seller: true, custom: true },
  { name: 'Download delivery (5 uses, 7 days)', free: false, seller: true, custom: true },
  { name: 'Extension grants (+5 / +7 days)', free: false, seller: true, custom: true },
  { name: 'Payouts', free: false, seller: 'Direct to your Stripe account', custom: 'Direct to your Stripe account' }
]

const faqs = [
  {
    question: 'How do payouts work?',
    answer: "Payments run on Stripe Connect direct charges — you're the merchant of record. Funds settle directly in your own Stripe account on Stripe's normal payout schedule."
  },
  {
    question: 'What does the 10% cover?',
    answer: 'Hosting, automated audio previews, secure delivery, checkout, the embed widget, and the public API.'
  },
  {
    question: 'Do buyers need an account?',
    answer: 'No — they pay with Stripe Checkout and get the pack by email. No login, no account creation.'
  },
  {
    question: 'What if a buyer loses the link?',
    answer: "They can self-serve a resend. If their downloads run out, they can request an extension and you approve +5 downloads / +7 days in one click from your dashboard."
  },
  {
    question: 'How do refunds work?',
    answer: "Refund from your own Stripe dashboard. AuxKit's webhook picks it up, revokes the download token, and rebates its platform fee."
  },
  {
    question: 'What are the storage limits?',
    answer: '3 GB free, 20 GB once Stripe is connected, and 5 GB per pack. Need more? Higher quotas are available by request.'
  }
]
</script>

<style scoped>
.pricing-page {
  padding-top: 72px;
}

.page-hero {
  padding: var(--space-4xl) 0 var(--space-2xl);
  text-align: center;
  background: var(--color-bg);
}

.page-hero h1 {
  max-width: 800px;
  margin: 0 auto var(--space-lg);
}

.hero-desc {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.25rem;
}

/* Pricing Cards */
.pricing-cards {
  background: var(--color-bg);
  padding-top: 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  align-items: start;
}

.pricing-card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  transition: all var(--transition-base);
}

.pricing-card.featured {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-glow);
  transform: scale(1.02);
}

.featured-badge {
  position: absolute;
  top: calc(var(--space-lg) * -1);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-sm) var(--space-lg);
  background: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-full);
}

.plan-header h3 {
  font-size: 1.375rem;
  margin-bottom: var(--space-sm);
}

.plan-header p {
  font-size: 0.9375rem;
  margin-bottom: var(--space-xl);
}

.plan-price {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
}

.price-amount {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.price-period {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.pricing-card .btn {
  width: 100%;
  margin-bottom: var(--space-xl);
  justify-content: center;
}

.plan-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.plan-features li svg {
  color: var(--color-success);
  flex-shrink: 0;
}

/* Comparison Table */
.comparison-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.comparison-table-wrap {
  overflow-x: auto;
}

.comparison-table {
  min-width: 700px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.comparison-header {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}

.comparison-header .feature-name,
.comparison-header .plan-name {
  padding: var(--space-lg);
  font-weight: 600;
  text-align: center;
}

.comparison-header .feature-name {
  text-align: left;
}

.comparison-row {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid var(--color-border-subtle);
}

.comparison-row:last-child {
  border-bottom: none;
}

.comparison-row .feature-name,
.comparison-row .feature-value {
  padding: var(--space-md) var(--space-lg);
  display: flex;
  align-items: center;
}

.comparison-row .feature-name {
  color: var(--color-text-secondary);
}

.comparison-row .feature-value {
  justify-content: center;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  text-align: center;
}

.feature-value .check {
  color: var(--color-success);
}

.feature-value .dash {
  color: var(--color-text-muted);
  opacity: 0.5;
}

/* Philosophy */
.pricing-philosophy {
  background: var(--color-bg);
}

.philosophy-content {
  text-align: center;
}

.philosophy-content h2 {
  margin-bottom: var(--space-xl);
}

.philosophy-content p {
  font-size: 1.125rem;
  margin-bottom: var(--space-lg);
  color: var(--color-text-secondary);
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.philosophy-values {
  display: flex;
  justify-content: center;
  gap: var(--space-2xl);
  margin-top: var(--space-2xl);
}

.value-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-primary);
}

.value-item svg {
  color: var(--color-accent);
}

/* FAQ */
.faq-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.faq-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-lg);
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.faq-question:hover {
  background: var(--color-bg-hover);
}

.faq-item.open .faq-question svg {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 var(--space-lg) var(--space-lg);
}

.faq-answer p {
  font-size: 0.9375rem;
  line-height: 1.7;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .pricing-card.featured {
    transform: none;
    order: -1;
  }

  .comparison-header,
  .comparison-row {
    min-width: 700px;
  }

  .philosophy-values {
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
  }
}
</style>
