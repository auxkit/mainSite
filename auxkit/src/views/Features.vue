<template>
  <main class="features-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible>Features</span>
        <h1 v-motion-slide-visible-bottom>Everything you need,<br/>nothing you don't</h1>
        <p class="hero-desc" v-motion-slide-visible-bottom :delay="100">
          Six powerful modules that work independently or together. Build exactly the stack your team needs.
        </p>
      </div>
    </section>

    <!-- Feature Deep Dives -->
    <FeatureDeepDive />

    <!-- Interactive Demo Section -->
    <section class="demo-section section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Interactive Demo</span>
          <h2>See it in action</h2>
          <p>Explore how modules snap together to form your perfect workflow.</p>
        </div>

        <div class="demo-container" v-motion-fade-visible>
          <div class="demo-sidebar">
            <div 
              v-for="(module, index) in demoModules" 
              :key="module.name"
              class="demo-module"
              :class="{ active: activeModule === index }"
              @click="activeModule = index"
            >
              <component :is="module.icon" :size="20" />
              <span>{{ module.name }}</span>
            </div>
          </div>
          <div class="demo-preview">
            <div class="demo-screen">
              <div class="demo-header">
                <div class="demo-dots">
                  <span></span><span></span><span></span>
                </div>
                <span class="demo-title">{{ demoModules[activeModule].name }}</span>
              </div>
              <div class="demo-content">
                <component :is="demoModules[activeModule].icon" :size="48" />
                <p>{{ demoModules[activeModule].preview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Integrations -->
    <section class="integrations-section section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Integrations</span>
          <h2>Connects to everything</h2>
          <p>50+ native integrations with the tools your team already uses.</p>
        </div>

        <div class="integrations-grid">
          <div v-for="n in 12" :key="n" class="integration-item">
            <div class="integration-icon"></div>
          </div>
        </div>

        <div class="text-center mt-2xl">
          <a href="#" class="btn btn-secondary">
            View All Integrations
            <ArrowRight :size="18" />
          </a>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Workflow, Database, ListTodo, Plug2, BarChart3, Zap,
  Check, ArrowRight 
} from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'
import FeatureDeepDive from '../components/FeatureDeepDive.vue'

const activeModule = ref(0)

const features = [
  {
    icon: Workflow,
    title: 'Workflow Engine',
    description: 'Design complex workflows visually. Add conditional logic, parallel paths, approval gates, and automated triggers.',
    color: 'rgba(99, 102, 241, 0.15)',
    highlights: [
      'Drag-and-drop workflow builder',
      'Conditional branching and loops',
      'Approval gates with notifications',
      'Version history and rollback',
      'Real-time execution monitoring'
    ]
  },
  {
    icon: Database,
    title: 'Shared Data Layer',
    description: 'A unified data model that keeps everything in sync. No more copy-pasting between tools or outdated spreadsheets.',
    color: 'rgba(34, 197, 94, 0.15)',
    highlights: [
      'Real-time sync across modules',
      'Flexible schema design',
      'Relationship mapping',
      'Import/export any format',
      'Full audit trail'
    ]
  },
  {
    icon: ListTodo,
    title: 'Task & Ops Manager',
    description: 'Manage work the way you want. Kanban, lists, timeline—all connected to your workflows and data.',
    color: 'rgba(245, 158, 11, 0.15)',
    highlights: [
      'Multiple view types',
      'Dependencies and blockers',
      'Time tracking built-in',
      'Custom fields and statuses',
      'Recurring tasks'
    ]
  },
  {
    icon: Plug2,
    title: 'Integrations Hub',
    description: 'Connect AuxKit to the rest of your stack. Pre-built connectors for 50+ tools, or build your own.',
    color: 'rgba(236, 72, 153, 0.15)',
    highlights: [
      '50+ native integrations',
      'OAuth and API key auth',
      'Webhook support',
      'Custom connector SDK',
      'Data mapping tools'
    ]
  },
  {
    icon: BarChart3,
    title: 'Metrics & Reporting',
    description: 'Track what matters. Build custom dashboards, automate reports, and share insights with stakeholders.',
    color: 'rgba(139, 92, 246, 0.15)',
    highlights: [
      'Custom dashboard builder',
      'Real-time KPI tracking',
      'Scheduled reports',
      'Export to PDF/CSV',
      'Embedded analytics'
    ]
  },
  {
    icon: Zap,
    title: 'Automations',
    description: 'Eliminate repetitive work. Set up triggers, conditions, and actions to automate any process.',
    color: 'rgba(6, 182, 212, 0.15)',
    highlights: [
      'Event-based triggers',
      'Scheduled automations',
      'Multi-step workflows',
      'Error handling',
      'Execution logs'
    ]
  }
]

const demoModules = [
  { name: 'Workflow Engine', icon: Workflow, preview: 'Design and run complex workflows with visual builder' },
  { name: 'Data Layer', icon: Database, preview: 'Unified data model synced in real-time' },
  { name: 'Task Manager', icon: ListTodo, preview: 'Manage work with Kanban, lists, and timelines' },
  { name: 'Integrations', icon: Plug2, preview: 'Connect to 50+ tools instantly' },
  { name: 'Analytics', icon: BarChart3, preview: 'Custom dashboards and real-time KPIs' },
  { name: 'Automations', icon: Zap, preview: 'Trigger-based automation for any process' }
]
</script>

<style scoped>
.features-page {
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

.feature-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
  align-items: center;
  padding: var(--space-4xl) 0;
  border-bottom: 1px solid var(--color-border);
}

.feature-detail:last-child {
  border-bottom: none;
}

.feature-reverse {
  direction: rtl;
}

.feature-reverse > * {
  direction: ltr;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.feature-content h2 {
  font-size: 2rem;
  margin-bottom: var(--space-md);
}

.feature-desc {
  font-size: 1.125rem;
  margin-bottom: var(--space-xl);
}

.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-secondary);
}

.feature-list li svg {
  color: var(--color-success);
  flex-shrink: 0;
}

.feature-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 4/3;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  color: var(--color-accent);
}

/* Demo Section */
.demo-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.demo-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: var(--space-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.demo-sidebar {
  background: var(--color-bg-elevated);
  padding: var(--space-lg);
  border-right: 1px solid var(--color-border);
}

.demo-module {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.demo-module:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.demo-module.active {
  background: var(--color-accent-subtle);
  color: var(--color-accent);
}

.demo-preview {
  padding: var(--space-xl);
}

.demo-screen {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}

.demo-dots {
  display: flex;
  gap: var(--space-xs);
}

.demo-dots span {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-border);
}

.demo-title {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.demo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-4xl);
  color: var(--color-accent);
  text-align: center;
  min-height: 300px;
}

.demo-content p {
  margin-top: var(--space-lg);
  font-size: 1rem;
}

/* Integrations */
.integrations-section {
  background: var(--color-bg);
}

.integrations-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-lg);
}

.integration-item {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.integration-item:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.integration-icon {
  width: 40px;
  height: 40px;
  background: var(--color-text-muted);
  border-radius: var(--radius-md);
  opacity: 0.3;
}

@media (max-width: 1024px) {
  .feature-detail {
    grid-template-columns: 1fr;
  }

  .feature-reverse {
    direction: ltr;
  }

  .demo-container {
    grid-template-columns: 1fr;
  }

  .demo-sidebar {
    display: flex;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-md);
    gap: var(--space-sm);
  }

  .demo-module {
    white-space: nowrap;
  }

  .integrations-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 640px) {
  .integrations-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
