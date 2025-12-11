<template>
  <section class="social-proof section">
    <div class="container">
      <!-- Stats -->
      <div class="stats-grid" v-motion-fade-visible>
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Logos -->
      <div class="logos-section" v-motion-fade-visible :delay="100">
        <p class="logos-label">Trusted by teams at</p>
        <div class="logos-grid">
          <div v-for="n in 6" :key="n" class="logo-placeholder">
            <div class="logo-shape"></div>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="testimonials-section">
        <div class="section-header">
          <span class="badge mb-lg">Testimonials</span>
          <h2>Loved by teams everywhere</h2>
        </div>

        <div class="grid grid-3">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="testimonial-card"
            v-motion-slide-visible-bottom
            :delay="index * 100"
          >
            <div class="testimonial-rating">
              <Star v-for="n in 5" :key="n" :size="16" fill="currentColor" />
            </div>
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ testimonial.name.charAt(0) }}</div>
              <div class="author-info">
                <div class="author-name">{{ testimonial.name }}</div>
                <div class="author-role">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star } from 'lucide-vue-next'

const stats = [
  { value: '50+', label: 'Countries' },
  { value: '10K+', label: 'Workflows Automated' },
  { value: '120hrs', label: 'Saved per Team/Month' },
  { value: '99.9%', label: 'Uptime SLA' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Operations, Lattice',
    text: 'AuxKit replaced three different tools for us. The modular approach means we only pay for what we use, and everything just works together.'
  },
  {
    name: 'Marcus Johnson',
    role: 'Engineering Lead, Notion',
    text: 'The API documentation is exceptional. We had our custom integration up and running in a day. Our devs actually enjoy working with it.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'VP Product, Linear',
    text: 'Finally, a tool that understands how product teams actually work. The workflow engine alone has saved us countless hours every sprint.'
  }
]
</script>

<style scoped>
.social-proof {
  background: var(--color-bg);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-4xl);
  padding: var(--space-2xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
  background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.logos-section {
  text-align: center;
  margin-bottom: var(--space-4xl);
}

.logos-label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xl);
}

.logos-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3xl);
  flex-wrap: wrap;
}

.logo-placeholder {
  opacity: 0.4;
  transition: opacity var(--transition-fast);
}

.logo-placeholder:hover {
  opacity: 0.7;
}

.logo-shape {
  width: 120px;
  height: 32px;
  background: var(--color-text-muted);
  border-radius: var(--radius-sm);
}

.testimonials-section {
  padding-top: var(--space-2xl);
}

.testimonial-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  transition: all var(--transition-base);
}

.testimonial-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.testimonial-rating {
  display: flex;
  gap: var(--space-xs);
  color: var(--color-warning);
  margin-bottom: var(--space-lg);
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.author-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-weight: 600;
  border-radius: var(--radius-full);
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

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .logos-grid {
    gap: var(--space-xl);
  }
}
</style>
