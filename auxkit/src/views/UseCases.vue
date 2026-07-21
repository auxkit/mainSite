<template>
  <main class="use-cases-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible-once>Use Cases</span>
        <h1 v-motion-slide-visible-once-bottom>Built for how you<br/>actually sell sounds</h1>
        <p class="hero-desc" v-motion-slide-visible-once-bottom :delay="100">
          See how different kinds of sellers put AuxKit's real features to work.
        </p>
      </div>
    </section>

    <!-- Persona Filter -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-tabs">
          <button
            v-for="persona in personas"
            :key="persona.id"
            class="filter-tab"
            :class="{ active: activePersona === persona.id }"
            @click="activePersona = persona.id"
          >
            <component :is="persona.icon" :size="18" />
            {{ persona.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Persona Content -->
    <section class="use-case-content section">
      <div class="container">
        <Transition name="fade" mode="out-in">
          <div :key="activePersona" class="use-case-grid">
            <div class="use-case-main" v-motion-slide-visible-once-left>
              <h2>{{ currentPersona.title }}</h2>
              <p class="use-case-desc">{{ currentPersona.description }}</p>

              <div class="pain-points">
                <h3>Common Pain Points</h3>
                <ul>
                  <li v-for="pain in currentPersona.painPoints" :key="pain">
                    <X :size="16" />
                    {{ pain }}
                  </li>
                </ul>
              </div>

              <div class="solution-points">
                <h3>How AuxKit Helps</h3>
                <ul>
                  <li v-for="solution in currentPersona.solutions" :key="solution">
                    <Check :size="16" />
                    {{ solution }}
                  </li>
                </ul>
              </div>

              <div class="recommended-modules">
                <h3>Relevant Features</h3>
                <div class="module-tags">
                  <span v-for="mod in currentPersona.features" :key="mod" class="module-tag">
                    {{ mod }}
                  </span>
                </div>
              </div>
            </div>

            <div class="use-case-visual" v-motion-slide-visible-once-right>
              <div class="workflow-diagram">
                <div class="diagram-header">
                  <span>Example Workflow</span>
                </div>
                <div class="diagram-content">
                  <div v-for="(step, index) in currentPersona.workflowSteps" :key="index" class="diagram-step">
                    <div class="step-node">{{ index + 1 }}</div>
                    <span>{{ step }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Example Walkthroughs -->
    <section class="case-studies section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Example Walkthroughs</span>
          <h2>How a sale actually plays out</h2>
          <p>Illustrative scenarios showing the real product flow end to end — no fabricated customers, no invented metrics.</p>
        </div>

        <div class="grid grid-3">
          <div
            v-for="(walkthrough, index) in walkthroughs"
            :key="walkthrough.title"
            class="case-study-card"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
          >
            <div class="study-header">
              <div class="study-icon">
                <component :is="walkthrough.icon" :size="22" />
              </div>
              <div>
                <span class="study-kicker">Example scenario</span>
                <h4>{{ walkthrough.title }}</h4>
              </div>
            </div>
            <p class="study-summary">{{ walkthrough.summary }}</p>
            <ol class="study-steps">
              <li v-for="step in walkthrough.steps" :key="step">{{ step }}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Disc3, Code, Building2, Mic, Terminal,
  X, Check, Github, Mail, RefreshCw
} from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'

const activePersona = ref('beatmakers')

const personas = [
  { id: 'beatmakers', name: 'Beatmakers & Producers', icon: Disc3 },
  { id: 'sound-designers', name: 'Sound Designers', icon: Code },
  { id: 'labels', name: 'Small Labels & Collectives', icon: Building2 },
  { id: 'artists', name: 'Artists & Bands', icon: Mic },
  { id: 'developers', name: 'Developers & Web Designers', icon: Terminal }
]

const personaData = {
  beatmakers: {
    title: 'Beatmakers & Producers',
    description: 'Sell drum kits and loop packs straight from your beat store — every sample previewable, with BPM and key shown up front.',
    painPoints: [
      'Marketplace commissions eat into every sale',
      'Buyers can\'t hear what they\'re buying before checkout',
      'No BPM/key info means more refund requests',
      'Lost-download emails turn into support chats'
    ],
    solutions: [
      'Auto-generated preview for every sample you upload',
      'BPM/key/duration metadata shown per sample',
      'Flat 10% fee instead of marketplace commission',
      'Buyers self-serve resends instead of emailing you'
    ],
    features: ['Pack Manager', 'Audio Previews', 'Stripe Payouts', 'Secure Delivery'],
    workflowSteps: ['Upload kit samples', 'Set price + artwork', 'Publish pack', 'Buyer previews + buys', 'Buyer downloads via email link']
  },
  'sound-designers': {
    title: 'Sound Designers',
    description: 'Drop your pack store into your existing portfolio site with the embed widget — no rebuild, no separate storefront to maintain.',
    painPoints: [
      'Existing portfolio has nowhere to sell packs',
      'Don\'t want to stand up a whole separate storefront',
      'Need pricing and checkout to just work on their own site',
      'Can\'t justify a full e-commerce build for a few packs'
    ],
    solutions: [
      'Single script tag renders a full storefront on any page',
      'Grid view or single-pack detail via data-pack',
      'Prices formatted automatically per currency',
      'Zero runtime dependencies, no SDK to install'
    ],
    features: ['Embed Widget', 'Pack Manager', 'Audio Previews'],
    workflowSteps: ['Create pack in dashboard', 'Copy embed script tag', 'Paste into portfolio site', 'Widget renders storefront', 'Checkout redirects to Stripe']
  },
  labels: {
    title: 'Small Labels & Collectives',
    description: 'Publish the whole catalogue under one account, and use the public API to power a custom storefront if you outgrow the widget.',
    painPoints: [
      'Multiple producers, one storefront to manage',
      'Need more control than a drop-in widget gives',
      'Want the catalogue to live somewhere they control',
      'Manual sample metadata entry across many packs'
    ],
    solutions: [
      'One account, one pack catalogue, published together',
      'Public API (Bearer ak_ keys) for a fully custom storefront',
      'Domain-restricted keys keep the API safe to expose client-side',
      '60 req/min public rate limit is enough for typical catalogue browsing'
    ],
    features: ['Pack Manager', 'Public API', 'Embed Widget'],
    workflowSteps: ['Create API key', 'Restrict key to your domain', 'Call GET /public/packs', 'Render your own catalogue UI', 'POST checkout on Buy click']
  },
  artists: {
    title: 'Artists & Bands',
    description: 'Start with a free portfolio site and song feeds — add commerce later, whenever you actually have packs to sell.',
    painPoints: [
      'Don\'t need a store yet, just somewhere to point fans',
      'Free tiers elsewhere come with heavy upsell pressure',
      'Don\'t want to pay for storage they\'re not using',
      'Want to add selling later without switching platforms'
    ],
    solutions: [
      'Portfolio site and song feeds are free, no time limit',
      '3 GB of storage included on the free tier',
      'No credit card required to get started',
      'Connect Stripe later to unlock packs, same account'
    ],
    features: ['Portfolio Sites & Song Feeds'],
    workflowSteps: ['Create free account', 'Set up portfolio site', 'Add songs to your feed', 'Share your page', 'Connect Stripe when ready to sell']
  },
  developers: {
    title: 'Developers & Web Designers',
    description: 'Build client storefronts on the REST API and embed widget — domain-restricted keys keep embeds safe to ship on someone else\'s site.',
    painPoints: [
      'Clients want a storefront, not a custom checkout build',
      'Handing out an API key client-side feels risky',
      'Need predictable rate limits to plan around',
      'Don\'t want to maintain a payments integration themselves'
    ],
    solutions: [
      'Public API is read-only + checkout, scoped by API key',
      'Keys are domain-restricted via Origin/Referer match',
      '60 req/min per key, documented and predictable',
      'Stripe Checkout handles payment — no PCI surface for you to own'
    ],
    features: ['Public API', 'Embed Widget'],
    workflowSteps: ['Client creates AuxKit account', 'Generate a domain-restricted API key', 'Drop in the embed widget (or call the API directly)', 'Client manages packs from their dashboard']
  }
}

const currentPersona = computed(() => personaData[activePersona.value])

const walkthroughs = [
  {
    icon: Github,
    title: 'Publish a kit, embed it on GitHub Pages',
    summary: 'A producer uploads a drum kit, sets a price, and publishes it. They copy the embed script tag from their dashboard and paste it into a static GitHub Pages site.',
    steps: [
      'Upload samples, artwork, and a preview',
      'Publish — bundle build kicks off automatically',
      'Generate an API key restricted to their GitHub Pages domain',
      'Paste the script tag into their site\'s HTML',
      'Storefront renders with previews and Buy buttons'
    ]
  },
  {
    icon: Mail,
    title: 'A buyer loses their download email',
    summary: 'A buyer bought a pack last week, deleted the email by accident, and can\'t find their download link.',
    steps: [
      'Buyer submits their email + the pack on the resend form',
      'Resend is rate-limited to 5/hour per email+pack to prevent abuse',
      'If it\'s still within 5 downloads / 7 days, the link is re-sent',
      'No support ticket required on either side'
    ]
  },
  {
    icon: RefreshCw,
    title: 'Approving an extension request',
    summary: 'A buyer ran out of downloads before finishing their project and requests more time.',
    steps: [
      'Buyer submits a request-extension form (rate-limited 5/hour)',
      'Seller sees the flagged purchase in their dashboard',
      'Seller clicks Extend: +5 downloads, +7 days',
      'Buyer\'s existing link keeps working with the new limits'
    ]
  }
]
</script>

<style scoped>
.use-cases-page {
  padding-top: 72px;
}

.page-hero {
  padding: var(--space-4xl) 0;
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

/* Filter */
.filter-section {
  background: var(--color-bg);
  padding-bottom: var(--space-xl);
}

.filter-tabs {
  display: flex;
  gap: var(--space-sm);
  overflow-x: auto;
  padding: var(--space-sm);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.filter-tab:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.filter-tab.active {
  background: var(--color-accent);
  color: white;
}

/* Persona Content */
.use-case-content {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.use-case-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
}

.use-case-main h2 {
  font-size: 2rem;
  margin-bottom: var(--space-md);
}

.use-case-desc {
  font-size: 1.125rem;
  margin-bottom: var(--space-2xl);
}

.pain-points,
.solution-points,
.recommended-modules {
  margin-bottom: var(--space-xl);
}

.pain-points h3,
.solution-points h3,
.recommended-modules h3 {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.pain-points ul,
.solution-points ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.pain-points li,
.solution-points li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  color: var(--color-text-secondary);
}

.pain-points li svg {
  color: var(--color-error);
  flex-shrink: 0;
  margin-top: 2px;
}

.solution-points li svg {
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 2px;
}

.module-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.module-tag {
  padding: var(--space-sm) var(--space-md);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Workflow Diagram */
.workflow-diagram {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.diagram-header {
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.diagram-content {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.diagram-step {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-bg);
  border-radius: var(--radius-md);
}

.step-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.diagram-step span {
  font-size: 0.9375rem;
  color: var(--color-text-primary);
}

/* Example Walkthroughs */
.case-studies {
  background: var(--color-bg);
}

.case-study-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  transition: all var(--transition-base);
}

.case-study-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.study-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.study-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.study-kicker {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.study-header h4 {
  font-size: 1.0625rem;
}

.study-summary {
  font-size: 0.9375rem;
  margin-bottom: var(--space-lg);
}

.study-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  list-style: decimal;
  list-style-position: inside;
}

.study-steps li {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .use-case-grid {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .filter-tabs {
    justify-content: flex-start;
  }
}
</style>
