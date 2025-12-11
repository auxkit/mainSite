<template>
  <section class="how-it-works section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">How It Works</span>
        <h2>Up and running in minutes</h2>
        <p>Three simple steps to transform how your team works.</p>
      </div>

      <div class="steps-container">
        <div class="steps-line"></div>
        
        <div 
          v-for="(step, index) in steps" 
          :key="step.title"
          class="step"
          v-motion-slide-visible-bottom
          :delay="index * 150"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-icon">
              <component :is="step.icon" :size="28" />
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="cta-box" v-motion-fade-visible :delay="500">
        <div class="cta-content">
          <h3>Ready to get started?</h3>
          <p>Join thousands of teams already using AuxKit to streamline their workflows.</p>
        </div>
        <div class="cta-actions">
          <router-link to="/pricing" class="btn btn-primary">
            Start Free Trial
          </router-link>
          <a href="#" class="btn btn-secondary">
            <Play :size="18" />
            Watch Demo
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Plug2, Settings, Rocket, Play } from 'lucide-vue-next'

const steps = [
  {
    icon: Plug2,
    title: 'Connect',
    description: 'Plug AuxKit into the tools you already use. Our integrations hub makes it easy to sync data from anywhere.'
  },
  {
    icon: Settings,
    title: 'Configure',
    description: 'Pick the modules that fit your team. Customize workflows, permissions, and automations to match how you work.'
  },
  {
    icon: Rocket,
    title: 'Activate',
    description: 'Run your workflows with structure and clarity. Watch your team\'s productivity soar as chaos becomes order.'
  }
]
</script>

<style scoped>
.how-it-works {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.steps-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: var(--space-xl);
  margin-bottom: var(--space-4xl);
}

.steps-line {
  position: absolute;
  top: 40px;
  left: 15%;
  right: 15%;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-accent) 0%,
    var(--color-accent) 50%,
    var(--color-border) 50%,
    var(--color-border) 100%
  );
  background-size: 20px 2px;
}

.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-accent);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-xl);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
}

.step-content {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  width: 100%;
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-accent-subtle);
  border-radius: var(--radius-lg);
  color: var(--color-accent);
  margin: 0 auto var(--space-lg);
}

.step-content h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
}

.step-content p {
  font-size: 0.9375rem;
  line-height: 1.6;
}

.cta-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2xl);
  padding: var(--space-2xl);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-xl);
}

.cta-content h3 {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
}

.cta-content p {
  font-size: 1rem;
}

.cta-actions {
  display: flex;
  gap: var(--space-md);
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .steps-container {
    flex-direction: column;
  }

  .steps-line {
    display: none;
  }

  .cta-box {
    flex-direction: column;
    text-align: center;
  }

  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .cta-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
