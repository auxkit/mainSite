<template>
  <section class="integrations section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Integrations</span>
        <h2>Works with what you already have</h2>
        <p>AuxKit isn't a platform you migrate onto. It's a storefront that sits on top of whatever you already run.</p>
      </div>

      <!-- Category filter -->
      <div class="integration-filters" v-motion-fade-visible>
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['filter-btn', { active: activeCategory === cat.id }]"
          @click="activeCategory = cat.id"
        >
          <component :is="cat.icon" :size="16" />
          {{ cat.name }}
        </button>
      </div>

      <!-- Integration Grid -->
      <div class="integrations-grid">
        <div
          v-for="(integration, index) in filteredIntegrations"
          :key="integration.name"
          class="integration-card"
          v-motion-slide-visible-bottom
          :delay="index * 50"
        >
          <div class="integration-header">
            <div class="integration-logo" :style="{ background: integration.color }">
              <span>{{ integration.abbr }}</span>
            </div>
            <div class="integration-info">
              <h4>{{ integration.name }}</h4>
              <span class="integration-category">{{ integration.category }}</span>
            </div>
          </div>
          <p class="integration-description">{{ integration.description }}</p>
          <div class="integration-features">
            <span v-for="feature in integration.features" :key="feature" class="feature-tag">
              {{ feature }}
            </span>
          </div>
        </div>
      </div>

      <!-- API Section -->
      <div class="api-section" v-motion-fade-visible>
        <div class="api-content">
          <div class="api-text">
            <span class="badge mb-md">Developer Friendly</span>
            <h3>Build your own storefront on the API</h3>
            <p>
              No SDK required — it's plain HTTPS and one script tag. Public endpoints are
              read-only plus a checkout action, authorized with a Bearer <code>ak_</code> key.
            </p>
            <div class="api-features">
              <div class="api-feature">
                <Code :size="18" />
                <span>Bearer ak_ keys</span>
              </div>
              <div class="api-feature">
                <Gauge :size="18" />
                <span>60 req/min</span>
              </div>
              <div class="api-feature">
                <ShieldCheck :size="18" />
                <span>Domain-restricted</span>
              </div>
              <div class="api-feature">
                <Clock :size="18" />
                <span>1-year expiry</span>
              </div>
            </div>
            <router-link to="/docs" class="btn btn-secondary mt-lg">
              Read the API docs
              <ArrowRight :size="16" />
            </router-link>
          </div>
          <div class="api-preview">
            <div class="code-window">
              <div class="code-header">
                <div class="code-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span class="code-lang">bash</span>
              </div>
              <pre class="code-content"><code><span class="comment"># List published packs — no SDK, just HTTPS</span>
<span class="function">curl</span> -H <span class="string">'Authorization: Bearer ak_YOUR_KEY'</span> \
  https://api.example.com/public/packs</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  ArrowRight, Code, Gauge, ShieldCheck, Clock,
  Blocks, CreditCard, Globe
} from 'lucide-vue-next'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All', icon: Blocks },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'website', name: 'Your website', icon: Globe },
  { id: 'developers', name: 'Developers', icon: Code }
]

const integrations = [
  {
    name: 'Stripe',
    abbr: 'S',
    category: 'Payments',
    categoryId: 'payments',
    color: '#635BFF',
    description: 'The only third-party integration in AuxKit. Connect your own Stripe account and sales settle directly to you — AuxKit never holds your money.',
    features: ['Connect onboarding', 'Direct charges', 'Refund handling', 'Payouts']
  },
  {
    name: 'Static sites & GitHub Pages',
    abbr: 'GH',
    category: 'Your website',
    categoryId: 'website',
    color: '#24292e',
    description: 'Drop the script tag into any static HTML page — anywhere you can paste a script tag.',
    features: ['One script tag', 'No build step']
  },
  {
    name: 'WordPress & site builders',
    abbr: 'W',
    category: 'Your website',
    categoryId: 'website',
    color: '#21759b',
    description: 'Paste the same snippet into a custom HTML block on WordPress, Squarespace, Webflow, or Wix.',
    features: ['Custom HTML block', 'No plugin required']
  },
  {
    name: 'Your custom site',
    abbr: '{ }',
    category: 'Your website',
    categoryId: 'website',
    color: '#6366f1',
    description: 'Works on any page that accepts a script tag — React, Vue, plain HTML, whatever you already run.',
    features: ['Framework-agnostic', 'Zero dependencies']
  },
  {
    name: 'REST API',
    abbr: 'API',
    category: 'Developers',
    categoryId: 'developers',
    color: '#111111',
    description: 'Read-only public endpoints plus a checkout action, authorized with a Bearer ak_ key. Build a fully custom storefront on top.',
    features: ['60 req/min', 'Domain-restricted', '1-year expiry']
  }
]

const filteredIntegrations = computed(() => {
  if (activeCategory.value === 'all') {
    return integrations
  }
  return integrations.filter(i => i.categoryId === activeCategory.value)
})
</script>

<style scoped>
.integrations {
  background: var(--color-bg);
}

/* Filters */
.integration-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
  margin-bottom: var(--space-3xl);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

.filter-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}

/* Grid */
.integrations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-4xl);
}

.integration-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-base);
}

.integration-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.integration-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.integration-logo {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
}

.integration-info h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.integration-category {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.integration-description {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: var(--space-md);
  flex: 1;
}

.integration-features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.feature-tag {
  padding: 2px var(--space-sm);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}

/* API Section */
.api-section {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-3xl);
}

.api-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-3xl);
  align-items: center;
}

.api-text h3 {
  font-size: 1.75rem;
  margin-bottom: var(--space-md);
}

.api-text p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.api-text code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--color-accent-hover);
}

.api-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

.api-feature {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.api-feature svg {
  color: var(--color-accent);
}

/* Code Preview */
.code-window {
  background: #0d0d0d;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--color-border);
}

.code-dots {
  display: flex;
  gap: 6px;
}

.code-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
}

.code-dots span:nth-child(1) { background: #ff5f57; }
.code-dots span:nth-child(2) { background: #ffbd2e; }
.code-dots span:nth-child(3) { background: #28ca42; }

.code-lang {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.code-content {
  padding: var(--space-xl);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-content code {
  color: #e6e6e6;
}

.comment { color: #6a737d; }
.function { color: #50fa7b; }
.string { color: #f1fa8c; }

@media (max-width: 1200px) {
  .integrations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .api-content {
    grid-template-columns: 1fr;
  }

  .api-preview {
    order: -1;
  }
}

@media (max-width: 768px) {
  .integrations-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .integration-filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: var(--space-sm);
  }

  .filter-btn {
    flex-shrink: 0;
  }
}
</style>
