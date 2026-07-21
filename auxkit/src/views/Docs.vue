<template>
  <main class="docs-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible>Documentation</span>
        <h1 v-motion-slide-visible-bottom>Everything you need to build</h1>
        <p class="hero-desc" v-motion-slide-visible-bottom :delay="100">
          Comprehensive guides, API references, and tutorials to help you get the most out of AuxKit.
        </p>

        <!-- Search -->
        <div class="docs-search" v-motion-fade-visible :delay="200">
          <Search :size="20" />
          <input type="text" placeholder="Search documentation..." />
          <kbd>⌘K</kbd>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="quick-links section">
      <div class="container">
        <div class="grid grid-4">
          <div 
            v-for="(link, index) in quickLinks" 
            :key="link.title"
            class="quick-link-card"
            v-motion-slide-visible-bottom
            :delay="index * 75"
          >
            <div class="link-icon" :style="{ background: link.color }">
              <component :is="link.icon" :size="24" />
            </div>
            <h3>{{ link.title }}</h3>
            <p>{{ link.description }}</p>
            <a href="#" class="link-arrow">
              <ArrowRight :size="18" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Documentation Sections -->
    <section class="docs-sections section">
      <div class="container">
        <div class="docs-grid">
          <aside class="docs-sidebar" v-motion-slide-visible-left>
            <nav class="sidebar-nav">
              <div v-for="section in docSections" :key="section.title" class="nav-section">
                <h4>{{ section.title }}</h4>
                <ul>
                  <li v-for="item in section.items" :key="item">
                    <a href="#">{{ item }}</a>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          <div class="docs-main" v-motion-slide-visible-right>
            <div class="docs-card">
              <h2>Getting Started</h2>
              <p>
                A seller quickstart: from account to a working storefront on your own site.
              </p>

              <ol class="quickstart-steps">
                <li>
                  <span class="step-num">1</span>
                  <div>
                    <span class="step-title">Create your account</span>
                    <span class="step-desc">Sign up for the seller dashboard.</span>
                  </div>
                </li>
                <li>
                  <span class="step-num">2</span>
                  <div>
                    <span class="step-title">Connect Stripe</span>
                    <span class="step-desc">Complete Stripe Connect onboarding from the dashboard — required before you can sell.</span>
                  </div>
                </li>
                <li>
                  <span class="step-num">3</span>
                  <div>
                    <span class="step-title">Create a pack and upload samples</span>
                    <span class="step-desc">Add artwork, BPM and key metadata per sample. Previews are generated automatically.</span>
                  </div>
                </li>
                <li>
                  <span class="step-num">4</span>
                  <div>
                    <span class="step-title">Publish</span>
                    <span class="step-desc">The download bundle builds automatically once you publish.</span>
                  </div>
                </li>
                <li>
                  <span class="step-num">5</span>
                  <div>
                    <span class="step-title">Create an API key</span>
                    <span class="step-desc">Shown once — keys are <code>ak_</code>-prefixed, domain-restricted, and expire after 1 year.</span>
                  </div>
                </li>
                <li>
                  <span class="step-num">6</span>
                  <div>
                    <span class="step-title">Embed the widget</span>
                    <span class="step-desc">Drop this script tag into any page that accepts one.</span>
                  </div>
                </li>
              </ol>

              <div class="code-block">
                <div class="code-header">
                  <span>Embed the widget</span>
                  <button class="copy-btn">
                    <Copy :size="16" />
                  </button>
                </div>
                <pre><code>&lt;div id="auxkit-packs"&gt;&lt;/div&gt;
&lt;script
  src="https://embed.auxkit.dev/auxkit-embed.js"
  data-api-key="ak_YOUR_KEY"
  data-target="#auxkit-packs"
  async
&gt;&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Public API & Embed Widget -->
    <section class="dev-api-teaser section grid-texture">
      <div class="container">
        <div class="section-header">
          <SectionLabel>Developer API and Embed Widget</SectionLabel>
          <h2>Sell sample packs from any site you control</h2>
          <p>A public API and a drop-in embed widget for sample-pack commerce.</p>
        </div>

        <div class="documentation-content">
          <div class="doc-prose">
            <h3>API keys</h3>
            <p>
              Every request to the public API is authorized with an API key. Create one from
              your dashboard, scope it with read permission, and reveal it when you need to
              copy it into your integration.
            </p>

            <h3>Public API</h3>
            <p>
              Only <code>GET /public/packs</code> and <code>GET /public/packs/{id}</code>
              are read-only and safe to call from a browser or a build step with your API
              key. Everything else is state-changing—including <code>GET /download</code>,
              which consumes one of the buyer's 5 downloads per request, so it must only be
              triggered on a buyer's click, never prefetched or cached.
            </p>
            <ul class="endpoint-list">
              <li><code>GET /public/packs</code><span>List published packs</span></li>
              <li><code>GET /public/packs/{id}</code><span>Pack detail, with samples</span></li>
              <li><code>POST /public/packs/{id}/checkout</code><span>Start a Stripe Checkout session</span></li>
              <li><code>GET /download?token=</code><span>Redirect to a presigned download—consumes one download per request, never prefetch or cache</span></li>
              <li><code>POST /public/purchases/resend</code><span>Resend a buyer's download link</span></li>
              <li><code>POST /public/purchases/request-extension</code><span>Request +5 downloads / +7 days</span></li>
            </ul>
            <p class="endpoint-note">
              The embed widget below calls the checkout endpoint for you, so you don't
              need to wire it up by hand.
            </p>

            <h3>Buyer self-service</h3>
            <p>
              Once a purchase is made, buyers don't need to contact support to get their files.
              They can resend their download link or request an extension straight from the
              link they were emailed—both are rate-limited to 5 per hour per email and pack.
            </p>

            <h3>Embed widget</h3>
            <p>
              <code>auxkit-embed.js</code> renders a pack grid (or a single pack) with a preview
              player wherever you drop it, and sends buyers through Stripe Checkout on purchase.
            </p>
          </div>

          <EmbedCodeSnippet />
        </div>
      </div>
    </section>

    <!-- API at a glance -->
    <section class="api-status section">
      <div class="container">
        <div class="glance-bar">
          <span class="glance-label">API at a glance</span>
          <ul class="glance-facts">
            <li>Auth: Bearer <code>ak_</code> keys</li>
            <li>Rate limit: 60 req/min</li>
            <li>Resend/extension: 5 per hour per email+pack</li>
            <li>Key expiry: 1 year</li>
            <li>Downloads: 5 per purchase, 7-day window</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import {
  Search, ArrowRight, Code, Copy, Rocket, Zap, Download
} from 'lucide-vue-next'
import SectionLabel from '../components/SectionLabel.vue'
import EmbedCodeSnippet from '../components/EmbedCodeSnippet.vue'

const quickLinks = [
  {
    icon: Rocket,
    title: 'Quick Start',
    description: 'Get up and running in 5 minutes with our quick start guide.',
    color: 'rgba(99, 102, 241, 0.15)'
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'Complete API documentation with examples and schemas.',
    color: 'rgba(34, 197, 94, 0.15)'
  },
  {
    icon: Zap,
    title: 'Embed Widget',
    description: 'Drop-in storefront widget for sample-pack commerce on any site.',
    color: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Download,
    title: 'Buyer Delivery',
    description: 'Tokenized download links, resends, and extension requests.',
    color: 'rgba(236, 72, 153, 0.15)'
  }
]

const docSections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Quick Start']
  },
  {
    title: 'Product',
    items: ['Portfolio Sites', 'Song Feeds', 'Sample Packs', 'Stripe Connect Payouts']
  },
  {
    title: 'API Reference',
    items: ['Public Packs API', 'Embed Widget', 'API Keys']
  },
  {
    title: 'Buyer Delivery',
    items: ['Downloads', 'Resend', 'Extensions']
  }
]
</script>

<style scoped>
.docs-page {
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
  margin: 0 auto var(--space-2xl);
  font-size: 1.25rem;
}

/* Search */
.docs-search {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  max-width: 500px;
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.docs-search svg {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.docs-search input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--color-text-primary);
}

.docs-search input::placeholder {
  color: var(--color-text-muted);
}

.docs-search kbd {
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Quick Links */
.quick-links {
  background: var(--color-bg);
  padding-top: 0;
}

.quick-link-card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  transition: all var(--transition-base);
}

.quick-link-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.quick-link-card h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.quick-link-card p {
  font-size: 0.9375rem;
}

.link-arrow {
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.quick-link-card:hover .link-arrow {
  color: var(--color-accent);
  transform: translateX(4px);
}

/* Docs Grid */
.docs-sections {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.docs-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-3xl);
}

.docs-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-nav {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
}

.nav-section {
  margin-bottom: var(--space-xl);
}

.nav-section:last-child {
  margin-bottom: 0;
}

.nav-section h4 {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.nav-section ul {
  list-style: none;
}

.nav-section li {
  margin-bottom: var(--space-xs);
}

.nav-section a {
  display: block;
  padding: var(--space-sm) var(--space-md);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-section a:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

/* Docs Main */
.docs-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
}

.docs-card h2 {
  font-size: 1.75rem;
  margin-bottom: var(--space-md);
}

.docs-card > p {
  font-size: 1.0625rem;
  margin-bottom: var(--space-2xl);
}

.docs-card h3 {
  font-size: 1.25rem;
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-lg);
}

/* Code Block */
.code-block {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-lg);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.copy-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.code-block pre {
  padding: var(--space-lg);
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

/* Quickstart Steps */
.quickstart-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
  list-style: none;
}

.quickstart-steps li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: var(--radius-full);
}

.quickstart-steps > li > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.quickstart-steps .step-desc code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  color: var(--accent-hover);
}

.step-title {
  display: block;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.step-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.next-step svg:last-child {
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.next-step:hover svg:last-child {
  color: var(--color-accent);
  transform: translateX(4px);
}

/* Public API & Embed Widget teaser */
.dev-api-teaser {
  background: var(--bg-subtle);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.dev-api-teaser .section-header h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}

.documentation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: start;
}

/* Documentation prose rhythm: generous, consistent heading/paragraph
   spacing for long-form developer content. */
.doc-prose h3 {
  font-size: 1.125rem;
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-md);
}

.doc-prose h3:first-child {
  margin-top: 0;
}

.doc-prose p {
  font-size: 0.9375rem;
  line-height: 1.7;
  margin-bottom: var(--space-md);
}

.doc-prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  color: var(--accent-hover);
}

.endpoint-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  border: 1px solid var(--border);
  background: var(--surface);
  margin-bottom: var(--space-md);
}

.endpoint-list li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--border);
}

.endpoint-list li:last-child {
  border-bottom: none;
}

.endpoint-list code {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--accent-hover);
}

.endpoint-list span {
  font-size: 0.8125rem;
  color: var(--text-faint);
}

@media (max-width: 1024px) {
  .documentation-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .endpoint-list li {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* API at a glance */
.api-status {
  background: var(--color-bg);
  padding: var(--space-xl) 0;
}

.glance-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-md) var(--space-xl);
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.glance-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.glance-facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md) var(--space-xl);
  list-style: none;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.glance-facts code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  color: var(--accent-hover);
}

@media (max-width: 1024px) {
  .docs-grid {
    grid-template-columns: 1fr;
  }

  .docs-sidebar {
    position: static;
  }
}
</style>
