<template>
  <main class="about-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible>About AuxKit</span>
        <h1 v-motion-slide-visible-bottom>We build tools that<br/>remove friction, not add options</h1>
        <p class="hero-desc" v-motion-slide-visible-bottom :delay="100">
          A team of operators, engineers, and designers who got tired of tools that promised simplicity and delivered complexity.
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="mission-section section">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-content" v-motion-slide-visible-left>
            <h2>Our Mission</h2>
            <p class="mission-statement">
              "We build tools that remove friction, not add options."
            </p>
            <p>
              Every feature we add has to earn its place. We believe the best software feels invisible—it just works, letting you focus on the work that matters.
            </p>
            <p>
              We're not trying to build the everything platform. We're building the right things, done exceptionally well, that connect seamlessly to form your perfect workflow.
            </p>
          </div>
          <div class="mission-visual" v-motion-slide-visible-right>
            <div class="visual-box">
              <div class="visual-element"></div>
              <div class="visual-element"></div>
              <div class="visual-element"></div>
              <div class="visual-element center"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="philosophy-section section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Philosophy</span>
          <h2>Why modular?</h2>
          <p>We believe in tools that adapt to you, not the other way around.</p>
        </div>

        <div class="grid grid-3">
          <div 
            v-for="(principle, index) in principles" 
            :key="principle.title"
            class="principle-card"
            v-motion-slide-visible-bottom
            :delay="index * 100"
          >
            <div class="principle-icon">
              <component :is="principle.icon" :size="28" />
            </div>
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="story-section section">
      <div class="container container-narrow">
        <div class="story-content" v-motion-fade-visible>
          <h2>The AuxKit Story</h2>
          <p>
            AuxKit started with a frustration shared by anyone who's tried to coordinate work across a team: too many tools, too little integration, too much time lost to friction.
          </p>
          <p>
            Our founding team came from operations, engineering, and product roles at companies of all sizes. We'd all experienced the same pattern: adopt a new tool to solve one problem, only to create three new ones.
          </p>
          <p>
            So we asked: what if we built a system where every component was designed to work together from day one? What if you could pick exactly what you need, and everything just... connected?
          </p>
          <p>
            That's AuxKit. A modular toolkit that grows with your team, adapts to your workflows, and stays out of your way while you do the work that matters.
          </p>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">Team</span>
          <h2>The people behind AuxKit</h2>
          <p>A small, focused team building tools we want to use ourselves.</p>
        </div>

        <div class="grid grid-4">
          <div 
            v-for="(member, index) in team" 
            :key="member.name"
            class="team-card"
            v-motion-slide-visible-bottom
            :delay="index * 75"
          >
            <div class="member-avatar">{{ member.name.charAt(0) }}</div>
            <h4>{{ member.name }}</h4>
            <span class="member-role">{{ member.role }}</span>
            <p class="member-bio">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section section">
      <div class="container">
        <div class="values-grid">
          <div class="values-header" v-motion-slide-visible-left>
            <span class="badge mb-lg">Values</span>
            <h2>What we believe</h2>
            <p>
              These principles guide every decision we make, from product features to customer support.
            </p>
          </div>
          <div class="values-list" v-motion-slide-visible-right>
            <div v-for="value in values" :key="value.title" class="value-item">
              <h4>{{ value.title }}</h4>
              <p>{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Careers CTA -->
    <section class="careers-section section">
      <div class="container">
        <div class="careers-box" v-motion-fade-visible>
          <div class="careers-content">
            <h2>Join the team</h2>
            <p>
              We're always looking for thoughtful people who care deeply about building great products. Remote-first, async-friendly, and focused on impact.
            </p>
          </div>
          <a href="#" class="btn btn-primary btn-lg">
            View Open Positions
            <ArrowRight :size="18" />
          </a>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>

<script setup>
import { Blocks, Puzzle, Gauge, Sparkles, ArrowRight } from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'

const principles = [
  {
    icon: Blocks,
    title: 'Composability First',
    description: 'Every module is built to work independently or together. No forced bundles, no artificial dependencies.'
  },
  {
    icon: Puzzle,
    title: 'Integrate, Don\'t Replace',
    description: 'We meet you where you are. AuxKit enhances your existing stack instead of demanding you replace it.'
  },
  {
    icon: Gauge,
    title: 'Simplicity is Hard',
    description: 'We spend the time to make things simple so you don\'t have to. Complexity is the easy path; we take the harder one.'
  }
]

const team = [
  {
    name: 'Alex Rivera',
    role: 'CEO & Co-founder',
    bio: 'Former Head of Ops at Scale AI. Obsessed with removing friction from work.'
  },
  {
    name: 'Jordan Chen',
    role: 'CTO & Co-founder',
    bio: 'Ex-Stripe engineer. Believes the best code is the code you don\'t have to write.'
  },
  {
    name: 'Sam Williams',
    role: 'Head of Product',
    bio: 'Previously at Notion. Focused on making complex things feel simple.'
  },
  {
    name: 'Taylor Kim',
    role: 'Head of Design',
    bio: 'Ex-Linear design lead. Champions clarity over cleverness.'
  }
]

const values = [
  {
    title: 'Clarity over completeness',
    description: 'We\'d rather do fewer things exceptionally well than many things poorly.'
  },
  {
    title: 'Honest defaults',
    description: 'Our settings work out of the box. No dark patterns, no gotchas.'
  },
  {
    title: 'Ship and iterate',
    description: 'We believe in getting things into users\' hands and improving based on real feedback.'
  },
  {
    title: 'Documentation is product',
    description: 'If it\'s not documented, it doesn\'t exist. Our docs are as important as our code.'
  }
]
</script>

<style scoped>
.about-page {
  padding-top: 72px;
}

.page-hero {
  padding: var(--space-4xl) 0;
  text-align: center;
  background: var(--color-bg);
}

.page-hero h1 {
  max-width: 900px;
  margin: 0 auto var(--space-lg);
}

.hero-desc {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.25rem;
}

/* Mission */
.mission-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
  align-items: center;
}

.mission-content h2 {
  font-size: 2rem;
  margin-bottom: var(--space-xl);
}

.mission-statement {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-text-primary);
  padding-left: var(--space-lg);
  border-left: 3px solid var(--color-accent);
  margin-bottom: var(--space-xl);
}

.mission-content p {
  font-size: 1.0625rem;
  margin-bottom: var(--space-lg);
}

.mission-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-box {
  position: relative;
  width: 300px;
  height: 300px;
}

.visual-element {
  position: absolute;
  width: 80px;
  height: 80px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.visual-element:nth-child(1) { top: 0; left: 0; }
.visual-element:nth-child(2) { top: 0; right: 0; }
.visual-element:nth-child(3) { bottom: 0; left: 0; }
.visual-element:nth-child(4) { bottom: 0; right: 0; }

.visual-element.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: var(--color-accent-subtle);
  border-color: var(--color-accent);
}

/* Philosophy */
.philosophy-section {
  background: var(--color-bg);
}

.principle-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.principle-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.principle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-lg);
  background: var(--color-accent-subtle);
  border-radius: var(--radius-lg);
  color: var(--color-accent);
}

.principle-card h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

/* Story */
.story-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.story-content h2 {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.story-content p {
  font-size: 1.125rem;
  margin-bottom: var(--space-lg);
  line-height: 1.8;
}

/* Team */
.team-section {
  background: var(--color-bg);
}

.team-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.team-card:hover {
  border-color: var(--color-accent);
}

.member-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-lg);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: var(--radius-full);
}

.team-card h4 {
  font-size: 1.125rem;
  margin-bottom: var(--space-xs);
}

.member-role {
  font-size: 0.875rem;
  color: var(--color-accent);
  display: block;
  margin-bottom: var(--space-md);
}

.member-bio {
  font-size: 0.875rem;
}

/* Values */
.values-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
}

.values-header h2 {
  margin-bottom: var(--space-lg);
}

.values-header p {
  font-size: 1.125rem;
}

.values-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.value-item {
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.value-item h4 {
  font-size: 1rem;
  margin-bottom: var(--space-sm);
}

.value-item p {
  font-size: 0.9375rem;
}

/* Careers */
.careers-section {
  background: var(--color-bg);
}

.careers-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2xl);
  padding: var(--space-3xl);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-xl);
}

.careers-content h2 {
  font-size: 1.75rem;
  margin-bottom: var(--space-md);
}

.careers-content p {
  font-size: 1.0625rem;
  max-width: 500px;
}

@media (max-width: 1024px) {
  .mission-grid,
  .values-grid {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .visual-box {
    display: none;
  }

  .careers-box {
    flex-direction: column;
    text-align: center;
  }
}
</style>
