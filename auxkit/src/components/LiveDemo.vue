<template>
  <section class="live-demo section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Interactive Demo</span>
        <h2>See the magic happen</h2>
        <p>Build a complete workflow in seconds. Click through to experience AuxKit.</p>
      </div>

      <div class="demo-wrapper" v-motion-fade-visible>
        <!-- Demo Controls -->
        <div class="demo-tabs">
          <button 
            v-for="tab in demoTabs" 
            :key="tab.id"
            class="demo-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" :size="18" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Demo Screen -->
        <div class="demo-screen">
          <div class="screen-header">
            <div class="window-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="screen-title">
              <component :is="currentTab.icon" :size="16" />
              {{ currentTab.label }} — AuxKit
            </div>
            <div class="screen-actions">
              <button class="action-btn">
                <Share2 :size="14" />
              </button>
              <button class="action-btn">
                <Maximize2 :size="14" />
              </button>
            </div>
          </div>

          <div class="screen-content">
            <!-- Workflow Demo -->
            <div v-if="activeTab === 'workflow'" class="demo-workflow">
              <div class="workflow-sidebar">
                <h4>Nodes</h4>
                <div 
                  v-for="node in workflowNodes" 
                  :key="node.id"
                  class="sidebar-node"
                  draggable="true"
                  @click="addNode(node)"
                >
                  <component :is="node.icon" :size="16" />
                  {{ node.label }}
                </div>
              </div>
              <div class="workflow-canvas">
                <div class="canvas-hint" v-if="placedNodes.length === 0">
                  <MousePointer :size="24" />
                  <span>Click nodes from the sidebar to build your workflow</span>
                </div>
                <TransitionGroup name="node-list" tag="div" class="placed-nodes">
                  <div 
                    v-for="(node, index) in placedNodes" 
                    :key="node.id + '-' + index"
                    class="placed-node"
                    :class="{ connected: index > 0 }"
                  >
                    <div class="node-connector" v-if="index > 0"></div>
                    <div class="node-card">
                      <component :is="node.icon" :size="20" />
                      <span>{{ node.label }}</span>
                      <button class="node-remove" @click="removeNode(index)">
                        <X :size="12" />
                      </button>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
              <div class="workflow-config" v-if="placedNodes.length > 0">
                <h4>Workflow Config</h4>
                <div class="config-item">
                  <label>Name</label>
                  <input type="text" v-model="workflowName" placeholder="My Workflow" />
                </div>
                <div class="config-item">
                  <label>Trigger</label>
                  <select>
                    <option>On form submit</option>
                    <option>On schedule</option>
                    <option>Manual</option>
                  </select>
                </div>
                <button class="btn btn-primary btn-sm" @click="runWorkflow">
                  <Play :size="14" />
                  Run Workflow
                </button>
              </div>
            </div>

            <!-- Data Demo -->
            <div v-if="activeTab === 'data'" class="demo-data">
              <div class="data-table">
                <div class="table-header">
                  <div class="header-cell">Name</div>
                  <div class="header-cell">Status</div>
                  <div class="header-cell">Priority</div>
                  <div class="header-cell">Assigned</div>
                  <div class="header-cell">Due Date</div>
                </div>
                <div 
                  v-for="row in dataRows" 
                  :key="row.id"
                  class="table-row"
                  :class="{ selected: selectedRow === row.id }"
                  @click="selectedRow = row.id"
                >
                  <div class="cell">{{ row.name }}</div>
                  <div class="cell">
                    <span class="status-badge" :class="row.status.toLowerCase()">
                      {{ row.status }}
                    </span>
                  </div>
                  <div class="cell">
                    <span class="priority-indicator" :class="row.priority.toLowerCase()"></span>
                    {{ row.priority }}
                  </div>
                  <div class="cell">
                    <div class="avatar">{{ row.assigned.charAt(0) }}</div>
                    {{ row.assigned }}
                  </div>
                  <div class="cell">{{ row.dueDate }}</div>
                </div>
              </div>
              <div class="data-actions">
                <button class="btn btn-secondary btn-sm">
                  <Plus :size="14" />
                  Add Row
                </button>
                <button class="btn btn-ghost btn-sm">
                  <Filter :size="14" />
                  Filter
                </button>
                <button class="btn btn-ghost btn-sm">
                  <Download :size="14" />
                  Export
                </button>
              </div>
            </div>

            <!-- Automations Demo -->
            <div v-if="activeTab === 'automations'" class="demo-automations">
              <div class="automation-builder">
                <div class="trigger-section">
                  <div class="section-label">When this happens...</div>
                  <div class="trigger-card" :class="{ active: selectedTrigger }" @click="selectedTrigger = !selectedTrigger">
                    <Zap :size="20" />
                    <div class="trigger-info">
                      <span class="trigger-title">New form submission</span>
                      <span class="trigger-desc">Triggers when a user submits a form</span>
                    </div>
                    <ChevronRight :size="16" />
                  </div>
                </div>

                <div class="connector-line" v-if="selectedTrigger">
                  <div class="line"></div>
                  <div class="plus-btn">
                    <Plus :size="16" />
                  </div>
                </div>

                <div class="actions-section" v-if="selectedTrigger">
                  <div class="section-label">Do this...</div>
                  <div 
                    v-for="action in automationActions" 
                    :key="action.id"
                    class="action-card"
                    :class="{ active: selectedActions.includes(action.id) }"
                    @click="toggleAction(action.id)"
                  >
                    <component :is="action.icon" :size="20" />
                    <div class="action-info">
                      <span class="action-title">{{ action.title }}</span>
                      <span class="action-desc">{{ action.desc }}</span>
                    </div>
                    <div class="action-check">
                      <Check :size="16" v-if="selectedActions.includes(action.id)" />
                    </div>
                  </div>
                </div>

                <div class="automation-preview" v-if="selectedActions.length > 0">
                  <div class="preview-label">Preview</div>
                  <div class="preview-flow">
                    <span class="flow-item">Form Submit</span>
                    <ArrowRight :size="14" />
                    <span 
                      v-for="id in selectedActions" 
                      :key="id"
                      class="flow-item"
                    >
                      {{ automationActions.find(a => a.id === id)?.title }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Status Bar -->
          <div class="screen-footer">
            <div class="status-left">
              <span class="status-dot online"></span>
              Live Preview
            </div>
            <div class="status-center">
              <span v-if="activeTab === 'workflow'">{{ placedNodes.length }} nodes</span>
              <span v-if="activeTab === 'data'">{{ dataRows.length }} records</span>
              <span v-if="activeTab === 'automations'">{{ selectedActions.length }} actions</span>
            </div>
            <div class="status-right">
              <kbd>⌘</kbd> + <kbd>S</kbd> to save
            </div>
          </div>
        </div>

        <!-- Demo CTA -->
        <div class="demo-cta">
          <p>This is just a preview. The real thing is even better.</p>
          <router-link to="/pricing" class="btn btn-primary">
            Try the Full Experience
            <ArrowRight :size="18" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Workflow, Database, Zap, Share2, Maximize2, MousePointer, X, Play,
  Plus, Filter, Download, ChevronRight, Check, ArrowRight,
  Mail, Bell, FileText, Users, Clock, GitBranch
} from 'lucide-vue-next'

const activeTab = ref('workflow')
const workflowName = ref('')
const selectedRow = ref(null)
const selectedTrigger = ref(false)
const selectedActions = ref([])

const demoTabs = [
  { id: 'workflow', label: 'Workflow Builder', icon: Workflow },
  { id: 'data', label: 'Data Layer', icon: Database },
  { id: 'automations', label: 'Automations', icon: Zap }
]

const currentTab = computed(() => demoTabs.find(t => t.id === activeTab.value))

const workflowNodes = [
  { id: 'trigger', label: 'Trigger', icon: Zap },
  { id: 'email', label: 'Send Email', icon: Mail },
  { id: 'notify', label: 'Notification', icon: Bell },
  { id: 'create', label: 'Create Record', icon: FileText },
  { id: 'assign', label: 'Assign Task', icon: Users },
  { id: 'delay', label: 'Delay', icon: Clock },
  { id: 'branch', label: 'Condition', icon: GitBranch }
]

const placedNodes = ref([])

const addNode = (node) => {
  placedNodes.value.push({ ...node })
}

const removeNode = (index) => {
  placedNodes.value.splice(index, 1)
}

const runWorkflow = () => {
  // Simulate workflow run
  alert('Workflow executed! (In the real app, this would run your workflow)')
}

const dataRows = [
  { id: 1, name: 'Website Redesign', status: 'Active', priority: 'High', assigned: 'Sarah', dueDate: 'Dec 15' },
  { id: 2, name: 'API Integration', status: 'Pending', priority: 'Medium', assigned: 'Alex', dueDate: 'Dec 18' },
  { id: 3, name: 'User Research', status: 'Complete', priority: 'Low', assigned: 'Jordan', dueDate: 'Dec 10' },
  { id: 4, name: 'Performance Audit', status: 'Active', priority: 'High', assigned: 'Taylor', dueDate: 'Dec 20' }
]

const automationActions = [
  { id: 'email', title: 'Send Email', desc: 'Send a notification email', icon: Mail },
  { id: 'notify', title: 'Push Notification', desc: 'Send to Slack or Teams', icon: Bell },
  { id: 'record', title: 'Create Record', desc: 'Add to your data layer', icon: FileText },
  { id: 'assign', title: 'Assign Task', desc: 'Create and assign a task', icon: Users }
]

const toggleAction = (id) => {
  const index = selectedActions.value.indexOf(id)
  if (index > -1) {
    selectedActions.value.splice(index, 1)
  } else {
    selectedActions.value.push(id)
  }
}
</script>

<style scoped>
.live-demo {
  background: var(--color-bg);
}

.demo-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

/* Tabs */
.demo-tabs {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  padding: var(--space-sm);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.demo-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.demo-tab:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.demo-tab.active {
  background: var(--color-accent);
  color: white;
}

/* Screen */
.demo-screen {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.screen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}

.window-controls {
  display: flex;
  gap: var(--space-sm);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #22c55e; }

.screen-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.screen-actions {
  display: flex;
  gap: var(--space-xs);
}

.action-btn {
  padding: var(--space-xs);
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.screen-content {
  min-height: 400px;
}

/* Workflow Demo */
.demo-workflow {
  display: grid;
  grid-template-columns: 180px 1fr 200px;
  height: 400px;
}

.workflow-sidebar {
  padding: var(--space-lg);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}

.workflow-sidebar h4 {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
}

.sidebar-node {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  margin-bottom: var(--space-sm);
  transition: all var(--transition-fast);
}

.sidebar-node:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateX(4px);
}

.workflow-canvas {
  padding: var(--space-xl);
  background: var(--color-bg);
  overflow-y: auto;
}

.canvas-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: var(--space-md);
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.placed-nodes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.placed-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-connector {
  width: 2px;
  height: 20px;
  background: var(--color-accent);
  margin-bottom: var(--space-sm);
}

.node-card {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-md);
  color: var(--color-accent);
  position: relative;
}

.node-remove {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-error);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.node-card:hover .node-remove {
  opacity: 1;
}

.workflow-config {
  padding: var(--space-lg);
  border-left: 1px solid var(--color-border);
}

.workflow-config h4 {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-lg);
}

.config-item {
  margin-bottom: var(--space-md);
}

.config-item label {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.config-item input,
.config-item select {
  width: 100%;
  padding: var(--space-sm);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--color-text-primary);
  outline: none;
}

.config-item input:focus,
.config-item select:focus {
  border-color: var(--color-accent);
}

/* Data Demo */
.demo-data {
  padding: var(--space-lg);
}

.data-table {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}

.header-cell {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border-subtle);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.table-row:hover {
  background: var(--color-bg-hover);
}

.table-row.selected {
  background: var(--color-accent-subtle);
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.status-badge {
  padding: 2px var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-badge.complete {
  background: rgba(99, 102, 241, 0.1);
  color: var(--color-accent);
}

.priority-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.priority-indicator.high { background: #ef4444; }
.priority-indicator.medium { background: #f59e0b; }
.priority-indicator.low { background: #22c55e; }

.avatar {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 50%;
}

.data-actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

/* Automations Demo */
.demo-automations {
  padding: var(--space-xl);
}

.automation-builder {
  max-width: 500px;
  margin: 0 auto;
}

.section-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.trigger-card,
.action-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.trigger-card:hover,
.action-card:hover {
  border-color: var(--color-accent);
}

.trigger-card.active,
.action-card.active {
  background: var(--color-accent-subtle);
  border-color: var(--color-accent);
}

.trigger-card > svg:first-child,
.action-card > svg:first-child {
  color: var(--color-accent);
}

.trigger-info,
.action-info {
  flex: 1;
}

.trigger-title,
.action-title {
  display: block;
  font-weight: 500;
  color: var(--color-text-primary);
  font-size: 0.9375rem;
}

.trigger-desc,
.action-desc {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.connector-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-md) 0;
}

.line {
  width: 2px;
  height: 30px;
  background: var(--color-accent);
}

.plus-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--color-accent);
  color: white;
  border-radius: 50%;
  margin: var(--space-sm) 0;
}

.actions-section {
  margin-top: var(--space-lg);
}

.action-card {
  margin-bottom: var(--space-sm);
}

.action-check {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-success);
  color: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.action-card.active .action-check {
  opacity: 1;
}

.automation-preview {
  margin-top: var(--space-xl);
  padding: var(--space-lg);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
}

.preview-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
}

.preview-flow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.flow-item {
  padding: var(--space-sm) var(--space-md);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  font-weight: 500;
}

/* Footer */
.screen-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-lg);
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.status-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.online {
  background: var(--color-success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-right {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.status-right kbd {
  padding: 2px var(--space-sm);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
}

/* CTA */
.demo-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  margin-top: var(--space-xl);
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.demo-cta p {
  font-size: 1rem;
}

/* Transitions */
.node-list-enter-active,
.node-list-leave-active {
  transition: all 0.3s ease;
}

.node-list-enter-from,
.node-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 1024px) {
  .demo-workflow {
    grid-template-columns: 1fr;
    height: auto;
  }

  .workflow-sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }

  .workflow-sidebar h4 {
    width: 100%;
  }

  .sidebar-node {
    margin-bottom: 0;
  }

  .workflow-config {
    border-left: none;
    border-top: 1px solid var(--color-border);
  }

  .demo-cta {
    flex-direction: column;
    text-align: center;
  }
}
</style>
