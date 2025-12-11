<template>
  <section class="problem-solution section">
    <div class="container">
      <div class="ps-grid">
        <!-- Problem Side -->
        <div class="ps-problems" v-motion-slide-visible-left>
          <span class="badge badge-problem mb-lg">The Problem</span>
          <h2>Sound familiar?</h2>
          <div class="problem-list">
            <div v-for="(problem, index) in problems" :key="index" class="problem-item">
              <div class="problem-icon">
                <X :size="20" />
              </div>
              <p>{{ problem }}</p>
            </div>
          </div>
        </div>

        <!-- Solution Side -->
        <div class="ps-solution" v-motion-slide-visible-right>
          <span class="badge mb-lg">The Solution</span>
          <h2 class="gradient-text">AuxKit's Answer</h2>
          <p class="solution-quote">
            "One modular system. One universal design language. One place where your team's work actually makes sense."
          </p>
          
          <div class="solution-visual">
            <div class="solution-before">
              <span>Before</span>
              <div class="chaos-grid">
                <div v-for="n in 9" :key="n" class="chaos-item"></div>
              </div>
            </div>
            <div class="solution-arrow">
              <ArrowRight :size="32" />
            </div>
            <div class="solution-after">
              <span>After</span>
              <div class="order-grid">
                <div v-for="n in 4" :key="n" class="order-item"></div>
              </div>
            </div>
          </div>

          <router-link to="/features" class="btn btn-primary mt-xl">
            Explore Features
            <ArrowRight :size="18" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { X, ArrowRight } from 'lucide-vue-next'

const problems = [
  'Tools that don\'t talk to each other',
  'Noise, alerts, and duplicated work',
  'Slow adoption due to complexity',
  'Teams hacking together workflows with spreadsheets and screenshots'
]
</script>

<style scoped>
.problem-solution {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.ps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
  align-items: center;
}

.ps-problems h2,
.ps-solution h2 {
  margin-bottom: var(--space-xl);
}

.badge-problem {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
}

.problem-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.problem-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.problem-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius-md);
  color: var(--color-error);
  flex-shrink: 0;
}

.problem-item p {
  color: var(--color-text-primary);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.solution-quote {
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-text-primary);
  padding-left: var(--space-lg);
  border-left: 3px solid var(--color-accent);
  margin-bottom: var(--space-2xl);
}

.solution-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.solution-before,
.solution-after {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.solution-before span,
.solution-after span {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.chaos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xs);
}

.chaos-item {
  width: 24px;
  height: 24px;
  background: var(--color-text-muted);
  border-radius: var(--radius-sm);
  opacity: 0.3;
}

.chaos-item:nth-child(odd) {
  transform: rotate(5deg);
}

.chaos-item:nth-child(even) {
  transform: rotate(-5deg);
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}

.order-item {
  width: 32px;
  height: 32px;
  background: var(--color-accent);
  border-radius: var(--radius-md);
}

.solution-arrow {
  color: var(--color-accent);
}

@media (max-width: 1024px) {
  .ps-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3xl);
  }
}
</style>
