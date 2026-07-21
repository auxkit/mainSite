<template>
  <section class="testimonials section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Who is it for?</span>
        <h2>Who is AuxKit for?</h2>
        <p>Built for anyone who wants to sell sound from their own site.</p>
      </div>

      <!-- Main Carousel -->
      <div class="carousel-container" v-motion-fade-visible-once>
        <button class="carousel-btn prev" @click="prevSlide" :disabled="currentIndex === 0">
          <ChevronLeft :size="24" />
        </button>

        <div class="carousel-track" ref="trackRef">
          <div
            class="carousel-slides"
            :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
          >
            <div
              v-for="(scenario, index) in scenarios"
              :key="index"
              class="testimonial-slide"
            >
              <div class="testimonial-card featured">
                <div class="scenario-icon">
                  <component :is="scenario.icon" :size="28" />
                </div>
                <h3 class="testimonial-quote">
                  {{ scenario.title }}
                </h3>
                <p class="scenario-body">{{ scenario.body }}</p>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-btn next" @click="nextSlide" :disabled="currentIndex >= scenarios.length - 1">
          <ChevronRight :size="24" />
        </button>
      </div>

      <!-- Carousel Dots -->
      <div class="carousel-dots">
        <button
          v-for="(_, index) in scenarios"
          :key="index"
          :class="['dot', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- Fact Chips -->
      <div class="stats-bar" v-motion-fade-visible-once>
        <div class="stat-item" v-for="fact in facts" :key="fact">
          <span class="stat-value">{{ fact }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Music2, Waves, Building2 } from 'lucide-vue-next'

const currentIndex = ref(0)
const slideWidth = ref(0)
const trackRef = ref(null)

const scenarios = [
  {
    icon: Music2,
    title: 'You make drum kits',
    body: 'Sell them from your own beat store — buyers preview every sample before they pay.'
  },
  {
    icon: Waves,
    title: 'You design sound',
    body: 'Embed your pack store straight into your portfolio site.'
  },
  {
    icon: Building2,
    title: 'You run a small label',
    body: 'Publish your catalogue and let the API power a custom storefront.'
  }
]

const facts = ['10% flat fee', 'No subscription', '5 downloads · 7 days']

function updateSlideWidth() {
  if (trackRef.value) {
    slideWidth.value = trackRef.value.offsetWidth
  }
}

function nextSlide() {
  if (currentIndex.value < scenarios.length - 1) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function goToSlide(index) {
  currentIndex.value = index
}

// Auto-advance
let interval
onMounted(() => {
  updateSlideWidth()
  window.addEventListener('resize', updateSlideWidth)

  interval = setInterval(() => {
    if (currentIndex.value < scenarios.length - 1) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }, 6000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlideWidth)
  clearInterval(interval)
})
</script>

<style scoped>
.testimonials {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

/* Carousel */
.carousel-container {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.carousel-track {
  flex: 1;
  overflow: hidden;
  border-radius: var(--radius-2xl);
}

.carousel-slides {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-slide {
  flex: 0 0 100%;
  min-width: 100%;
  padding: 0 var(--space-sm);
  box-sizing: border-box;
}

.testimonial-card.featured {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-3xl);
  text-align: center;
}

.scenario-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-xl);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-lg);
}

.testimonial-quote {
  font-size: 1.5rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: var(--space-md);
  color: var(--color-text-primary);
}

.scenario-body {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto;
}

/* Carousel Controls */
.carousel-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.carousel-btn:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-4xl);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-border);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.dot.active {
  background: var(--color-accent);
  width: 32px;
}

/* Fact Chips */
.stats-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-lg);
  padding: var(--space-2xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.stat-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-xl);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

.stat-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

@media (max-width: 768px) {
  .testimonial-quote {
    font-size: 1.25rem;
  }

  .carousel-btn {
    display: none;
  }
}

@media (max-width: 640px) {
  .stats-bar {
    gap: var(--space-md);
    padding: var(--space-xl);
  }
}
</style>
