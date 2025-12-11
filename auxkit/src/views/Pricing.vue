<template>
  <main class="pricing-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible>Pricing</span>
        <h1 v-motion-slide-visible-bottom>Simple, transparent pricing</h1>
        <p class="hero-desc" v-motion-slide-visible-bottom :delay="100">
          Pay for what you use. No hidden fees, no surprises. Start free and scale as you grow.
        </p>

        <!-- Billing Toggle -->
        <div class="billing-toggle" v-motion-fade-visible :delay="200">
          <button 
            :class="{ active: billingCycle === 'monthly' }"
            @click="billingCycle = 'monthly'"
          >
            Monthly
          </button>
          <button 
            :class="{ active: billingCycle === 'annual' }"
            @click="billingCycle = 'annual'"
          >
            Annual
            <span class="save-badge">Save 20%</span>
          </button>
        </div>
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
            v-motion-slide-visible-bottom
            :delay="index * 100"
          >
            <div v-if="plan.featured" class="featured-badge">Most Popular</div>
            
            <div class="plan-header">
              <h3>{{ plan.name }}</h3>
              <p>{{ plan.description }}</p>
            </div>

            <div class="plan-price">
              <span class="price-amount">
                {{ plan.price === 'Custom' ? plan.price : `$${getPrice(plan.price)}` }}
              </span>
              <span v-if="plan.price !== 'Custom'" class="price-period">
                /{{ billingCycle === 'annual' ? 'year' : 'month' }}
              </span>
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

        <div class="comparison-table">
          <div class="comparison-header">
            <div class="feature-name"></div>
            <div v-for="plan in plans" :key="plan.name" class="plan-name">
              {{ plan.name }}
            </div>
          </div>

          <div 
            v-for="category in featureComparison" 
            :key="category.category"
            class="comparison-category"
          >
            <div class="category-header">{{ category.category }}</div>
            <div 
              v-for="feature in category.features" 
              :key="feature.name"
              class="comparison-row"
            >
              <div class="feature-name">
                {{ feature.name }}
                <span v-if="feature.tooltip" class="feature-tooltip">
                  <Info :size="14" />
                </span>
              </div>
              <div 
                v-for="plan in plans" 
                :key="plan.name"
                class="feature-value"
              >
                <Check v-if="feature[plan.name.toLowerCase()] === true" :size="18" class="check" />
                <X v-else-if="feature[plan.name.toLowerCase()] === false" :size="18" class="cross" />
                <span v-else>{{ feature[plan.name.toLowerCase()] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why We Price This Way -->
    <section class="pricing-philosophy section">
      <div class="container container-narrow">
        <div class="philosophy-content" v-motion-fade-visible>
          <h2>Why we price this way</h2>
          <p>
            We believe great tools should be accessible. That's why AuxKit starts free—with no arbitrary limits designed to push you to paid plans.
          </p>
          <p>
            Our Pro tier is built for teams that need more power, and Enterprise is for organizations with specific security, compliance, and scale requirements.
          </p>
          <p>
            No per-seat pricing games. No "contact us" walls hiding basic information. Just honest pricing for honest software.
          </p>
          <div class="philosophy-values">
            <div class="value-item">
              <Heart :size="24" />
              <span>Free tier that actually works</span>
            </div>
            <div class="value-item">
              <Shield :size="24" />
              <span>No surprise charges</span>
            </div>
            <div class="value-item">
              <Zap :size="24" />
              <span>Upgrade when ready</span>
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
import { ref, computed } from 'vue'
import { Check, X, Info, Heart, Shield, Zap, ChevronDown } from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'

const billingCycle = ref('monthly')
const openFaq = ref(null)

const plans = [
  {
    name: 'Free',
    description: 'For individuals and small teams getting started.',
    price: 0,
    featured: false,
    cta: { text: 'Get Started', href: '#' },
    features: [
      'Core module usage',
      'Up to 3 team members',
      '1,000 workflow runs/month',
      '5 integrations',
      'Community support',
      '7-day data retention'
    ]
  },
  {
    name: 'Pro',
    description: 'For growing teams that need more power.',
    price: 29,
    featured: true,
    cta: { text: 'Start Free Trial', href: '#' },
    features: [
      'All modules included',
      'Unlimited team members',
      'Unlimited workflow runs',
      'Unlimited integrations',
      'Priority support',
      '1-year data retention',
      'Advanced automations',
      'Custom reporting'
    ]
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced requirements.',
    price: 'Custom',
    featured: false,
    cta: { text: 'Contact Sales', href: '#' },
    features: [
      'Everything in Pro',
      'Custom modules',
      'On-premise deployment',
      'Dedicated support',
      'SSO / SAML',
      'Unlimited data retention',
      'Security reviews',
      'Custom SLAs'
    ]
  }
]

const getPrice = (price) => {
  if (price === 0) return '0'
  if (billingCycle.value === 'annual') {
    return Math.round(price * 12 * 0.8)
  }
  return price
}

const featureComparison = [
  {
    category: 'Core Features',
    features: [
      { name: 'Workflow Engine', free: true, pro: true, enterprise: true },
      { name: 'Task Manager', free: true, pro: true, enterprise: true },
      { name: 'Data Layer', free: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
      { name: 'Automations', free: '5/month', pro: 'Unlimited', enterprise: 'Unlimited' }
    ]
  },
  {
    category: 'Team & Collaboration',
    features: [
      { name: 'Team members', free: 'Up to 3', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Guest access', free: false, pro: true, enterprise: true },
      { name: 'Role-based permissions', free: false, pro: true, enterprise: true },
      { name: 'Audit logs', free: false, pro: '90 days', enterprise: 'Unlimited' }
    ]
  },
  {
    category: 'Integrations',
    features: [
      { name: 'Native integrations', free: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'API access', free: 'Read-only', pro: 'Full', enterprise: 'Full + Custom' },
      { name: 'Webhooks', free: false, pro: true, enterprise: true },
      { name: 'Custom connectors', free: false, pro: false, enterprise: true }
    ]
  },
  {
    category: 'Support & Security',
    features: [
      { name: 'Support', free: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
      { name: 'SSO / SAML', free: false, pro: false, enterprise: true },
      { name: 'On-premise', free: false, pro: false, enterprise: true },
      { name: 'SLA', free: false, pro: '99.9%', enterprise: 'Custom' }
    ]
  }
]

const faqs = [
  {
    question: 'Can I switch plans at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, the change takes effect at your next billing cycle.'
  },
  {
    question: 'What happens when I hit my limits on Free?',
    answer: 'We\'ll notify you when you\'re approaching limits. Your workflows won\'t stop—we\'ll just ask you to upgrade to continue. No surprise charges, ever.'
  },
  {
    question: 'Do you offer discounts for nonprofits or startups?',
    answer: 'Yes! We offer 50% off Pro for verified nonprofits and qualifying startups. Contact our team to learn more about eligibility.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH transfers (for annual plans), and can invoice Enterprise customers in multiple currencies.'
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No long-term contracts required. Monthly plans can be cancelled anytime. Annual plans are paid upfront but include the 20% discount.'
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
  margin: 0 auto var(--space-2xl);
  font-size: 1.25rem;
}

/* Billing Toggle */
.billing-toggle {
  display: inline-flex;
  padding: var(--space-xs);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.billing-toggle button {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.billing-toggle button.active {
  background: var(--color-accent);
  color: white;
}

.save-badge {
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-success);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-full);
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

.comparison-table {
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

.category-header {
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  gap: var(--space-sm);
  color: var(--color-text-secondary);
}

.feature-tooltip {
  color: var(--color-text-muted);
  cursor: help;
}

.comparison-row .feature-value {
  justify-content: center;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.feature-value .check {
  color: var(--color-success);
}

.feature-value .cross {
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

  .comparison-table {
    overflow-x: auto;
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
