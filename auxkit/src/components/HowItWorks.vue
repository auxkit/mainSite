<template>
  <section id="how-it-works" class="how-it-works section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">How It Works</span>
        <h2>Up and running in minutes</h2>
        <p>Three steps from onboarding to your first sale.</p>
      </div>

      <div class="steps-container">
        <div class="steps-line"></div>
        
        <div 
          v-for="(step, index) in steps" 
          :key="step.title"
          class="step"
          v-motion-slide-visible-once-bottom
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

      <div class="cta-box" v-motion-fade-visible-once :delay="500">
        <div class="cta-content">
          <h3>Ready to get started?</h3>
          <p>Set up your free portfolio site, then connect Stripe when you're ready to sell.</p>
        </div>
        <div class="cta-actions">
          <router-link to="/pricing" class="btn btn-primary">
            Start selling free
          </router-link>
          <router-link to="/docs" class="btn btn-secondary">
            Read the docs
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CreditCard, UploadCloud, Code } from 'lucide-vue-next'

const steps = [
  {
    icon: CreditCard,
    title: 'Connect Stripe',
    description: 'Onboard with Stripe Connect so sales settle directly in your own account.'
  },
  {
    icon: UploadCloud,
    title: 'Upload & publish',
    description: 'Create a pack, add samples with artwork and BPM/key metadata. Previews are generated automatically.'
  },
  {
    icon: Code,
    title: 'Embed & sell',
    description: 'Create an API key, paste the widget script tag into your site. Buyers pay via Stripe and get a secure download link by email.'
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
