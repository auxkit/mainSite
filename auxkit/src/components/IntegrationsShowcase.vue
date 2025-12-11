<template>
  <section class="integrations section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Integrations</span>
        <h2>Connects to your entire stack</h2>
        <p>AuxKit plays nice with the tools you already use. No rip and replace.</p>
      </div>

      <!-- Integration Categories -->
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
          <div class="integration-footer">
            <span :class="['integration-status', integration.status]">
              <span class="status-dot"></span>
              {{ integration.statusText }}
            </span>
            <button class="integration-action">
              <ExternalLink :size="14" />
            </button>
          </div>
        </div>
      </div>

      <!-- API Section -->
      <div class="api-section" v-motion-fade-visible>
        <div class="api-content">
          <div class="api-text">
            <span class="badge mb-md">Developer Friendly</span>
            <h3>Build your own integrations</h3>
            <p>Full REST & GraphQL APIs, webhooks, and SDKs for JavaScript, Python, Go, and Ruby. Everything is documented and ready to use.</p>
            <div class="api-features">
              <div class="api-feature">
                <Code :size="18" />
                <span>RESTful API</span>
              </div>
              <div class="api-feature">
                <GitBranch :size="18" />
                <span>GraphQL</span>
              </div>
              <div class="api-feature">
                <Webhook :size="18" />
                <span>Webhooks</span>
              </div>
              <div class="api-feature">
                <Package :size="18" />
                <span>SDKs</span>
              </div>
            </div>
            <router-link to="/docs" class="btn btn-secondary mt-lg">
              View API Docs
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
                <span class="code-lang">JavaScript</span>
              </div>
              <pre class="code-content"><code><span class="comment">// Install: npm install @auxkit/sdk</span>

<span class="keyword">import</span> { AuxKit } <span class="keyword">from</span> <span class="string">'@auxkit/sdk'</span>

<span class="keyword">const</span> client = <span class="keyword">new</span> <span class="function">AuxKit</span>({
  <span class="property">apiKey</span>: process.env.AUXKIT_KEY
})

<span class="comment">// Create a workflow</span>
<span class="keyword">const</span> workflow = <span class="keyword">await</span> client.workflows.<span class="function">create</span>({
  <span class="property">name</span>: <span class="string">'Onboarding Flow'</span>,
  <span class="property">trigger</span>: <span class="string">'user.created'</span>,
  <span class="property">steps</span>: [
    { <span class="property">action</span>: <span class="string">'sendEmail'</span>, <span class="property">template</span>: <span class="string">'welcome'</span> },
    { <span class="property">action</span>: <span class="string">'assignRole'</span>, <span class="property">role</span>: <span class="string">'member'</span> },
    { <span class="property">action</span>: <span class="string">'notify'</span>, <span class="property">channel</span>: <span class="string">'#team'</span> }
  ]
})

console.<span class="function">log</span>(<span class="string">`Created:</span> <span class="template">${workflow.id}</span><span class="string">`</span>)</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Partner Badge -->
      <div class="partner-cta" v-motion-fade-visible>
        <div class="partner-content">
          <Blocks :size="32" />
          <div class="partner-text">
            <h4>Build an Integration</h4>
            <p>Join our partner program and list your integration in the marketplace.</p>
          </div>
        </div>
        <a href="#" class="btn btn-secondary">
          Partner Program
          <ArrowRight :size="16" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  ExternalLink, ArrowRight, Code, GitBranch, 
  Webhook, Package, Blocks, Database, MessageSquare,
  CreditCard, Mail, Cloud, BarChart2, Lock
} from 'lucide-vue-next'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All', icon: Blocks },
  { id: 'communication', name: 'Communication', icon: MessageSquare },
  { id: 'data', name: 'Data & Storage', icon: Database },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'analytics', name: 'Analytics', icon: BarChart2 },
  { id: 'security', name: 'Security', icon: Lock }
]

const integrations = [
  {
    name: 'Slack',
    abbr: 'S',
    category: 'Communication',
    categoryId: 'communication',
    color: '#4A154B',
    description: 'Send notifications, create channels, and sync threads directly from AuxKit.',
    features: ['Real-time sync', 'Slash commands', 'Rich formatting'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'Discord',
    abbr: 'D',
    category: 'Communication',
    categoryId: 'communication',
    color: '#5865F2',
    description: 'Connect your community channels and automate moderation workflows.',
    features: ['Bot integration', 'Role sync', 'Webhooks'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'PostgreSQL',
    abbr: 'PG',
    category: 'Data & Storage',
    categoryId: 'data',
    color: '#336791',
    description: 'Direct database connections for read/write operations and data sync.',
    features: ['Direct query', 'Schema sync', 'Triggers'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'MongoDB',
    abbr: 'M',
    category: 'Data & Storage',
    categoryId: 'data',
    color: '#00684A',
    description: 'Native document database integration with full CRUD support.',
    features: ['Document sync', 'Aggregations', 'Change streams'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'Stripe',
    abbr: '$',
    category: 'Payments',
    categoryId: 'payments',
    color: '#635BFF',
    description: 'Payment processing, subscription management, and invoice automation.',
    features: ['Webhooks', 'Checkout', 'Subscriptions'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'Plaid',
    abbr: 'P',
    category: 'Payments',
    categoryId: 'payments',
    color: '#111111',
    description: 'Bank account linking and transaction data for financial workflows.',
    features: ['Bank linking', 'Transactions', 'Balance checks'],
    status: 'beta',
    statusText: 'Beta'
  },
  {
    name: 'Mixpanel',
    abbr: 'MP',
    category: 'Analytics',
    categoryId: 'analytics',
    color: '#7856FF',
    description: 'Track events and sync user properties for product analytics.',
    features: ['Event tracking', 'User profiles', 'Funnels'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'Amplitude',
    abbr: 'A',
    category: 'Analytics',
    categoryId: 'analytics',
    color: '#1E61A0',
    description: 'Behavioral analytics with cohort sync and event streaming.',
    features: ['Cohorts', 'Event export', 'User sync'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'Auth0',
    abbr: 'A0',
    category: 'Security',
    categoryId: 'security',
    color: '#EB5424',
    description: 'Enterprise SSO, user management, and role-based access control.',
    features: ['SSO/SAML', 'User sync', 'MFA'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'Okta',
    abbr: 'O',
    category: 'Security',
    categoryId: 'security',
    color: '#007DC1',
    description: 'Identity management with SCIM provisioning and directory sync.',
    features: ['SCIM', 'Directory sync', 'SSO'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'AWS S3',
    abbr: 'S3',
    category: 'Data & Storage',
    categoryId: 'data',
    color: '#FF9900',
    description: 'File storage, asset management, and automated backup workflows.',
    features: ['File uploads', 'Presigned URLs', 'Lifecycle'],
    status: 'available',
    statusText: 'Available'
  },
  {
    name: 'SendGrid',
    abbr: 'SG',
    category: 'Communication',
    categoryId: 'communication',
    color: '#1A82E2',
    description: 'Transactional emails, marketing campaigns, and delivery tracking.',
    features: ['Templates', 'Analytics', 'Inbound parse'],
    status: 'available',
    statusText: 'Available'
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
  grid-template-columns: repeat(4, 1fr);
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
  margin-bottom: var(--space-lg);
}

.feature-tag {
  padding: 2px var(--space-sm);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}

.integration-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.integration-status {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.75rem;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-success);
}

.integration-status.beta .status-dot {
  background: var(--color-warning);
}

.integration-action {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.integration-action:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* API Section */
.api-section {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-3xl);
  margin-bottom: var(--space-3xl);
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
.keyword { color: #ff79c6; }
.string { color: #f1fa8c; }
.template { color: #8be9fd; }
.function { color: #50fa7b; }
.property { color: #8be9fd; }

/* Partner CTA */
.partner-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl) var(--space-2xl);
}

.partner-content {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.partner-content svg {
  color: var(--color-accent);
}

.partner-text h4 {
  font-size: 1.0625rem;
  margin-bottom: 4px;
}

.partner-text p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

@media (max-width: 1200px) {
  .integrations-grid {
    grid-template-columns: repeat(3, 1fr);
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
    grid-template-columns: repeat(2, 1fr);
  }
  
  .partner-cta {
    flex-direction: column;
    text-align: center;
    gap: var(--space-xl);
  }
  
  .partner-content {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .integrations-grid {
    grid-template-columns: 1fr;
  }
  
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
