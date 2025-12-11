<template>
  <section class="pricing-calc section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Pricing Calculator</span>
        <h2>Build your perfect plan</h2>
        <p>See exactly what you'll pay. No surprises.</p>
      </div>

      <div class="calculator-container" v-motion-fade-visible>
        <div class="calculator-main">
          <!-- Team Size -->
          <div class="calc-section">
            <div class="calc-header">
              <h3>
                <Users :size="20" />
                Team Size
              </h3>
              <span class="calc-value">{{ teamSize }} users</span>
            </div>
            <div class="slider-container">
              <input 
                type="range" 
                v-model="teamSize" 
                min="1" 
                max="500" 
                class="slider"
              />
              <div class="slider-labels">
                <span>1</span>
                <span>100</span>
                <span>250</span>
                <span>500+</span>
              </div>
            </div>
          </div>

          <!-- Billing Cycle -->
          <div class="calc-section">
            <div class="calc-header">
              <h3>
                <Calendar :size="20" />
                Billing Cycle
              </h3>
              <span v-if="isAnnual" class="savings-badge">
                <Zap :size="12" />
                Save 20%
              </span>
            </div>
            <div class="toggle-group">
              <button 
                :class="['toggle-btn', { active: !isAnnual }]"
                @click="isAnnual = false"
              >
                Monthly
              </button>
              <button 
                :class="['toggle-btn', { active: isAnnual }]"
                @click="isAnnual = true"
              >
                Annual
              </button>
            </div>
          </div>

          <!-- Modules -->
          <div class="calc-section">
            <div class="calc-header">
              <h3>
                <Blocks :size="20" />
                Modules
              </h3>
              <span class="calc-value">{{ selectedModules.length }} selected</span>
            </div>
            <div class="modules-grid">
              <button 
                v-for="mod in modules"
                :key="mod.id"
                :class="['module-btn', { 
                  active: selectedModules.includes(mod.id),
                  free: mod.price === 0
                }]"
                @click="toggleModule(mod.id)"
              >
                <component :is="mod.icon" :size="18" />
                <span class="module-name">{{ mod.name }}</span>
                <span v-if="mod.price > 0" class="module-price">+${{ mod.price }}/mo</span>
                <span v-else class="module-price free">Included</span>
                <Check v-if="selectedModules.includes(mod.id)" :size="16" class="check-icon" />
              </button>
            </div>
          </div>

          <!-- Add-ons -->
          <div class="calc-section">
            <div class="calc-header">
              <h3>
                <Sparkles :size="20" />
                Add-ons
              </h3>
            </div>
            <div class="addons-list">
              <label 
                v-for="addon in addons"
                :key="addon.id"
                class="addon-item"
              >
                <input 
                  type="checkbox" 
                  :checked="selectedAddons.includes(addon.id)"
                  @change="toggleAddon(addon.id)"
                />
                <div class="addon-check">
                  <Check :size="14" />
                </div>
                <div class="addon-info">
                  <span class="addon-name">{{ addon.name }}</span>
                  <span class="addon-description">{{ addon.description }}</span>
                </div>
                <span class="addon-price">+${{ addon.price }}/mo</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="calculator-summary">
          <div class="summary-card">
            <h3>Your Estimate</h3>
            
            <div class="summary-breakdown">
              <div class="breakdown-item">
                <span>Base Plan ({{ teamSize }} users)</span>
                <span>${{ baseCost }}/mo</span>
              </div>
              <div 
                v-for="mod in selectedModulesList" 
                :key="mod.id"
                class="breakdown-item"
              >
                <span>{{ mod.name }}</span>
                <span v-if="mod.price > 0">+${{ mod.price }}/mo</span>
                <span v-else class="free">Included</span>
              </div>
              <div 
                v-for="addon in selectedAddonsList" 
                :key="addon.id"
                class="breakdown-item"
              >
                <span>{{ addon.name }}</span>
                <span>+${{ addon.price }}/mo</span>
              </div>
              <div v-if="isAnnual" class="breakdown-item discount">
                <span>Annual Discount (20%)</span>
                <span>-${{ discount }}/mo</span>
              </div>
            </div>

            <div class="summary-total">
              <div class="total-amount">
                <span class="total-label">Monthly Total</span>
                <span class="total-value">${{ monthlyTotal }}</span>
              </div>
              <div v-if="isAnnual" class="annual-amount">
                <span>Billed annually at ${{ annualTotal }}/year</span>
              </div>
            </div>

            <div class="summary-savings" v-if="potentialSavings > 0">
              <TrendingDown :size="16" />
              <span>Saving <strong>${{ potentialSavings }}/mo</strong> vs. alternatives</span>
            </div>

            <div class="summary-actions">
              <router-link to="/pricing" class="btn btn-primary btn-lg">
                Get Started
                <ArrowRight :size="18" />
              </router-link>
              <button class="btn btn-secondary">
                <Download :size="18" />
                Export Quote
              </button>
            </div>

            <div class="summary-notes">
              <p>
                <Shield :size="14" />
                14-day free trial. No credit card required.
              </p>
              <p>
                <MessageCircle :size="14" />
                Need a custom plan? <a href="#">Talk to sales</a>
              </p>
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
  Users, Calendar, Blocks, Sparkles, Check, ArrowRight,
  Download, Shield, MessageCircle, TrendingDown, Zap,
  Workflow, Database, FileText, GitBranch, LineChart, Lock
} from 'lucide-vue-next'

const teamSize = ref(10)
const isAnnual = ref(true)
const selectedModules = ref(['workflows', 'database'])
const selectedAddons = ref([])

const modules = [
  { id: 'workflows', name: 'Workflows', icon: Workflow, price: 0 },
  { id: 'database', name: 'Database', icon: Database, price: 0 },
  { id: 'docs', name: 'Docs & Wiki', icon: FileText, price: 5 },
  { id: 'git', name: 'Version Control', icon: GitBranch, price: 8 },
  { id: 'analytics', name: 'Analytics', icon: LineChart, price: 12 },
  { id: 'security', name: 'Security+', icon: Lock, price: 15 }
]

const addons = [
  { id: 'sso', name: 'SSO / SAML', description: 'Enterprise single sign-on', price: 50 },
  { id: 'audit', name: 'Advanced Audit Logs', description: 'Unlimited retention + export', price: 25 },
  { id: 'sla', name: 'Priority SLA', description: '99.99% uptime guarantee', price: 100 },
  { id: 'support', name: 'Dedicated Support', description: 'Named account manager', price: 200 }
]

function toggleModule(id) {
  const index = selectedModules.value.indexOf(id)
  if (index > -1) {
    selectedModules.value.splice(index, 1)
  } else {
    selectedModules.value.push(id)
  }
}

function toggleAddon(id) {
  const index = selectedAddons.value.indexOf(id)
  if (index > -1) {
    selectedAddons.value.splice(index, 1)
  } else {
    selectedAddons.value.push(id)
  }
}

const selectedModulesList = computed(() => 
  modules.filter(m => selectedModules.value.includes(m.id))
)

const selectedAddonsList = computed(() => 
  addons.filter(a => selectedAddons.value.includes(a.id))
)

const baseCost = computed(() => {
  // Tiered pricing based on team size
  if (teamSize.value <= 5) return 0 // Free tier
  if (teamSize.value <= 20) return 29
  if (teamSize.value <= 50) return 79
  if (teamSize.value <= 100) return 149
  if (teamSize.value <= 250) return 299
  return 499
})

const modulesCost = computed(() => 
  selectedModulesList.value.reduce((sum, m) => sum + m.price, 0)
)

const addonsCost = computed(() => 
  selectedAddonsList.value.reduce((sum, a) => sum + a.price, 0)
)

const subtotal = computed(() => baseCost.value + modulesCost.value + addonsCost.value)

const discount = computed(() => 
  isAnnual.value ? Math.round(subtotal.value * 0.2) : 0
)

const monthlyTotal = computed(() => subtotal.value - discount.value)

const annualTotal = computed(() => monthlyTotal.value * 12)

const potentialSavings = computed(() => {
  // Estimated savings vs. typical alternatives
  const alternativeCost = teamSize.value * 15 + 100 // ~$15/user + overhead
  return Math.max(0, alternativeCost - monthlyTotal.value)
})
</script>

<style scoped>
.pricing-calc {
  background: var(--color-bg);
}

.calculator-container {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--space-2xl);
  align-items: start;
}

.calculator-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

.calc-section {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
}

.calc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.calc-header h3 {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1.0625rem;
}

.calc-header h3 svg {
  color: var(--color-accent);
}

.calc-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-accent);
}

.savings-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px var(--space-sm);
  background: rgba(34, 197, 94, 0.15);
  color: var(--color-success);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

/* Slider */
.slider-container {
  padding: 0 var(--space-sm);
}

.slider {
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-full);
  outline: none;
  margin-bottom: var(--space-sm);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: var(--color-accent);
  border-radius: var(--radius-full);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Toggle */
.toggle-group {
  display: flex;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  padding: 4px;
}

.toggle-btn {
  flex: 1;
  padding: var(--space-sm) var(--space-lg);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.toggle-btn.active {
  background: var(--color-accent);
  color: white;
}

/* Modules Grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.module-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.module-btn:hover {
  border-color: var(--color-accent);
}

.module-btn.active {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

.module-btn svg:first-child {
  color: var(--color-accent);
}

.module-name {
  font-weight: 500;
}

.module-price {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.module-price.free {
  color: var(--color-success);
}

.check-icon {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  color: var(--color-accent);
}

/* Addons */
.addons-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.addon-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.addon-item:hover {
  border-color: var(--color-accent);
}

.addon-item input {
  display: none;
}

.addon-check {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: all var(--transition-fast);
}

.addon-item input:checked + .addon-check {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}

.addon-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.addon-name {
  font-weight: 500;
  font-size: 0.9375rem;
}

.addon-description {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.addon-price {
  font-weight: 600;
  color: var(--color-text-secondary);
}

/* Summary */
.calculator-summary {
  position: sticky;
  top: 100px;
}

.summary-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
}

.summary-card h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-xl);
}

.summary-breakdown {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-xl);
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.breakdown-item .free {
  color: var(--color-success);
}

.breakdown-item.discount {
  color: var(--color-success);
}

.summary-total {
  margin-bottom: var(--space-xl);
}

.total-amount {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-xs);
}

.total-label {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.total-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.annual-amount {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  text-align: right;
}

.summary-savings {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  background: rgba(34, 197, 94, 0.1);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  color: var(--color-success);
  margin-bottom: var(--space-xl);
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.summary-notes {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.summary-notes p {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.summary-notes a {
  color: var(--color-accent);
  text-decoration: none;
}

.summary-notes a:hover {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .calculator-container {
    grid-template-columns: 1fr;
  }
  
  .calculator-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
