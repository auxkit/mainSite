<template>
  <section class="pricing-calc section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Pricing Calculator</span>
        <h2>What would you keep per sale?</h2>
        <p>No subscriptions, no seats, no add-ons. Just a flat 10% platform fee.</p>
      </div>

      <div class="calculator-container" v-motion-fade-visible>
        <div class="calculator-main">
          <!-- Pack price -->
          <div class="calc-section">
            <div class="calc-header">
              <h3>
                <Euro :size="20" />
                Pack price
              </h3>
              <span class="calc-value">€{{ packPrice }}</span>
            </div>
            <div class="slider-container">
              <input
                type="range"
                v-model.number="packPrice"
                min="5"
                max="100"
                class="slider"
              />
              <div class="slider-labels">
                <span>€5</span>
                <span>€100</span>
              </div>
            </div>
          </div>

          <!-- Sales per month -->
          <div class="calc-section">
            <div class="calc-header">
              <h3>
                <TrendingUp :size="20" />
                Sales per month
              </h3>
              <span class="calc-value">{{ salesPerMonth }}</span>
            </div>
            <div class="slider-container">
              <input
                type="range"
                v-model.number="salesPerMonth"
                min="1"
                max="100"
                class="slider"
              />
              <div class="slider-labels">
                <span>1</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <!-- Included -->
          <div class="calc-section">
            <div class="calc-header">
              <h3>
                <Package :size="20" />
                Included with every seller account
              </h3>
            </div>
            <ul class="included-list">
              <li v-for="item in included" :key="item">
                <Check :size="16" class="included-check" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Summary -->
        <div class="calculator-summary">
          <div class="summary-card">
            <h3>Per-sale breakdown</h3>

            <div class="summary-breakdown">
              <div class="breakdown-item">
                <span>Pack price</span>
                <span>€{{ packPrice.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item">
                <span>Platform fee (10%)</span>
                <span>−€{{ auxkitFee.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item">
                <span>Stripe fee (est.)</span>
                <span>−€{{ stripeFee.toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-total">
              <div class="total-amount">
                <span class="total-label">You keep</span>
                <span class="total-value">€{{ yours.toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-monthly">
              <span class="monthly-label">Monthly estimate ({{ salesPerMonth }} sales)</span>
              <span class="monthly-value">€{{ monthlyEstimate.toFixed(2) }}</span>
            </div>

            <div class="summary-actions">
              <router-link to="/pricing" class="btn btn-primary btn-lg">
                Get Started
                <ArrowRight :size="18" />
              </router-link>
            </div>

            <div class="summary-notes">
              <p>Estimate. Stripe fees vary by region and card type.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Euro, TrendingUp, Package, Check, ArrowRight } from 'lucide-vue-next'

const packPrice = ref(20)
const salesPerMonth = ref(10)

const included = [
  'Portfolio site + song feeds',
  '20 GB storage',
  'Embed widget + API keys',
  'Secure delivery with buyer self-service',
  'Stripe Connect payouts'
]

const auxkitFee = computed(() => packPrice.value * 0.10)
const stripeFee = computed(() => packPrice.value * 0.015 + 0.25)
const yours = computed(() => packPrice.value - auxkitFee.value - stripeFee.value)
const monthlyEstimate = computed(() => yours.value * salesPerMonth.value)
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
  flex-shrink: 0;
}

.calc-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-accent);
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

/* Included list */
.included-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  list-style: none;
}

.included-list li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.included-check {
  flex-shrink: 0;
  color: var(--color-success);
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

.summary-total {
  margin-bottom: var(--space-lg);
}

.total-amount {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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

.summary-monthly {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background: var(--color-accent-subtle);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.monthly-value {
  font-weight: 700;
  color: var(--color-accent);
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.summary-notes p {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .calculator-container {
    grid-template-columns: 1fr;
  }

  .calculator-summary {
    position: static;
  }
}
</style>
