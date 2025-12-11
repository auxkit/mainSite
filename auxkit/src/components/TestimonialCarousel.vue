<template>
  <section class="testimonials section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Testimonials</span>
        <h2>Loved by teams worldwide</h2>
        <p>See what developers, founders, and ops teams have to say about AuxKit.</p>
      </div>

      <!-- Main Carousel -->
      <div class="carousel-container" v-motion-fade-visible>
        <button class="carousel-btn prev" @click="prevSlide" :disabled="currentIndex === 0">
          <ChevronLeft :size="24" />
        </button>
        
        <div class="carousel-track" ref="trackRef">
          <div 
            class="carousel-slides"
            :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
          >
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="testimonial-slide"
            >
              <div class="testimonial-card featured">
                <div class="testimonial-rating">
                  <Star v-for="i in 5" :key="i" :size="16" class="star filled" />
                </div>
                <blockquote class="testimonial-quote">
                  "{{ testimonial.quote }}"
                </blockquote>
                <div class="testimonial-author">
                  <div class="author-avatar" :style="{ background: testimonial.avatarColor }">
                    {{ testimonial.initials }}
                  </div>
                  <div class="author-info">
                    <div class="author-name">{{ testimonial.name }}</div>
                    <div class="author-role">{{ testimonial.role }} at {{ testimonial.company }}</div>
                  </div>
                </div>
                <div class="testimonial-metrics" v-if="testimonial.metrics">
                  <div v-for="metric in testimonial.metrics" :key="metric.label" class="metric">
                    <span class="metric-value">{{ metric.value }}</span>
                    <span class="metric-label">{{ metric.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button class="carousel-btn next" @click="nextSlide" :disabled="currentIndex >= testimonials.length - 1">
          <ChevronRight :size="24" />
        </button>
      </div>

      <!-- Carousel Dots -->
      <div class="carousel-dots">
        <button 
          v-for="(_, index) in testimonials" 
          :key="index"
          :class="['dot', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- Grid of Mini Testimonials -->
      <div class="testimonials-grid">
        <div 
          v-for="(mini, index) in miniTestimonials"
          :key="index"
          class="mini-testimonial"
          v-motion-slide-visible-bottom
          :delay="index * 80"
        >
          <div class="mini-header">
            <div class="mini-avatar" :style="{ background: mini.avatarColor }">
              {{ mini.initials }}
            </div>
            <div class="mini-info">
              <span class="mini-name">{{ mini.name }}</span>
              <span class="mini-handle">{{ mini.handle }}</span>
            </div>
            <component :is="mini.platform === 'twitter' ? Twitter : Linkedin" :size="16" class="platform-icon" />
          </div>
          <p class="mini-quote">{{ mini.quote }}</p>
          <div class="mini-footer">
            <span class="mini-date">{{ mini.date }}</span>
            <div class="mini-likes">
              <Heart :size="12" />
              {{ mini.likes }}
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar" v-motion-fade-visible>
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Star, Heart, Twitter, Linkedin } from 'lucide-vue-next'

const currentIndex = ref(0)
const slideWidth = ref(0)
const trackRef = ref(null)

const testimonials = [
  {
    quote: "AuxKit replaced 4 different tools we were stitching together with Zapier. Our team's efficiency went up, our costs went down, and everything actually works together now. It's the platform we wished we had years ago.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Streamline.io",
    initials: "SC",
    avatarColor: "#6366f1",
    metrics: [
      { value: "4x", label: "Faster workflows" },
      { value: "67%", label: "Cost reduction" },
      { value: "2 weeks", label: "Implementation" }
    ]
  },
  {
    quote: "We evaluated Monday, Notion, and Asana. None of them gave us the flexibility we needed for our unique workflows. AuxKit's modular approach means we're not fighting the tool anymore.",
    name: "Marcus Rodriguez",
    role: "Head of Operations",
    company: "Velocity VC",
    initials: "MR",
    avatarColor: "#22c55e",
    metrics: [
      { value: "100%", label: "Team adoption" },
      { value: "3 hrs/week", label: "Time saved per user" },
      { value: "12", label: "Custom workflows" }
    ]
  },
  {
    quote: "As a developer, I appreciate that AuxKit isn't a black box. The API is comprehensive, the docs are clear, and when we needed something custom, we could build it. Best tool decision we've made.",
    name: "Priya Patel",
    role: "Engineering Lead",
    company: "Dataflow Labs",
    initials: "PP",
    avatarColor: "#f59e0b",
    metrics: [
      { value: "< 1 day", label: "API integration" },
      { value: "99.9%", label: "Uptime" },
      { value: "5 min", label: "Avg response time" }
    ]
  },
  {
    quote: "The onboarding experience sold us. We had our first workflow running in under an hour. Support team was incredible when we had questions. This is how SaaS should be.",
    name: "David Kim",
    role: "Founder",
    company: "Nexus Startup",
    initials: "DK",
    avatarColor: "#ec4899",
    metrics: [
      { value: "< 1 hour", label: "Time to first workflow" },
      { value: "5 mins", label: "Avg support response" }
    ]
  }
]

const miniTestimonials = [
  {
    name: "Alex Thompson",
    handle: "@alexthompsondev",
    initials: "AT",
    avatarColor: "#3b82f6",
    quote: "Just migrated our team to @AuxKit. The visual workflow builder is 🔥. Finally an automation tool that doesn't feel like it's from 2010.",
    platform: "twitter",
    date: "2 days ago",
    likes: 47
  },
  {
    name: "Emma Rodriguez",
    handle: "@emmarodz",
    initials: "ER",
    avatarColor: "#8b5cf6",
    quote: "AuxKit's API is so clean. Built our Slack integration in an afternoon. Documentation is actually good (rare these days).",
    platform: "twitter",
    date: "1 week ago",
    likes: 128
  },
  {
    name: "James Wilson",
    handle: "James Wilson",
    initials: "JW",
    avatarColor: "#06b6d4",
    quote: "After trying 6 different project management tools, AuxKit is the one that stuck. The modular approach makes so much sense for growing teams.",
    platform: "linkedin",
    date: "3 days ago",
    likes: 89
  },
  {
    name: "Lisa Chang",
    handle: "@lisachangtech",
    initials: "LC",
    avatarColor: "#10b981",
    quote: "Hot take: AuxKit > Notion for technical teams. Fight me. 😤 The automation capabilities alone are worth it.",
    platform: "twitter",
    date: "5 days ago",
    likes: 234
  },
  {
    name: "Ryan O'Connor",
    handle: "Ryan O'Connor",
    initials: "RO",
    avatarColor: "#f97316",
    quote: "Our ops team was skeptical about switching tools again. 3 months with AuxKit and they're the biggest advocates now. Worth the migration effort 100%.",
    platform: "linkedin",
    date: "1 week ago",
    likes: 156
  },
  {
    name: "Mia Nakamura",
    handle: "@mianakamura",
    initials: "MN",
    avatarColor: "#ef4444",
    quote: "The customer support at AuxKit is incredible. Had a complex webhook question at 11pm and got a working solution within 20 minutes. 🙏",
    platform: "twitter",
    date: "4 days ago",
    likes: 67
  }
]

const stats = [
  { value: "4.9/5", label: "Average rating" },
  { value: "2,500+", label: "5-star reviews" },
  { value: "50K+", label: "Active users" },
  { value: "#1", label: "on G2 for Workflow Tools" }
]

function updateSlideWidth() {
  if (trackRef.value) {
    slideWidth.value = trackRef.value.offsetWidth
  }
}

function nextSlide() {
  if (currentIndex.value < testimonials.length - 1) {
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
    if (currentIndex.value < testimonials.length - 1) {
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
}

.testimonial-rating {
  display: flex;
  gap: 4px;
  margin-bottom: var(--space-xl);
}

.star.filled {
  color: #f59e0b;
  fill: #f59e0b;
}

.testimonial-quote {
  font-size: 1.375rem;
  line-height: 1.6;
  font-weight: 500;
  margin-bottom: var(--space-2xl);
  color: var(--color-text-primary);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
}

.author-name {
  font-weight: 600;
  font-size: 1.0625rem;
  margin-bottom: 2px;
}

.author-role {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.testimonial-metrics {
  display: flex;
  gap: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-border);
}

.metric {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
}

.metric-label {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
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

/* Mini Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-4xl);
}

.mini-testimonial {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  transition: all var(--transition-base);
}

.mini-testimonial:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.mini-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.mini-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
}

.mini-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mini-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.mini-handle {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.platform-icon {
  color: var(--color-text-muted);
}

.mini-quote {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: var(--space-md);
}

.mini-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.mini-likes {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Stats Bar */
.stats-bar {
  display: flex;
  justify-content: center;
  gap: var(--space-4xl);
  padding: var(--space-2xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-bar {
    gap: var(--space-2xl);
  }
}

@media (max-width: 768px) {
  .testimonial-quote {
    font-size: 1.125rem;
  }
  
  .testimonial-metrics {
    flex-wrap: wrap;
    gap: var(--space-xl);
  }
  
  .carousel-btn {
    display: none;
  }
}

@media (max-width: 640px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-bar {
    flex-wrap: wrap;
    gap: var(--space-xl);
  }
  
  .stat-item {
    flex: 1 1 40%;
  }
}
</style>
