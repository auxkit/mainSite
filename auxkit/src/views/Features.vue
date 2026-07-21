<template>
  <main class="features-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <span class="badge mb-lg" v-motion-fade-visible-once>Features</span>
        <h1 v-motion-slide-visible-once-bottom>Everything you need to sell sounds direct</h1>
        <p class="hero-desc" v-motion-slide-visible-once-bottom :delay="100">
          One platform: your portfolio, your storefront, your payouts.
        </p>
      </div>
    </section>

    <!-- Feature Deep Dives -->
    <FeatureDeepDive />

    <!-- Interactive Demo Section -->
    <section class="demo-section section">
      <div class="container">
        <div class="section-header">
          <span class="badge mb-lg">See It Work</span>
          <h2>How each feature actually behaves</h2>
          <p>Static mocks of the real dashboard, widget, and buyer flow — pick a feature to preview it.</p>
        </div>

        <div class="demo-container" v-motion-fade-visible-once>
          <div class="demo-sidebar">
            <div
              v-for="(module, index) in demoModules"
              :key="module.id"
              class="demo-module"
              :class="{ active: activeModule === index }"
              @click="activeModule = index"
            >
              <component :is="module.icon" :size="20" />
              <span>{{ module.name }}</span>
            </div>
          </div>
          <div class="demo-preview">
            <div class="demo-screen">
              <div class="demo-header">
                <div class="demo-dots">
                  <span></span><span></span><span></span>
                </div>
                <span class="demo-title">{{ demoModules[activeModule].name }}</span>
              </div>
              <div class="demo-content">
                <!-- 1. Pack Manager: mini pack table -->
                <div v-if="activeModule === 0" class="mock mock-pack-table">
                  <div class="mock-row mock-row--head">
                    <span>Pack</span><span>Samples</span><span>Status</span>
                  </div>
                  <div v-for="pack in mockPacks" :key="pack.name" class="mock-row">
                    <span class="mock-pack-name">{{ pack.name }}</span>
                    <span>{{ pack.samples }}</span>
                    <span class="mock-status" :class="pack.status">{{ pack.status }}</span>
                  </div>
                </div>

                <!-- 2. Audio Previews: sample rows with play + waveform -->
                <div v-else-if="activeModule === 1" class="mock mock-samples">
                  <div v-for="sample in mockSamples" :key="sample.name" class="mock-sample-row">
                    <button
                      class="mock-play-btn"
                      :class="{ playing: playingSample === sample.name }"
                      @click="playingSample = playingSample === sample.name ? null : sample.name"
                    >
                      <Pause v-if="playingSample === sample.name" :size="14" />
                      <Play v-else :size="14" />
                    </button>
                    <span class="mock-sample-name">{{ sample.name }}</span>
                    <div class="mock-waveform">
                      <span
                        v-for="(bar, i) in sample.bars"
                        :key="i"
                        class="mock-bar"
                        :class="{ active: playingSample === sample.name }"
                        :style="{ height: bar + '%' }"
                      ></span>
                    </div>
                  </div>
                </div>

                <!-- 3. Embed Widget: script tag snippet -->
                <div v-else-if="activeModule === 2" class="mock mock-snippet">
                  <pre><code><span class="tag">&lt;div</span> <span class="attr">id</span>=<span class="str">"auxkit-packs"</span><span class="tag">&gt;&lt;/div&gt;</span>
<span class="tag">&lt;script</span>
  <span class="attr">src</span>=<span class="str">"https://embed.auxkit.dev/auxkit-embed.js"</span>
  <span class="attr">data-api-key</span>=<span class="str">"ak_YOUR_KEY"</span>
  <span class="attr">data-target</span>=<span class="str">"#auxkit-packs"</span>
  <span class="attr">async</span>
<span class="tag">&gt;&lt;/script&gt;</span></code></pre>
                </div>

                <!-- 4. Stripe Payouts: €20 breakdown -->
                <div v-else-if="activeModule === 3" class="mock mock-payout">
                  <div class="mock-payout-row">
                    <span>Pack price</span>
                    <span>€20.00</span>
                  </div>
                  <div class="mock-payout-row">
                    <span>Platform fee (10%)</span>
                    <span>−€2.00</span>
                  </div>
                  <div class="mock-payout-row">
                    <span>Stripe fee (est.)</span>
                    <span>−€0.55</span>
                  </div>
                  <div class="mock-payout-total">
                    <span>You keep</span>
                    <span>€17.45</span>
                  </div>
                </div>

                <!-- 5. Secure Delivery: download link card -->
                <div v-else-if="activeModule === 4" class="mock mock-delivery">
                  <div class="mock-delivery-icon">
                    <Mail :size="20" />
                  </div>
                  <div class="mock-delivery-body">
                    <span class="mock-delivery-title">Your download link</span>
                    <span class="mock-delivery-status">5 downloads left · expires in 7 days</span>
                  </div>
                  <button class="btn btn-secondary btn-sm">
                    <RefreshCw :size="14" />
                    Resend
                  </button>
                </div>

                <!-- 6. Portfolio Sites & Song Feeds: mini artist page -->
                <div v-else class="mock mock-artist">
                  <div class="mock-artist-header">
                    <div class="mock-artist-avatar">
                      <Music :size="18" />
                    </div>
                    <span class="mock-artist-name">Demo Artist</span>
                  </div>
                  <div class="mock-song-list">
                    <div v-for="song in mockSongs" :key="song" class="mock-song-row">
                      <Play :size="12" />
                      <span>{{ song }}</span>
                    </div>
                  </div>
                  <span class="mock-artist-link">Packs →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- No integrations needed -->
    <section class="integrations-section section">
      <div class="container">
        <div class="integrations-strip" v-motion-fade-visible-once>
          <div class="strip-icon">
            <Code :size="22" />
          </div>
          <p>No integrations to configure — one script tag and a plain REST API.</p>
          <router-link to="/docs" class="btn btn-secondary">
            Read the docs
            <ArrowRight :size="18" />
          </router-link>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import {
  Package, AudioLines, Code, CreditCard, Lock, Globe,
  Play, Pause, Mail, RefreshCw, Music, ArrowRight
} from 'lucide-vue-next'
import CTASection from '../components/CTASection.vue'
import FeatureDeepDive from '../components/FeatureDeepDive.vue'

const activeModule = ref(0)
const playingSample = ref(null)

const demoModules = [
  { id: 'packs', name: 'Pack Manager', icon: Package },
  { id: 'previews', name: 'Audio Previews', icon: AudioLines },
  { id: 'embed', name: 'Embed Widget', icon: Code },
  { id: 'payouts', name: 'Stripe Payouts', icon: CreditCard },
  { id: 'delivery', name: 'Secure Delivery', icon: Lock },
  { id: 'portfolio', name: 'Portfolio Sites & Song Feeds', icon: Globe }
]

const mockPacks = [
  { name: 'Demo Drums Vol. 1', samples: 42, status: 'published' },
  { name: 'Demo Textures', samples: 18, status: 'published' },
  { name: 'Demo Vocal Chops', samples: 26, status: 'draft' }
]

const mockSamples = [
  { name: 'Kick 01', bars: [40, 70, 55, 90, 60, 35, 80, 50] },
  { name: 'Snare 02', bars: [60, 30, 75, 45, 85, 55, 40, 65] },
  { name: 'Hi-Hat Loop', bars: [25, 55, 40, 70, 30, 60, 45, 35] }
]

const mockSongs = ['Late Nights', 'Analog Drift', 'Nocturne 04']
</script>

<style scoped>
.features-page {
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

/* Demo Section */
.demo-section {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.demo-container {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.demo-sidebar {
  background: var(--color-bg-elevated);
  padding: var(--space-lg);
  border-right: 1px solid var(--color-border);
}

.demo-module {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.9375rem;
}

.demo-module:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.demo-module.active {
  background: var(--color-accent-subtle);
  color: var(--color-accent);
}

.demo-preview {
  padding: var(--space-xl);
}

.demo-screen {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}

.demo-dots {
  display: flex;
  gap: var(--space-xs);
}

.demo-dots span {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-border);
}

.demo-title {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.demo-content {
  padding: var(--space-2xl);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mock {
  width: 100%;
  max-width: 480px;
}

/* 1. Pack table */
.mock-pack-table {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.mock-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  font-size: 0.875rem;
  border-bottom: 1px solid var(--color-border-subtle);
  color: var(--color-text-secondary);
}

.mock-row:last-child {
  border-bottom: none;
}

.mock-row--head {
  background: var(--color-bg-elevated);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.mock-pack-name {
  color: var(--color-text-primary);
  font-weight: 500;
}

.mock-status {
  text-transform: capitalize;
  font-weight: 600;
  font-size: 0.8125rem;
}

.mock-status.published { color: var(--color-success); }
.mock-status.draft { color: var(--color-warning); }

/* 2. Samples with waveform */
.mock-samples {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.mock-sample-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.mock-play-btn {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-primary);
  cursor: pointer;
}

.mock-play-btn.playing,
.mock-play-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.mock-sample-name {
  flex-shrink: 0;
  width: 90px;
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

.mock-waveform {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 28px;
}

.mock-bar {
  flex: 1;
  background: var(--color-border);
  border-radius: 2px;
  transition: background var(--transition-fast);
}

.mock-bar.active {
  background: var(--color-accent);
}

/* 3. Snippet */
.mock-snippet {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

.mock-snippet pre {
  margin: 0;
  padding: var(--space-lg);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.mock-snippet .tag { color: var(--color-accent-hover); }
.mock-snippet .attr { color: #f59e0b; }
.mock-snippet .str { color: #22c55e; }

/* 4. Payout breakdown */
.mock-payout {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

.mock-payout-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-xs) 0;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.mock-payout-total {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* 5. Delivery card */
.mock-delivery {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-xl);
}

.mock-delivery-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-md);
}

.mock-delivery-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mock-delivery-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.mock-delivery-status {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.btn-sm {
  padding: var(--space-xs) var(--space-md);
  font-size: 0.8125rem;
}

/* 6. Artist page */
.mock-artist {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

.mock-artist-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.mock-artist-avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: 50%;
}

.mock-artist-name {
  font-weight: 600;
  color: var(--color-text-primary);
}

.mock-song-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.mock-song-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.mock-artist-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
}

/* Integrations strip */
.integrations-section {
  background: var(--color-bg);
}

.integrations-strip {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xl) var(--space-2xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.strip-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-lg);
}

.integrations-strip p {
  flex: 1;
  font-size: 1.0625rem;
  color: var(--color-text-primary);
  margin: 0;
}

@media (max-width: 1024px) {
  .demo-container {
    grid-template-columns: 1fr;
  }

  .demo-sidebar {
    display: flex;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-md);
    gap: var(--space-sm);
  }

  .demo-module {
    white-space: nowrap;
  }
}

@media (max-width: 640px) {
  .integrations-strip {
    flex-direction: column;
    text-align: center;
  }

  .mock-row {
    font-size: 0.8125rem;
  }

  .mock-sample-name {
    width: 70px;
  }
}
</style>
