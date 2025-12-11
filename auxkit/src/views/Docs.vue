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
                Welcome to AuxKit! This guide will help you get up and running in minutes.
              </p>

              <div class="code-block">
                <div class="code-header">
                  <span>Install AuxKit CLI</span>
                  <button class="copy-btn">
                    <Copy :size="16" />
                  </button>
                </div>
                <pre><code>npm install -g @auxkit/cli</code></pre>
              </div>

              <div class="code-block">
                <div class="code-header">
                  <span>Initialize your project</span>
                  <button class="copy-btn">
                    <Copy :size="16" />
                  </button>
                </div>
                <pre><code>auxkit init my-project
cd my-project
auxkit dev</code></pre>
              </div>

              <h3>Next Steps</h3>
              <div class="next-steps">
                <a href="#" class="next-step">
                  <FileText :size="20" />
                  <div>
                    <span class="step-title">Read the Concepts Guide</span>
                    <span class="step-desc">Understand AuxKit's core architecture</span>
                  </div>
                  <ArrowRight :size="16" />
                </a>
                <a href="#" class="next-step">
                  <Code :size="20" />
                  <div>
                    <span class="step-title">Explore the API</span>
                    <span class="step-desc">Full reference for all endpoints</span>
                  </div>
                  <ArrowRight :size="16" />
                </a>
                <a href="#" class="next-step">
                  <Puzzle :size="20" />
                  <div>
                    <span class="step-title">Build Your First Workflow</span>
                    <span class="step-desc">Hands-on tutorial to get started</span>
                  </div>
                  <ArrowRight :size="16" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- API Status -->
    <section class="api-status section">
      <div class="container">
        <div class="status-bar">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span>All systems operational</span>
          </div>
          <a href="#" class="status-link">
            View status page
            <ExternalLink :size="14" />
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { 
  Search, ArrowRight, BookOpen, Code, Plug2, FileText,
  Copy, Puzzle, ExternalLink, Rocket, Zap
} from 'lucide-vue-next'

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
    icon: Plug2,
    title: 'Integrations',
    description: 'Connect AuxKit to your favorite tools and services.',
    color: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Zap,
    title: 'SDK & Libraries',
    description: 'Official SDKs for JavaScript, Python, Go, and more.',
    color: 'rgba(236, 72, 153, 0.15)'
  }
]

const docSections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Quick Start', 'Core Concepts', 'Installation']
  },
  {
    title: 'Modules',
    items: ['Workflow Engine', 'Data Layer', 'Task Manager', 'Automations', 'Integrations', 'Metrics']
  },
  {
    title: 'API Reference',
    items: ['Authentication', 'Workflows', 'Data', 'Tasks', 'Automations', 'Webhooks']
  },
  {
    title: 'Guides',
    items: ['Building Workflows', 'Custom Integrations', 'Automation Recipes', 'Best Practices']
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

/* Next Steps */
.next-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.next-step {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.next-step:hover {
  border-color: var(--color-accent);
  background: var(--color-bg-hover);
}

.next-step svg:first-child {
  color: var(--color-accent);
  flex-shrink: 0;
}

.next-step > div {
  flex: 1;
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

/* API Status */
.api-status {
  background: var(--color-bg);
  padding: var(--space-xl) 0;
}

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--color-success);
  border-radius: var(--radius-full);
  animation: pulse 2s ease-in-out infinite;
}

.status-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.status-link:hover {
  color: var(--color-text-primary);
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
