<template>
  <section class="cta-section">
    <div class="cta-bg">
      <div class="cta-gradient"></div>
    </div>
    <div class="container cta-content">
      <h2 v-motion-slide-visible-bottom>Ready to transform your workflow?</h2>
      <p v-motion-slide-visible-bottom :delay="100">
        Join thousands of teams who've already made the switch. Start your free trial today—no credit card required.
      </p>
      <div class="cta-actions" v-motion-slide-visible-bottom :delay="200">
        <router-link to="/pricing" class="btn btn-primary btn-lg">
          Get Started Free
          <ArrowRight :size="18" />
        </router-link>
        <a href="#" class="btn btn-secondary btn-lg">
          Talk to Sales
        </a>
      </div>
      <p class="cta-note" v-motion-fade-visible :delay="300">
        <Check :size="16" />
        Free 14-day trial
        <span class="separator">•</span>
        <Check :size="16" />
        No credit card required
        <span class="separator">•</span>
        <Check :size="16" />
        Cancel anytime
      </p>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Check } from 'lucide-vue-next'
</script>

<style scoped>
.cta-section {
  position: relative;
  padding: var(--space-4xl) 0;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
}

.cta-content {
  position: relative;
  text-align: center;
  max-width: 700px;
}

.cta-content h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin-bottom: var(--space-lg);
}

.cta-content > p {
  font-size: 1.125rem;
  margin-bottom: var(--space-2xl);
}

.cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.btn-lg {
  padding: var(--space-lg) var(--space-2xl);
  font-size: 1.0625rem;
}

.cta-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.cta-note svg {
  color: var(--color-success);
}

.separator {
  color: var(--color-border);
}

@media (max-width: 640px) {
  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .cta-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .cta-note {
    flex-wrap: wrap;
  }
}
</style>
