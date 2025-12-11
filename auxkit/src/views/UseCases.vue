<template>
  <main class="use-cases-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible>Use Cases</span>
        <h1 v-motion-slide-visible-bottom>Built for how you<br/>actually work</h1>
        <p class="hero-desc" v-motion-slide-visible-bottom :delay="100">
          See how teams across industries use AuxKit to eliminate chaos and ship faster.
        </p>
      </div>
    </section>

    <!-- Industry Filter -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-tabs">
          <button 
            v-for="industry in industries" 
            :key="industry.id"
            class="filter-tab"
            :class="{ active: activeIndustry === industry.id }"
            @click="activeIndustry = industry.id"
          >
            <component :is="industry.icon" :size="18" />
            {{ industry.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Use Case Content -->
    <section class="use-case-content section">
      <div class="container">
        <Transition name="fade" mode="out-in">
          <div :key="activeIndustry" class="use-case-grid">
            <div class="use-case-main" v-motion-slide-visible-left>
              <h2>{{ currentIndustry.title }}</h2>
              <p class="use-case-desc">{{ currentIndustry.description }}</p>

              <div class="pain-points">
                <h3>Common Pain Points</h3>
                <ul>
                  <li v-for="pain in currentIndustry.painPoints" :key="pain">
                    <X :size="16" />
                    {{ pain }}
                  </li>
                </ul>
              </div>

              <div class="solution-points">
                <h3>How AuxKit Helps</h3>
                <ul>
                  <li v-for="solution in currentIndustry.solutions" :key="solution">
                    <Check :size="16" />
                    {{ solution }}
                  </li>
                </ul>
              </div>

              <div class="recommended-modules">
                <h3>Recommended Modules</h3>
                <div class="module-tags">
                  <span v-for="mod in currentIndustry.modules" :key="mod" class="module-tag">
                    {{ mod }}
                  </span>
                </div>
              </div>
            </div>

            <div class="use-case-visual" v-motion-slide-visible-right>
              <div class="workflow-diagram">
                <div class="diagram-header">
                  <span>Example Workflow</span>
                </div>
                <div class="diagram-content">
                  <div v-for="(step, index) in currentIndustry.workflowSteps" :key="index" class="diagram-step">
                    <div class="step-node">{{ index + 1 }}</div>
                    <span>{{ step }}</span>
                  </div>
                </div>
              </div>

              <div class="quote-card" v-if="currentIndustry.quote">
                <p>"{{ currentIndustry.quote.text }}"</p>
                <div class="quote-author">
                  <span class="author-name">{{ currentIndustry.quote.author }}</span>
                  <span class="author-role">{{ currentIndustry.quote.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Case Studies -->
    <section class="case-studies section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Case Studies</span>
          <h2>Real results from real teams</h2>
          <p>See the measurable impact AuxKit has made for companies like yours.</p>
        </div>

        <div class="grid grid-3">
          <div 
            v-for="(study, index) in caseStudies" 
            :key="study.company"
            class="case-study-card"
            v-motion-slide-visible-bottom
            :delay="index * 100"
          >
            <div class="study-header">
              <div class="company-logo">{{ study.company.charAt(0) }}</div>
              <div>
                <h4>{{ study.company }}</h4>
                <span>{{ study.industry }}</span>
              </div>
            </div>
            <p class="study-summary">{{ study.summary }}</p>
            <div class="study-metrics">
              <div v-for="metric in study.metrics" :key="metric.label" class="metric">
                <span class="metric-value">{{ metric.value }}</span>
                <span class="metric-label">{{ metric.label }}</span>
              </div>
            </div>
            <a href="#" class="btn btn-ghost">
              Read Case Study
              <ArrowRight :size="16" />
            </a>
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
  Code2, Settings2, Palette, Headphones, BarChart2,
  X, Check, ArrowRight 
} from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'

const activeIndustry = ref('product')

const industries = [
  { id: 'product', name: 'Product & Engineering', icon: Code2 },
  { id: 'operations', name: 'Operations', icon: Settings2 },
  { id: 'creative', name: 'Creative/Marketing', icon: Palette },
  { id: 'support', name: 'Customer Support', icon: Headphones },
  { id: 'leadership', name: 'Leadership', icon: BarChart2 }
]

const industryData = {
  product: {
    title: 'Product & Engineering',
    description: 'Ship faster with workflows that connect planning, development, and release.',
    painPoints: [
      'Disconnected tools for planning, dev, and tracking',
      'Manual status updates across systems',
      'Lack of visibility into sprint progress',
      'Context switching between multiple apps'
    ],
    solutions: [
      'Unified workspace for specs, tasks, and code',
      'Automated status syncing with GitHub/GitLab',
      'Real-time sprint dashboards',
      'Integration with your entire dev stack'
    ],
    modules: ['Workflow Engine', 'Task Manager', 'Integrations Hub', 'Metrics'],
    workflowSteps: ['Spec Created', 'Task Assigned', 'In Development', 'Code Review', 'Deployed'],
    quote: {
      text: 'We cut our sprint planning time in half and finally have visibility into what\'s actually shipping.',
      author: 'Alex Kim',
      role: 'Engineering Manager'
    }
  },
  operations: {
    title: 'Operations',
    description: 'Streamline processes, automate handoffs, and keep everything running smoothly.',
    painPoints: [
      'Manual processes that eat up hours',
      'No visibility into bottlenecks',
      'Inconsistent handoffs between teams',
      'Scattered documentation and SOPs'
    ],
    solutions: [
      'Automated workflows for repetitive tasks',
      'Real-time process monitoring',
      'Standardized handoff templates',
      'Centralized knowledge base'
    ],
    modules: ['Automations', 'Workflow Engine', 'Data Layer', 'Metrics'],
    workflowSteps: ['Request Received', 'Auto-Routed', 'Processing', 'Review', 'Complete'],
    quote: {
      text: 'AuxKit helped us automate 80% of our manual processes. Our team can finally focus on strategic work.',
      author: 'Maria Santos',
      role: 'Head of Operations'
    }
  },
  creative: {
    title: 'Creative & Marketing',
    description: 'Manage campaigns, creative assets, and approvals without the chaos.',
    painPoints: [
      'Assets scattered across drives and channels',
      'Unclear approval workflows',
      'Missed deadlines due to poor visibility',
      'Difficulty tracking campaign performance'
    ],
    solutions: [
      'Centralized asset management',
      'Clear approval chains with notifications',
      'Campaign calendars with dependencies',
      'Integrated performance dashboards'
    ],
    modules: ['Task Manager', 'Data Layer', 'Automations', 'Metrics'],
    workflowSteps: ['Brief Created', 'In Design', 'Review', 'Approved', 'Published'],
    quote: {
      text: 'Finally, our creative team and stakeholders are on the same page. Approvals that took days now take hours.',
      author: 'Jordan Lee',
      role: 'Creative Director'
    }
  },
  support: {
    title: 'Customer Support',
    description: 'Resolve issues faster with connected workflows and automated escalations.',
    painPoints: [
      'Tickets falling through the cracks',
      'No visibility into resolution trends',
      'Manual escalation processes',
      'Disconnected from product feedback'
    ],
    solutions: [
      'Smart ticket routing and prioritization',
      'Automated escalation rules',
      'Real-time support dashboards',
      'Direct integration with product backlog'
    ],
    modules: ['Automations', 'Integrations Hub', 'Workflow Engine', 'Metrics'],
    workflowSteps: ['Ticket Created', 'Auto-Categorized', 'Assigned', 'Resolved', 'Feedback Logged'],
    quote: {
      text: 'Response times dropped 40% and we finally have data to drive our product improvements.',
      author: 'Chris Parker',
      role: 'Support Lead'
    }
  },
  leadership: {
    title: 'Leadership',
    description: 'Get the visibility you need without micromanaging. Make decisions with real data.',
    painPoints: [
      'No single source of truth',
      'Status updates require meetings',
      'Difficult to identify blockers early',
      'Reports are always outdated'
    ],
    solutions: [
      'Executive dashboards updated in real-time',
      'Automated weekly/monthly reports',
      'Early warning system for blockers',
      'Cross-team visibility'
    ],
    modules: ['Metrics', 'Data Layer', 'Automations'],
    workflowSteps: ['Data Collected', 'Aggregated', 'Dashboard Updated', 'Insights Generated'],
    quote: {
      text: 'I finally have a clear picture of what\'s happening across all teams without asking for status updates.',
      author: 'Sarah Thompson',
      role: 'VP of Product'
    }
  }
}

const currentIndustry = computed(() => industryData[activeIndustry.value])

const caseStudies = [
  {
    company: 'Acme Corp',
    industry: 'SaaS',
    summary: 'Reduced project delivery time by 40% by consolidating tools and automating handoffs.',
    metrics: [
      { value: '40%', label: 'Faster Delivery' },
      { value: '3→1', label: 'Tools Consolidated' }
    ]
  },
  {
    company: 'TechStart',
    industry: 'Startup',
    summary: 'Scaled from 10 to 50 employees without adding ops overhead using AuxKit automations.',
    metrics: [
      { value: '5x', label: 'Team Growth' },
      { value: '0', label: 'Added Ops Hires' }
    ]
  },
  {
    company: 'Enterprise Co',
    industry: 'Enterprise',
    summary: 'Achieved SOC 2 compliance and cut audit prep time from weeks to days.',
    metrics: [
      { value: '85%', label: 'Audit Time Saved' },
      { value: 'SOC 2', label: 'Compliant' }
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

/* Use Case Content */
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
  margin-bottom: var(--space-xl);
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
}

.diagram-step span {
  font-size: 0.9375rem;
  color: var(--color-text-primary);
}

/* Quote Card */
.quote-card {
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.quote-card p {
  font-size: 1rem;
  font-style: italic;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.quote-author {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--color-text-primary);
}

.author-role {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

/* Case Studies */
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

.company-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: var(--radius-lg);
}

.study-header h4 {
  font-size: 1.125rem;
  margin-bottom: var(--space-xs);
}

.study-header span {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.study-summary {
  font-size: 0.9375rem;
  margin-bottom: var(--space-lg);
}

.study-metrics {
  display: flex;
  gap: var(--space-xl);
  margin-bottom: var(--space-lg);
  padding: var(--space-lg);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
}

.metric {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
}

.metric-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
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
