<template>
  <section class="feature-deep-dive section">
    <div class="container">
      <div 
        v-for="(feature, index) in features" 
        :key="feature.id"
        :class="['feature-block', { reversed: index % 2 === 1 }]"
        v-motion-fade-visible
      >
        <div class="feature-content">
          <span class="feature-label" :style="{ color: feature.color }">
            <component :is="feature.icon" :size="16" />
            {{ feature.label }}
          </span>
          <h2>{{ feature.title }}</h2>
          <p class="feature-description">{{ feature.description }}</p>
          
          <ul class="feature-benefits">
            <li v-for="benefit in feature.benefits" :key="benefit">
              <Check :size="18" class="check-icon" />
              {{ benefit }}
            </li>
          </ul>

          <div class="feature-meta" v-if="feature.stats">
            <div 
              v-for="stat in feature.stats" 
              :key="stat.label"
              class="meta-item"
            >
              <span class="meta-value">{{ stat.value }}</span>
              <span class="meta-label">{{ stat.label }}</span>
            </div>
          </div>

          <div class="feature-actions">
            <router-link :to="feature.learnMoreLink" class="btn btn-primary">
              Learn More
              <ArrowRight :size="16" />
            </router-link>
            <router-link :to="feature.docsLink" class="btn btn-secondary">
              <FileText :size="16" />
              Documentation
            </router-link>
          </div>
        </div>

        <div class="feature-visual">
          <!-- Visual Component based on feature type -->
          <div class="visual-container" :style="{ '--accent': feature.color }">
            <!-- Workflow Visual -->
            <template v-if="feature.id === 'workflows'">
              <div class="workflow-visual">
                <div class="workflow-node trigger">
                  <Zap :size="20" />
                  <span>Trigger</span>
                </div>
                <div class="workflow-connector"></div>
                <div class="workflow-node action">
                  <Settings :size="20" />
                  <span>Process</span>
                </div>
                <div class="workflow-connector"></div>
                <div class="workflow-node output">
                  <Send :size="20" />
                  <span>Action</span>
                </div>
              </div>
            </template>

            <!-- Database Visual -->
            <template v-if="feature.id === 'database'">
              <div class="database-visual">
                <div class="db-table">
                  <div class="db-header">
                    <span>Users</span>
                    <Database :size="14" />
                  </div>
                  <div class="db-rows">
                    <div class="db-row">
                      <span class="db-cell id">001</span>
                      <span class="db-cell name">Sarah Chen</span>
                      <span class="db-cell status active">Active</span>
                    </div>
                    <div class="db-row">
                      <span class="db-cell id">002</span>
                      <span class="db-cell name">John Doe</span>
                      <span class="db-cell status active">Active</span>
                    </div>
                    <div class="db-row">
                      <span class="db-cell id">003</span>
                      <span class="db-cell name">Emma Li</span>
                      <span class="db-cell status pending">Pending</span>
                    </div>
                  </div>
                </div>
                <div class="db-relation"></div>
                <div class="db-table small">
                  <div class="db-header">
                    <span>Roles</span>
                    <Shield :size="14" />
                  </div>
                </div>
              </div>
            </template>

            <!-- Analytics Visual -->
            <template v-if="feature.id === 'analytics'">
              <div class="analytics-visual">
                <div class="chart-header">
                  <span>Performance</span>
                  <div class="chart-legend">
                    <span class="legend-item visits">Visits</span>
                    <span class="legend-item conversions">Conversions</span>
                  </div>
                </div>
                <div class="chart-bars">
                  <div v-for="(bar, i) in chartData" :key="i" class="bar-group">
                    <div class="bar visits" :style="{ height: bar.visits + '%' }"></div>
                    <div class="bar conversions" :style="{ height: bar.conversions + '%' }"></div>
                    <span class="bar-label">{{ bar.label }}</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Docs Visual -->
            <template v-if="feature.id === 'docs'">
              <div class="docs-visual">
                <div class="doc-sidebar">
                  <div class="doc-item active">
                    <Folder :size="14" />
                    <span>Getting Started</span>
                  </div>
                  <div class="doc-item">
                    <FileText :size="14" />
                    <span>Installation</span>
                  </div>
                  <div class="doc-item">
                    <FileText :size="14" />
                    <span>Configuration</span>
                  </div>
                  <div class="doc-item">
                    <Folder :size="14" />
                    <span>API Reference</span>
                  </div>
                </div>
                <div class="doc-content">
                  <div class="doc-title"></div>
                  <div class="doc-line"></div>
                  <div class="doc-line short"></div>
                  <div class="doc-line"></div>
                  <div class="doc-code"></div>
                </div>
              </div>
            </template>

            <!-- Security Visual -->
            <template v-if="feature.id === 'security'">
              <div class="security-visual">
                <div class="shield-container">
                  <div class="shield-ring ring-1"></div>
                  <div class="shield-ring ring-2"></div>
                  <div class="shield-ring ring-3"></div>
                  <div class="shield-center">
                    <Lock :size="32" />
                  </div>
                </div>
                <div class="security-badges">
                  <div class="security-badge">SOC 2</div>
                  <div class="security-badge">GDPR</div>
                  <div class="security-badge">HIPAA</div>
                </div>
              </div>
            </template>

            <!-- Collaboration Visual -->
            <template v-if="feature.id === 'collaboration'">
              <div class="collab-visual">
                <div class="collab-users">
                  <div class="collab-avatar" v-for="i in 4" :key="i" :style="{ '--delay': i }">
                    <span>{{ ['SC', 'JD', 'EL', 'MR'][i-1] }}</span>
                  </div>
                </div>
                <div class="collab-cursor" v-for="cursor in cursors" :key="cursor.name" :style="{ top: cursor.y, left: cursor.x, '--cursor-color': cursor.color }">
                  <MousePointer :size="16" />
                  <span class="cursor-label">{{ cursor.name }}</span>
                </div>
                <div class="collab-comment">
                  <span class="comment-author">Sarah</span>
                  <span class="comment-text">Updated the workflow!</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { 
  Check, ArrowRight, FileText, Zap, Settings, Send,
  Database, Shield, BarChart2, Lock, Folder, Users,
  MousePointer
} from 'lucide-vue-next'

const features = [
  {
    id: 'workflows',
    label: 'Automation',
    icon: Zap,
    color: '#f59e0b',
    title: 'Visual Workflow Builder',
    description: 'Create powerful automations without writing code. Drag, drop, connect, and deploy workflows that run 24/7.',
    benefits: [
      'Intuitive drag-and-drop interface',
      '100+ pre-built triggers and actions',
      'Conditional logic and branching',
      'Real-time execution logs'
    ],
    stats: [
      { value: '10x', label: 'Faster than code' },
      { value: '< 50ms', label: 'Avg execution' }
    ],
    learnMoreLink: '/features#workflows',
    docsLink: '/docs#workflows'
  },
  {
    id: 'database',
    label: 'Data',
    icon: Database,
    color: '#22c55e',
    title: 'Flexible Data Layer',
    description: 'A powerful database that adapts to your data. Define custom schemas, create relationships, and query with ease.',
    benefits: [
      'Custom field types and validation',
      'Relational data with linking',
      'Full-text search included',
      'Import/export in any format'
    ],
    stats: [
      { value: 'Unlimited', label: 'Records' },
      { value: '99.99%', label: 'Data durability' }
    ],
    learnMoreLink: '/features#database',
    docsLink: '/docs#database'
  },
  {
    id: 'analytics',
    label: 'Insights',
    icon: BarChart2,
    color: '#6366f1',
    title: 'Built-in Analytics',
    description: 'Understand what\'s working with real-time dashboards, custom reports, and automatic insights.',
    benefits: [
      'Real-time data visualization',
      'Custom dashboards and widgets',
      'Scheduled report delivery',
      'Export to any BI tool'
    ],
    stats: [
      { value: '50+', label: 'Chart types' },
      { value: 'Real-time', label: 'Updates' }
    ],
    learnMoreLink: '/features#analytics',
    docsLink: '/docs#analytics'
  },
  {
    id: 'docs',
    label: 'Knowledge',
    icon: FileText,
    color: '#8b5cf6',
    title: 'Docs & Wiki',
    description: 'A beautiful, searchable knowledge base for your team. Markdown support, version history, and AI-powered search.',
    benefits: [
      'Rich text and Markdown editing',
      'Version history and restore',
      'Embed anything: videos, code, files',
      'AI-powered semantic search'
    ],
    stats: [
      { value: '< 100ms', label: 'Search speed' },
      { value: 'Unlimited', label: 'Pages' }
    ],
    learnMoreLink: '/features#docs',
    docsLink: '/docs#docs'
  },
  {
    id: 'security',
    label: 'Enterprise',
    icon: Shield,
    color: '#ef4444',
    title: 'Enterprise Security',
    description: 'Bank-grade security without the complexity. SSO, audit logs, encryption, and compliance built-in.',
    benefits: [
      'SSO with SAML/OIDC',
      'Role-based access control',
      'End-to-end encryption',
      'SOC 2, GDPR, HIPAA ready'
    ],
    stats: [
      { value: 'SOC 2', label: 'Type II certified' },
      { value: '256-bit', label: 'AES encryption' }
    ],
    learnMoreLink: '/features#security',
    docsLink: '/docs#security'
  },
  {
    id: 'collaboration',
    label: 'Teamwork',
    icon: Users,
    color: '#06b6d4',
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly. See who\'s online, get live updates, and never lose a change.',
    benefits: [
      'Live cursors and presence',
      'Comments and mentions',
      'Real-time sync across devices',
      'Activity feeds and notifications'
    ],
    stats: [
      { value: '< 50ms', label: 'Sync latency' },
      { value: '1000+', label: 'Concurrent users' }
    ],
    learnMoreLink: '/features#collaboration',
    docsLink: '/docs#collaboration'
  }
]

const chartData = [
  { label: 'Mon', visits: 60, conversions: 40 },
  { label: 'Tue', visits: 75, conversions: 55 },
  { label: 'Wed', visits: 85, conversions: 60 },
  { label: 'Thu', visits: 70, conversions: 50 },
  { label: 'Fri', visits: 90, conversions: 70 },
  { label: 'Sat', visits: 65, conversions: 45 },
  { label: 'Sun', visits: 55, conversions: 35 }
]

const cursors = [
  { name: 'Sarah', x: '30%', y: '25%', color: '#f59e0b' },
  { name: 'John', x: '60%', y: '55%', color: '#22c55e' },
  { name: 'Emma', x: '45%', y: '70%', color: '#6366f1' }
]
</script>

<style scoped>
.feature-deep-dive {
  background: var(--color-bg);
}

.feature-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
  align-items: center;
  padding: var(--space-4xl) 0;
  border-bottom: 1px solid var(--color-border-subtle);
}

.feature-block:last-child {
  border-bottom: none;
}

.feature-block.reversed {
  direction: rtl;
}

.feature-block.reversed > * {
  direction: ltr;
}

.feature-content {
  max-width: 520px;
}

.feature-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
}

.feature-content h2 {
  font-size: 2.25rem;
  margin-bottom: var(--space-lg);
}

.feature-description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.feature-benefits {
  list-style: none;
  margin-bottom: var(--space-xl);
}

.feature-benefits li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: var(--space-sm) 0;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.check-icon {
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-meta {
  display: flex;
  gap: var(--space-2xl);
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-xl);
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
}

.meta-label {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.feature-actions {
  display: flex;
  gap: var(--space-md);
}

/* Visuals */
.feature-visual {
  display: flex;
  justify-content: center;
}

.visual-container {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 4/3;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Workflow Visual */
.workflow-visual {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.workflow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: 0.75rem;
  font-weight: 500;
}

.workflow-node.trigger svg { color: #f59e0b; }
.workflow-node.action svg { color: #6366f1; }
.workflow-node.output svg { color: #22c55e; }

.workflow-connector {
  width: 40px;
  height: 2px;
  background: var(--color-border);
  position: relative;
}

.workflow-connector::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: 4px solid transparent;
  border-left-color: var(--color-border);
}

/* Database Visual */
.database-visual {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  width: 100%;
}

.db-table {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.db-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg);
  font-size: 0.75rem;
  font-weight: 600;
}

.db-rows {
  padding: var(--space-xs);
}

.db-row {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.6875rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.db-row:last-child {
  border-bottom: none;
}

.db-cell.id { color: var(--color-text-muted); width: 30px; }
.db-cell.name { flex: 1; }
.db-cell.status {
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: 0.625rem;
}
.db-cell.status.active { background: rgba(34, 197, 94, 0.2); color: var(--color-success); }
.db-cell.status.pending { background: rgba(245, 158, 11, 0.2); color: var(--color-warning); }

.db-table.small {
  max-width: 150px;
}

.db-relation {
  width: 2px;
  height: 20px;
  background: var(--color-border);
  margin-left: var(--space-xl);
}

/* Analytics Visual */
.analytics-visual {
  width: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  font-size: 0.8125rem;
  font-weight: 600;
}

.chart-legend {
  display: flex;
  gap: var(--space-md);
  font-size: 0.6875rem;
  font-weight: 400;
}

.legend-item::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  margin-right: 4px;
}

.legend-item.visits::before { background: var(--color-accent); }
.legend-item.conversions::before { background: var(--color-success); }

.chart-bars {
  display: flex;
  gap: var(--space-sm);
  height: 150px;
  align-items: flex-end;
}

.bar-group {
  flex: 1;
  display: flex;
  gap: 4px;
  align-items: flex-end;
  height: 100%;
  position: relative;
}

.bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  transition: height 0.5s ease;
}

.bar.visits { background: var(--color-accent); }
.bar.conversions { background: var(--color-success); }

.bar-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.625rem;
  color: var(--color-text-muted);
}

/* Docs Visual */
.docs-visual {
  display: flex;
  gap: var(--space-md);
  width: 100%;
  height: 100%;
}

.doc-sidebar {
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-sm);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
}

.doc-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  font-size: 0.625rem;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
}

.doc-item.active {
  background: rgba(99, 102, 241, 0.1);
  color: var(--color-accent);
}

.doc-content {
  flex: 1;
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.doc-title {
  height: 16px;
  width: 60%;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
}

.doc-line {
  height: 8px;
  width: 100%;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
}

.doc-line.short {
  width: 70%;
}

.doc-code {
  height: 60px;
  width: 100%;
  background: #1a1a2e;
  border-radius: var(--radius-sm);
  margin-top: var(--space-sm);
}

/* Security Visual */
.security-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
}

.shield-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.shield-ring {
  position: absolute;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

.ring-1 { inset: 0; animation-delay: 0s; }
.ring-2 { inset: 15px; animation-delay: 0.5s; }
.ring-3 { inset: 30px; animation-delay: 1s; }

@keyframes pulse {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.5); }
}

.shield-center {
  position: absolute;
  inset: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  border-radius: 50%;
  color: white;
}

.security-badges {
  display: flex;
  gap: var(--space-sm);
}

.security-badge {
  padding: 4px 12px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  font-weight: 600;
}

/* Collaboration Visual */
.collab-visual {
  position: relative;
  width: 100%;
  height: 100%;
}

.collab-users {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  display: flex;
}

.collab-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 600;
  color: white;
  border: 2px solid var(--color-bg-card);
  margin-left: -8px;
  animation: fadeIn 0.5s ease calc(var(--delay) * 0.1s) backwards;
}

.collab-avatar:first-child { margin-left: 0; }
.collab-avatar:nth-child(2) { background: #22c55e; }
.collab-avatar:nth-child(3) { background: #f59e0b; }
.collab-avatar:nth-child(4) { background: #ef4444; }

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.collab-cursor {
  position: absolute;
  display: flex;
  align-items: flex-start;
  color: var(--cursor-color);
  animation: cursorMove 3s ease-in-out infinite alternate;
}

.cursor-label {
  padding: 2px 6px;
  background: var(--cursor-color);
  color: white;
  font-size: 0.625rem;
  border-radius: 4px;
  margin-left: -4px;
  margin-top: 14px;
}

@keyframes cursorMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(10px, 15px); }
}

.collab-comment {
  position: absolute;
  bottom: var(--space-xl);
  left: var(--space-xl);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
}

.comment-author {
  font-weight: 600;
  color: var(--color-accent);
  margin-right: var(--space-xs);
}

@media (max-width: 1024px) {
  .feature-block {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }
  
  .feature-block.reversed {
    direction: ltr;
  }
  
  .feature-content {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .feature-content h2 {
    font-size: 1.75rem;
  }
  
  .feature-actions {
    flex-direction: column;
  }
  
  .feature-meta {
    flex-direction: column;
    gap: var(--space-md);
  }
}
</style>
