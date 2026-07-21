<template>
  <main class="about-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible>About AuxKit</span>
        <h1 v-motion-slide-visible-bottom>Your storefront.<br/>Your audience. Your Stripe account.</h1>
        <p class="hero-desc" v-motion-slide-visible-bottom :delay="100">
          A small team of musicians building the storefront layer we wished existed when we started selling our own sounds.
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="mission-section section">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-content" v-motion-slide-visible-left>
            <h2>Our Mission</h2>
            <p class="mission-statement">
              "Musicians should own their storefront, their audience, and their income."
            </p>
            <p>
              AuxKit exists so selling your own sounds from your own site is as easy as
              embedding a video. No marketplace commission, no algorithm to please, no
              glue code between checkout and delivery.
            </p>
            <p>
              You keep the customer relationship. Money settles in your own Stripe
              account. We take a flat 10% only when a pack sells.
            </p>
          </div>
          <div class="mission-visual" v-motion-slide-visible-right>
            <div class="visual-box">
              <div class="visual-element"></div>
              <div class="visual-element"></div>
              <div class="visual-element"></div>
              <div class="visual-element center"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="philosophy-section section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Principles</span>
          <h2>What AuxKit is built on</h2>
          <p>Four commitments that shape every part of the product.</p>
        </div>

        <div class="grid grid-4">
          <div
            v-for="(principle, index) in principles"
            :key="principle.title"
            class="principle-card"
            v-motion-slide-visible-bottom
            :delay="index * 100"
          >
            <div class="principle-icon">
              <component :is="principle.icon" :size="28" />
            </div>
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="story-section section">
      <div class="container container-narrow">
        <div class="story-content" v-motion-fade-visible>
          <h2>The AuxKit Story</h2>
          <p>
            AuxKit started with a simple frustration: selling a sample pack from your own
            website meant weeks of glue code—checkout, hosting, expiring links, lost-download
            support email. We built the storefront layer so musicians don't have to.
          </p>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Team</span>
          <h2>Built by musicians, for musicians</h2>
          <p>
            AuxKit is built by a small team of people who make and sell music
            themselves. We use the seller dashboard for our own packs, so every
            rough edge we ship is one we felt first.
          </p>
        </div>

        <div class="team-chips" v-motion-fade-visible>
          <span v-for="chip in teamChips" :key="chip" class="team-chip">{{ chip }}</span>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section section">
      <div class="container">
        <div class="values-grid">
          <div class="values-header" v-motion-slide-visible-left>
            <span class="badge mb-lg">Values</span>
            <h2>What we commit to</h2>
            <p>
              Product commitments that follow directly from our principles—not slogans,
              things you can check against the product.
            </p>
          </div>
          <div class="values-list" v-motion-slide-visible-right>
            <div v-for="value in values" :key="value.title" class="value-item">
              <h4>{{ value.title }}</h4>
              <p>{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Get in touch -->
    <section class="careers-section section">
      <div class="container">
        <div class="careers-box" v-motion-fade-visible>
          <div class="careers-content">
            <h2>Get in touch</h2>
            <p>
              Questions about selling with AuxKit? We read everything.
            </p>
          </div>
          <div class="careers-actions">
            <a href="mailto:hello@auxkit.dev" class="btn btn-primary btn-lg">
              Contact us
              <ArrowRight :size="18" />
            </a>
            <router-link to="/docs" class="btn btn-secondary btn-lg">
              Read the docs
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>

<script setup>
import { Store, Unlock, Percent, Headphones, ArrowRight } from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'

const principles = [
  {
    icon: Store,
    title: 'Direct-to-fan',
    description: 'You\'re the merchant of record. Money settles in your own Stripe account, not ours.'
  },
  {
    icon: Unlock,
    title: 'No lock-in',
    description: 'Plain HTTPS, one script tag, your files remain yours. Nothing proprietary to get stuck in.'
  },
  {
    icon: Percent,
    title: 'Transparent',
    description: 'One flat 10% fee, no subscription, no seats. What you see is what you pay.'
  },
  {
    icon: Headphones,
    title: 'Buyer-respecting',
    description: 'Previews before purchase, self-service delivery, no forced accounts.'
  }
]

const teamChips = ['Small team', 'Producer-first', 'Independent']

const values = [
  {
    title: 'You keep the relationship',
    description: 'Direct charges mean you\'re the merchant of record—your customer, your Stripe account, your data.'
  },
  {
    title: 'No lock-in, ever',
    description: 'Your samples, your pack pages, your embed—built on plain HTTPS and a script tag you can remove any time.'
  },
  {
    title: 'One fee, no surprises',
    description: 'A flat 10% platform fee when a pack sells. No subscription, no seats, no upsells.'
  },
  {
    title: 'Buyers come first, too',
    description: 'Audio previews before checkout, self-service resend and extension requests, no account required to buy.'
  }
]
</script>

<style scoped>
.about-page {
  padding-top: 72px;
}

.page-hero {
  padding: var(--space-4xl) 0;
  text-align: center;
  background: var(--color-bg);
}

.page-hero h1 {
  max-width: 900px;
  margin: 0 auto var(--space-lg);
}

.hero-desc {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.25rem;
}

/* Mission */
.mission-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
  align-items: center;
}

.mission-content h2 {
  font-size: 2rem;
  margin-bottom: var(--space-xl);
}

.mission-statement {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-text-primary);
  padding-left: var(--space-lg);
  border-left: 3px solid var(--color-accent);
  margin-bottom: var(--space-xl);
}

.mission-content p {
  font-size: 1.0625rem;
  margin-bottom: var(--space-lg);
}

.mission-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-box {
  position: relative;
  width: 300px;
  height: 300px;
}

.visual-element {
  position: absolute;
  width: 80px;
  height: 80px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.visual-element:nth-child(1) { top: 0; left: 0; }
.visual-element:nth-child(2) { top: 0; right: 0; }
.visual-element:nth-child(3) { bottom: 0; left: 0; }
.visual-element:nth-child(4) { bottom: 0; right: 0; }

.visual-element.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: var(--color-accent-subtle);
  border-color: var(--color-accent);
}

/* Philosophy */
.philosophy-section {
  background: var(--color-bg);
}

.principle-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.principle-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.principle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-lg);
  background: var(--color-accent-subtle);
  border-radius: var(--radius-lg);
  color: var(--color-accent);
}

.principle-card h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

/* Story */
.story-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.story-content h2 {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.story-content p {
  font-size: 1.125rem;
  margin-bottom: var(--space-lg);
  line-height: 1.8;
}

/* Team */
.team-section {
  background: var(--color-bg);
}

.team-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-md);
}

.team-chip {
  padding: var(--space-sm) var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Values */
.values-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
}

.values-header h2 {
  margin-bottom: var(--space-lg);
}

.values-header p {
  font-size: 1.125rem;
}

.values-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.value-item {
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.value-item h4 {
  font-size: 1rem;
  margin-bottom: var(--space-sm);
}

.value-item p {
  font-size: 0.9375rem;
}

/* Careers */
.careers-section {
  background: var(--color-bg);
}

.careers-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2xl);
  padding: var(--space-3xl);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-xl);
}

.careers-content h2 {
  font-size: 1.75rem;
  margin-bottom: var(--space-md);
}

.careers-content p {
  font-size: 1.0625rem;
  max-width: 500px;
}

.careers-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .mission-grid,
  .values-grid {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .visual-box {
    display: none;
  }

  .careers-box {
    flex-direction: column;
    text-align: center;
  }

  .careers-actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
