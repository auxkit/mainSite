<template>
  <main class="blog-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible>Blog</span>
        <h1 v-motion-slide-visible-bottom>Insights & Updates</h1>
        <p class="hero-desc" v-motion-slide-visible-bottom :delay="100">
          Thoughts on workflow optimization, modular systems, and building better tools.
        </p>
      </div>
    </section>

    <!-- Featured Post -->
    <section class="featured-section section">
      <div class="container">
        <div class="featured-post" v-motion-fade-visible>
          <div class="featured-image">
            <div class="image-placeholder">
              <Sparkles :size="48" />
            </div>
          </div>
          <div class="featured-content">
            <div class="post-meta">
              <span class="post-category">Product</span>
              <span class="post-date">December 10, 2024</span>
            </div>
            <h2>Introducing AuxKit 2.0: The Future of Modular Workflows</h2>
            <p>
              Today we're excited to announce AuxKit 2.0, our biggest release yet. With a completely redesigned workflow engine, new automation capabilities, and 20+ new integrations, we're making it easier than ever to build the perfect toolkit for your team.
            </p>
            <a href="#" class="btn btn-secondary">
              Read More
              <ArrowRight :size="18" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="blog-grid-section section">
      <div class="container">
        <!-- Categories -->
        <div class="category-filter">
          <button 
            v-for="category in categories" 
            :key="category"
            class="category-btn"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <!-- Posts -->
        <div class="grid grid-3">
          <article 
            v-for="(post, index) in filteredPosts" 
            :key="post.title"
            class="blog-card"
            v-motion-slide-visible-bottom
            :delay="index * 75"
          >
            <div class="card-image">
              <div class="image-placeholder small">
                <component :is="post.icon" :size="32" />
              </div>
            </div>
            <div class="card-content">
              <div class="post-meta">
                <span class="post-category">{{ post.category }}</span>
                <span class="post-date">{{ post.date }}</span>
              </div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
              <a href="#" class="read-more">
                Read article
                <ArrowRight :size="14" />
              </a>
            </div>
          </article>
        </div>

        <!-- Load More -->
        <div class="load-more">
          <button class="btn btn-secondary">
            Load More Articles
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section section">
      <div class="container container-narrow">
        <div class="newsletter-box" v-motion-fade-visible>
          <h2>Stay in the loop</h2>
          <p>
            Get the latest articles, product updates, and insights delivered to your inbox.
          </p>
          <form class="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
          <span class="newsletter-note">No spam, unsubscribe anytime.</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Sparkles, ArrowRight, Lightbulb, Workflow, Puzzle, 
  BarChart3, Users, Zap 
} from 'lucide-vue-next'

const activeCategory = ref('All')

const categories = ['All', 'Product', 'Engineering', 'Guides', 'Company']

const posts = [
  {
    title: 'How We Designed AuxKit\'s Module System',
    excerpt: 'A deep dive into the architectural decisions behind our modular approach.',
    category: 'Engineering',
    date: 'December 8, 2024',
    icon: Puzzle
  },
  {
    title: '5 Workflow Patterns Every Ops Team Should Know',
    excerpt: 'Common patterns that help operations teams scale without adding headcount.',
    category: 'Guides',
    date: 'December 5, 2024',
    icon: Workflow
  },
  {
    title: 'Building Automations That Actually Work',
    excerpt: 'Why most automation fails and how to design systems that stand the test of time.',
    category: 'Guides',
    date: 'December 2, 2024',
    icon: Zap
  },
  {
    title: 'AuxKit\'s Approach to Team Collaboration',
    excerpt: 'How we think about multi-user workflows and permissions.',
    category: 'Product',
    date: 'November 28, 2024',
    icon: Users
  },
  {
    title: 'Measuring What Matters: KPIs for Modern Teams',
    excerpt: 'A framework for choosing metrics that drive real outcomes.',
    category: 'Guides',
    date: 'November 25, 2024',
    icon: BarChart3
  },
  {
    title: 'Why We\'re Building AuxKit as a Remote-First Company',
    excerpt: 'Our philosophy on distributed work and how it shapes our product.',
    category: 'Company',
    date: 'November 20, 2024',
    icon: Lightbulb
  }
]

const filteredPosts = computed(() => {
  if (activeCategory.value === 'All') return posts
  return posts.filter(post => post.category === activeCategory.value)
})
</script>

<style scoped>
.blog-page {
  padding-top: 72px;
}

.page-hero {
  padding: var(--space-4xl) 0;
  text-align: center;
  background: var(--color-bg);
}

.page-hero h1 {
  max-width: 800px;
  margin: 0 auto var(--space-lg);
}

.hero-desc {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.25rem;
}

/* Featured Post */
.featured-section {
  background: var(--color-bg);
  padding-top: 0;
}

.featured-post {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.featured-image {
  background: var(--color-bg-elevated);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 400px;
  color: var(--color-accent);
}

.featured-content {
  padding: var(--space-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.post-category {
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
}

.post-date {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.featured-content h2 {
  font-size: 1.75rem;
  margin-bottom: var(--space-lg);
}

.featured-content p {
  font-size: 1.0625rem;
  margin-bottom: var(--space-xl);
}

/* Category Filter */
.blog-grid-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.category-filter {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-2xl);
  overflow-x: auto;
  padding-bottom: var(--space-sm);
}

.category-btn {
  padding: var(--space-sm) var(--space-lg);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.category-btn:hover {
  border-color: var(--color-text-muted);
  color: var(--color-text-primary);
}

.category-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}

/* Blog Card */
.blog-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
}

.blog-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.card-image {
  background: var(--color-bg);
}

.image-placeholder.small {
  min-height: 180px;
  color: var(--color-accent);
}

.card-content {
  padding: var(--space-xl);
}

.card-content h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
  line-height: 1.4;
}

.card-content p {
  font-size: 0.9375rem;
  margin-bottom: var(--space-lg);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  transition: gap var(--transition-fast);
}

.read-more:hover {
  gap: var(--space-sm);
}

/* Load More */
.load-more {
  display: flex;
  justify-content: center;
  margin-top: var(--space-3xl);
}

/* Newsletter */
.newsletter-section {
  background: var(--color-bg);
}

.newsletter-box {
  text-align: center;
  padding: var(--space-3xl);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-xl);
}

.newsletter-box h2 {
  font-size: 1.75rem;
  margin-bottom: var(--space-md);
}

.newsletter-box > p {
  font-size: 1.0625rem;
  margin-bottom: var(--space-xl);
}

.newsletter-form {
  display: flex;
  gap: var(--space-md);
  max-width: 450px;
  margin: 0 auto var(--space-md);
}

.newsletter-form input {
  flex: 1;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--color-text-primary);
  outline: none;
}

.newsletter-form input:focus {
  border-color: var(--color-accent);
}

.newsletter-note {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .featured-post {
    grid-template-columns: 1fr;
  }

  .image-placeholder {
    min-height: 250px;
  }

  .newsletter-form {
    flex-direction: column;
  }
}
</style>
