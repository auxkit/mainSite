<template>
  <section class="features section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Features</span>
        <h2>Everything you need, nothing you don't</h2>
        <p>Six modular components that snap together to form your perfect workflow.</p>
      </div>

      <div class="grid grid-3">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="feature-card"
          v-motion-slide-visible-bottom
          :delay="index * 75"
        >
          <div class="feature-icon" :style="{ background: feature.color }">
            <component :is="feature.icon" :size="24" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
          <a href="#" class="feature-link">
            Learn more
            <ArrowRight :size="14" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { 
  Workflow, 
  Database, 
  ListTodo, 
  Plug2, 
  BarChart3, 
  Zap,
  ArrowRight 
} from 'lucide-vue-next'

const features = [
  {
    icon: Workflow,
    title: 'Workflow Engine',
    description: 'Visual workflow builder with conditional logic, parallel paths, and approval gates.',
    color: 'rgba(99, 102, 241, 0.15)'
  },
  {
    icon: Database,
    title: 'Shared Data Layer',
    description: 'Unified data model that syncs across all modules and integrations in real-time.',
    color: 'rgba(34, 197, 94, 0.15)'
  },
  {
    icon: ListTodo,
    title: 'Task & Ops Manager',
    description: 'Kanban, lists, and timeline views with assignments, due dates, and dependencies.',
    color: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Plug2,
    title: 'Integrations Hub',
    description: 'Connect to 50+ tools with pre-built connectors or build your own with our SDK.',
    color: 'rgba(236, 72, 153, 0.15)'
  },
  {
    icon: BarChart3,
    title: 'Metrics & Reporting',
    description: 'Custom dashboards, automated reports, and real-time KPI tracking for your team.',
    color: 'rgba(139, 92, 246, 0.15)'
  },
  {
    icon: Zap,
    title: 'Automations',
    description: 'Trigger-based automations that eliminate repetitive work and reduce errors.',
    color: 'rgba(6, 182, 212, 0.15)'
  }
]
</script>

<style scoped>
.features {
  background: var(--color-bg);
}

.feature-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  transition: all var(--transition-base);
}

.feature-card:hover {
  border-color: var(--color-border);
  background: var(--color-bg-hover);
  transform: translateY(-4px);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.feature-card h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.feature-card p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.feature-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  transition: gap var(--transition-fast);
}

.feature-link:hover {
  gap: var(--space-sm);
}
</style>
