<template>
  <section class="pack-commerce section">
    <div class="container">
      <div class="section-header pack-commerce__header">
        <SectionLabel>Sample Pack Commerce</SectionLabel>
        <h2 v-motion-slide-visible-once-bottom>
          Sell sample packs, straight from your own site
        </h2>
        <p v-motion-slide-visible-once-bottom :delay="100">
          Upload your packs, publish a storefront, and embed it anywhere with a script tag.
          AuxKit handles previews, checkout, and payouts—you keep your own domain and your own audience.
        </p>
        <Badge variant="accent" class="mt-lg">New</Badge>
      </div>

      <div class="grid grid-3 pack-commerce__grid" v-motion-fade-visible-once>
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="card-flat"
          v-motion-slide-visible-once-bottom
          :delay="index * 75"
        >
          <div class="icon-wrapper mb-lg">
            <component :is="feature.icon" :size="22" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <!-- Seller story -->
    <div class="container">
      <div class="pack-story">
        <SectionLabel>How selling works</SectionLabel>
        <h3 v-motion-slide-visible-once-bottom>From upload to payout</h3>
        <div class="pack-story__grid" v-motion-fade-visible-once>
          <div
            v-for="(step, index) in sellerSteps"
            :key="step.title"
            class="card-flat pack-story__step"
            v-motion-slide-visible-once-bottom
            :delay="index * 60"
          >
            <span class="pack-story__number">{{ index + 1 }}</span>
            <component :is="step.icon" :size="20" class="pack-story__icon" />
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>

      <!-- Buyer story -->
      <div class="pack-story">
        <SectionLabel>How buying works</SectionLabel>
        <h3 v-motion-slide-visible-once-bottom>From preview to download</h3>
        <div class="pack-story__grid" v-motion-fade-visible-once>
          <div
            v-for="(step, index) in buyerSteps"
            :key="step.title"
            class="card-flat pack-story__step"
            v-motion-slide-visible-once-bottom
            :delay="index * 60"
          >
            <span class="pack-story__number">{{ index + 1 }}</span>
            <component :is="step.icon" :size="20" class="pack-story__icon" />
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Store, Music, Code, CreditCard, Banknote, HardDrive,
  Upload, Globe, ShoppingCart, Link2, Key, RefreshCw,
} from 'lucide-vue-next'
import SectionLabel from './SectionLabel.vue'
import Badge from './Badge.vue'

const features = [
  {
    icon: Store,
    title: 'Your own storefront',
    description: 'Every producer gets a pack catalog they control. Only published packs are ever shown publicly—drafts stay private until you\'re ready.',
  },
  {
    icon: Music,
    title: 'Auto-generated previews',
    description: 'Upload your samples and AuxKit generates a short preview clip automatically, so buyers can hear before they buy.',
  },
  {
    icon: Code,
    title: 'Embed widget',
    description: 'Drop a single script tag into any site to render your pack grid or a single pack, with a built-in preview player.',
  },
  {
    icon: CreditCard,
    title: 'Stripe Checkout',
    description: 'Buyers pay through Stripe Checkout. No custom payment flow to build or maintain on your end.',
  },
  {
    icon: Banknote,
    title: 'Stripe Connect payouts',
    description: 'Connect your own Stripe account and get paid directly. You\'re the merchant of record; AuxKit takes a platform fee.',
  },
  {
    icon: HardDrive,
    title: 'Secure downloads',
    description: 'Purchases unlock entitlement-token download links, with self-service resend and extension requests for buyers.',
  },
]

const sellerSteps = [
  { icon: Upload, title: 'Upload', description: 'Add samples to a pack from your dashboard.' },
  { icon: Globe, title: 'Publish', description: 'Make the pack visible on your public storefront.' },
  { icon: Code, title: 'Embed', description: 'Drop the widget script tag into your own site.' },
  { icon: CreditCard, title: 'Stripe Checkout', description: 'Buyers purchase through Stripe Checkout.' },
  { icon: Banknote, title: 'Get paid', description: 'Payouts land in your account via Stripe Connect.' },
]

const buyerSteps = [
  { icon: Music, title: 'Preview', description: 'Listen to an auto-generated preview clip first.' },
  { icon: ShoppingCart, title: 'Buy', description: 'Check out securely through Stripe.' },
  { icon: Link2, title: 'Download link', description: 'Get a secure download link by email.' },
  { icon: Key, title: 'Entitlement token', description: 'The link is backed by a token tied to your purchase.' },
  { icon: RefreshCw, title: 'Resend or extend', description: 'Resend the link or request an extension anytime.' },
]
</script>

<style scoped>
.pack-commerce {
  background: var(--bg-subtle);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.pack-commerce__header h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}

.pack-commerce__grid {
  margin-bottom: var(--space-4xl);
}

.card-flat h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.card-flat p {
  font-size: 0.9375rem;
  line-height: 1.6;
}

.pack-story {
  margin-top: var(--space-3xl);
}

.pack-story h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: var(--space-xl);
}

.pack-story__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-md);
}

.pack-story__step {
  padding: var(--space-lg);
}

.pack-story__number {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent);
  opacity: 0.7;
  margin-bottom: var(--space-sm);
}

.pack-story__icon {
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.pack-story__step h4 {
  font-size: 0.9375rem;
  margin-bottom: var(--space-xs);
}

.pack-story__step p {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .pack-story__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .pack-story__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
