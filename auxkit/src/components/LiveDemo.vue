<template>
  <section class="live-demo section">
    <div class="container">
      <div class="section-header">
        <span class="badge mb-lg">Widget Simulation</span>
        <h2>See the embed widget in action</h2>
        <p>This is what the widget renders on your site. Click through the tabs to explore it.</p>
      </div>

      <div class="demo-wrapper" v-motion-fade-visible>
        <!-- Real embed snippet -->
        <div class="embed-callout">
          <div class="embed-callout-header">
            <div class="window-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="embed-callout-title">index.html</span>
          </div>
          <pre class="embed-code"><code><span class="tag">&lt;div</span> <span class="attr">id</span>=<span class="str">"auxkit-packs"</span><span class="tag">&gt;&lt;/div&gt;</span>
<span class="tag">&lt;script</span>
  <span class="attr">src</span>=<span class="str">"https://embed.auxkit.dev/auxkit-embed.js"</span>
  <span class="attr">data-api-key</span>=<span class="str">"ak_YOUR_KEY"</span>
  <span class="attr">data-target</span>=<span class="str">"#auxkit-packs"</span>
  <span class="attr">async</span>
<span class="tag">&gt;&lt;/script&gt;</span></code></pre>
          <p class="embed-caption">Simulation of the widget UI — the real thing is one dependency-free JS file.</p>
        </div>

        <!-- Demo Controls -->
        <div class="demo-tabs">
          <button
            v-for="tab in demoTabs"
            :key="tab.id"
            class="demo-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" :size="18" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Demo Screen -->
        <div class="demo-screen">
          <div class="screen-header">
            <div class="window-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="screen-title">
              <component :is="currentTab.icon" :size="16" />
              {{ currentTab.label }} — auxkit-packs
            </div>
            <div class="screen-actions">
              <button class="action-btn">
                <Share2 :size="14" />
              </button>
              <button class="action-btn">
                <Maximize2 :size="14" />
              </button>
            </div>
          </div>

          <div class="screen-content">
            <!-- Storefront grid -->
            <div v-if="activeTab === 'grid'" class="demo-grid">
              <div class="pack-grid">
                <div v-for="pack in packs" :key="pack.id" class="pack-card">
                  <div class="pack-artwork">
                    <span>{{ pack.name.charAt(0) }}</span>
                    <button class="preview-btn" @click="togglePlay(pack.id)">
                      <Pause v-if="playingId === pack.id" :size="16" />
                      <Play v-else :size="16" />
                    </button>
                  </div>
                  <div class="pack-info">
                    <span class="pack-genre">{{ pack.genre }}</span>
                    <h4 class="pack-name">{{ pack.name }}</h4>
                    <div class="pack-footer">
                      <span class="pack-price">{{ pack.price }}</span>
                      <button class="btn btn-primary btn-sm">Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pack detail -->
            <div v-if="activeTab === 'detail'" class="demo-detail">
              <div class="pack-detail">
                <div class="detail-artwork">
                  <span>{{ detailPack.name.charAt(0) }}</span>
                </div>
                <div class="detail-info">
                  <span class="pack-genre">{{ detailPack.genre }}</span>
                  <h3>{{ detailPack.name }}</h3>
                  <span class="detail-license">{{ detailPack.license }}</span>
                  <p class="detail-description">{{ detailPack.description }}</p>
                  <div class="detail-tags">
                    <span v-for="tag in detailPack.tags" :key="tag" class="tag-chip">{{ tag }}</span>
                  </div>
                  <div class="detail-buy">
                    <span class="pack-price">{{ detailPack.price }}</span>
                    <button class="btn btn-primary btn-sm">Buy</button>
                  </div>
                </div>
              </div>
              <div class="sample-list">
                <div
                  v-for="sample in samples"
                  :key="sample.id"
                  class="sample-row"
                >
                  <button class="sample-play" @click="toggleSamplePlay(sample.id)">
                    <Pause v-if="playingSampleId === sample.id" :size="14" />
                    <Play v-else :size="14" />
                  </button>
                  <span class="sample-name">{{ sample.name }}</span>
                  <span class="sample-meta">{{ sample.bpm }} BPM · {{ sample.key }} · {{ sample.duration }}</span>
                </div>
              </div>
            </div>

            <!-- What happens on Buy -->
            <div v-if="activeTab === 'buy'" class="demo-buy">
              <div class="buy-stepper">
                <button
                  v-for="(step, index) in buySteps"
                  :key="index"
                  class="buy-step"
                  :class="{ active: activeStep === index }"
                  @click="activeStep = index"
                >
                  <span class="step-number">{{ index + 1 }}</span>
                  <span class="step-title">{{ step.title }}</span>
                </button>
              </div>
              <div class="buy-explanation">
                <p>{{ buySteps[activeStep].detail }}</p>
              </div>
            </div>
          </div>

          <!-- Live Status Bar -->
          <div class="screen-footer">
            <div class="status-left">
              <span class="status-dot online"></span>
              Simulated
            </div>
            <div class="status-center">
              <span v-if="activeTab === 'grid'">{{ packs.length }} packs</span>
              <span v-if="activeTab === 'detail'">{{ samples.length }} samples</span>
              <span v-if="activeTab === 'buy'">Step {{ activeStep + 1 }} of {{ buySteps.length }}</span>
            </div>
            <div class="status-right">
              No real checkout occurs
            </div>
          </div>
        </div>

        <!-- Demo CTA -->
        <div class="demo-cta">
          <p>This is a simulation of the widget UI — the real thing is a single script tag, no build step, no SDK.</p>
          <router-link to="/docs" class="btn btn-primary">
            Read the embed docs
            <ArrowRight :size="18" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  LayoutGrid, Disc3, CreditCard, Share2, Maximize2, Play, Pause, ArrowRight
} from 'lucide-vue-next'

const activeTab = ref('grid')
const playingId = ref(null)
const playingSampleId = ref(null)
const activeStep = ref(0)

const demoTabs = [
  { id: 'grid', label: 'Storefront grid', icon: LayoutGrid },
  { id: 'detail', label: 'Pack detail', icon: Disc3 },
  { id: 'buy', label: 'What happens on Buy', icon: CreditCard }
]

const currentTab = computed(() => demoTabs.find(t => t.id === activeTab.value))

const packs = [
  { id: 1, name: 'Demo Drums Vol. 1', genre: 'Drums', price: '€14.99' },
  { id: 2, name: 'Demo Textures', genre: 'Ambient', price: '€9.99' },
  { id: 3, name: 'Demo Vocal Chops', genre: 'Vocals', price: '€12.99' }
]

const detailPack = {
  name: 'Demo Drums Vol. 1',
  genre: 'Drums',
  license: 'Royalty-free license',
  description: '128 punchy one-shots and loops for boom-bap and lo-fi beats — mixed and mastered, ready to drop into your DAW.',
  tags: ['Drums', 'Lo-fi', 'One-shots', 'Loops'],
  price: '€14.99'
}

const samples = [
  { id: 1, name: 'Kick 01', bpm: 124, key: 'C min', duration: '0:02' },
  { id: 2, name: 'Snare 02', bpm: 124, key: 'C min', duration: '0:01' },
  { id: 3, name: 'Hi-Hat Loop', bpm: 124, key: '—', duration: '0:04' },
  { id: 4, name: 'Bass One-Shot', bpm: 124, key: 'C min', duration: '0:03' },
  { id: 5, name: 'Full Loop', bpm: 124, key: 'C min', duration: '0:08' }
]

const buySteps = [
  {
    title: 'Widget POSTs to /public/packs/{id}/checkout',
    detail: "Clicking Buy calls the pack's checkout endpoint, with your API key attached as an Authorization header."
  },
  {
    title: "Buyer pays on Stripe Checkout",
    detail: "You're the merchant of record — the buyer completes payment on Stripe's hosted checkout page, under your own Stripe account."
  },
  {
    title: 'Webhook records the purchase',
    detail: "Stripe notifies AuxKit's webhook, which creates the purchase record and kicks off delivery."
  },
  {
    title: 'Buyer gets an email with a secure link',
    detail: '5 downloads, valid for 7 days. The buyer can request a resend or an extension anytime, no support ticket needed.'
  }
]

function togglePlay(id) {
  playingId.value = playingId.value === id ? null : id
}

function toggleSamplePlay(id) {
  playingSampleId.value = playingSampleId.value === id ? null : id
}
</script>

<style scoped>
.live-demo {
  background: var(--color-bg);
}

.demo-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

/* Embed callout */
.embed-callout {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-xl);
}

.embed-callout-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}

.embed-callout-title {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.embed-code {
  margin: 0;
  padding: var(--space-lg);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  overflow-x: auto;
  color: var(--color-text-secondary);
}

.embed-code .tag { color: var(--color-accent-hover); }
.embed-code .attr { color: #f59e0b; }
.embed-code .str { color: #22c55e; }

.embed-caption {
  padding: 0 var(--space-lg) var(--space-lg);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

/* Tabs */
.demo-tabs {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  padding: var(--space-sm);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.demo-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.demo-tab:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.demo-tab.active {
  background: var(--color-accent);
  color: white;
}

/* Screen */
.demo-screen {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.screen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}

.window-controls {
  display: flex;
  gap: var(--space-sm);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #22c55e; }

.screen-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.screen-actions {
  display: flex;
  gap: var(--space-xs);
}

.action-btn {
  padding: var(--space-xs);
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.screen-content {
  min-height: 400px;
}

/* Storefront grid */
.demo-grid {
  padding: var(--space-xl);
}

.pack-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.pack-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.pack-card:hover {
  border-color: var(--color-accent);
}

.pack-artwork {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-size: 2.5rem;
  font-weight: 700;
}

.preview-btn {
  position: absolute;
  bottom: var(--space-sm);
  right: var(--space-sm);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-primary);
  cursor: pointer;
}

.preview-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.pack-info {
  padding: var(--space-md);
}

.pack-genre {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pack-name {
  font-size: 0.9375rem;
  margin: var(--space-xs) 0 var(--space-sm);
}

.pack-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pack-price {
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Pack detail */
.demo-detail {
  padding: var(--space-xl);
}

.pack-detail {
  display: flex;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.detail-artwork {
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-size: 3.5rem;
  font-weight: 700;
  border-radius: var(--radius-lg);
}

.detail-info h3 {
  font-size: 1.375rem;
  margin: var(--space-xs) 0 var(--space-sm);
}

.detail-license {
  display: inline-block;
  margin-bottom: var(--space-sm);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.detail-description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-lg);
}

.tag-chip {
  padding: 2px var(--space-sm);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.detail-buy {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.sample-list {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.sample-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border-subtle);
}

.sample-row:last-child {
  border-bottom: none;
}

.sample-play {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-primary);
  cursor: pointer;
}

.sample-play:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.sample-name {
  flex: 1;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.sample-meta {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

/* What happens on Buy */
.demo-buy {
  padding: var(--space-xl);
}

.buy-stepper {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 560px;
  margin: 0 auto var(--space-xl);
}

.buy-step {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.buy-step:hover {
  border-color: var(--color-accent);
}

.buy-step.active {
  background: var(--color-accent-subtle);
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

.step-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-elevated);
  border-radius: 50%;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.buy-step.active .step-number {
  background: var(--color-accent);
  color: white;
}

.step-title {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
}

.buy-explanation {
  max-width: 560px;
  margin: 0 auto;
  padding: var(--space-lg);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  text-align: center;
}

/* Footer */
.screen-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-lg);
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.status-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.online {
  background: var(--color-success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* CTA */
.demo-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  margin-top: var(--space-xl);
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.demo-cta p {
  font-size: 1rem;
}

@media (max-width: 1024px) {
  .pack-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pack-detail {
    flex-direction: column;
  }

  .detail-artwork {
    width: 120px;
    height: 120px;
  }

  .demo-cta {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .pack-grid {
    grid-template-columns: 1fr;
  }

  .sample-meta {
    font-size: 0.75rem;
  }
}
</style>
