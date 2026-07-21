<template>
  <section class="feature-deep-dive section">
    <div class="container">
      <div
        v-for="(feature, index) in features"
        :key="feature.id"
        :class="['feature-block', { reversed: index % 2 === 1 }]"
        v-motion-fade-visible
      >
        <div class="feature-content">
          <span class="feature-label" :style="{ color: feature.color }">
            <component :is="feature.icon" :size="16" />
            {{ feature.label }}
          </span>
          <h2>{{ feature.title }}</h2>
          <p class="feature-description">{{ feature.description }}</p>

          <ul class="feature-benefits">
            <li v-for="benefit in feature.benefits" :key="benefit">
              <Check :size="18" class="check-icon" />
              {{ benefit }}
            </li>
          </ul>

          <div class="feature-meta" v-if="feature.stats">
            <div
              v-for="stat in feature.stats"
              :key="stat.label"
              class="meta-item"
            >
              <span class="meta-value">{{ stat.value }}</span>
              <span class="meta-label">{{ stat.label }}</span>
            </div>
          </div>

          <div class="feature-actions">
            <router-link to="/features" class="btn btn-primary">
              See it in the demo
              <ArrowRight :size="16" />
            </router-link>
            <router-link to="/docs" class="btn btn-secondary">
              <FileText :size="16" />
              Documentation
            </router-link>
          </div>
        </div>

        <div class="feature-visual">
          <div class="visual-container" :style="{ '--accent': feature.color }">
            <!-- Pack Manager visual -->
            <template v-if="feature.id === 'packs'">
              <div class="pack-table-visual">
                <div class="pt-row pt-head">
                  <span>Pack</span><span>Samples</span><span>Status</span>
                </div>
                <div v-for="pack in packRows" :key="pack.name" class="pt-row">
                  <span class="pt-name">{{ pack.name }}</span>
                  <span>{{ pack.samples }}</span>
                  <span class="pt-status" :class="pack.status">{{ pack.status }}</span>
                </div>
              </div>
            </template>

            <!-- Audio Previews visual -->
            <template v-if="feature.id === 'previews'">
              <div class="samples-visual">
                <div v-for="sample in sampleRows" :key="sample.name" class="sv-row">
                  <div class="sv-play">
                    <Play :size="12" />
                  </div>
                  <span class="sv-name">{{ sample.name }}</span>
                  <div class="sv-waveform">
                    <span v-for="(bar, i) in sample.bars" :key="i" class="sv-bar" :style="{ height: bar + '%' }"></span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Embed Widget visual -->
            <template v-if="feature.id === 'embed'">
              <div class="snippet-visual">
                <pre><code><span class="tag">&lt;div</span> <span class="attr">id</span>=<span class="str">"auxkit-packs"</span><span class="tag">&gt;&lt;/div&gt;</span>
<span class="tag">&lt;script</span>
  <span class="attr">src</span>=<span class="str">"https://embed.auxkit.dev/auxkit-embed.js"</span>
  <span class="attr">data-api-key</span>=<span class="str">"ak_YOUR_KEY"</span>
  <span class="attr">data-target</span>=<span class="str">"#auxkit-packs"</span>
  <span class="attr">async</span>
<span class="tag">&gt;&lt;/script&gt;</span></code></pre>
              </div>
            </template>

            <!-- Stripe Payouts visual -->
            <template v-if="feature.id === 'payouts'">
              <div class="payout-visual">
                <div class="pv-row"><span>Pack price</span><span>€20.00</span></div>
                <div class="pv-row"><span>Platform fee (10%)</span><span>−€2.00</span></div>
                <div class="pv-row"><span>Stripe fee (est.)</span><span>−€0.55</span></div>
                <div class="pv-total"><span>You keep</span><span>€17.45</span></div>
              </div>
            </template>

            <!-- Secure Delivery visual -->
            <template v-if="feature.id === 'delivery'">
              <div class="delivery-visual">
                <div class="dv-icon">
                  <Mail :size="20" />
                </div>
                <div class="dv-body">
                  <span class="dv-title">Your download link</span>
                  <span class="dv-status">5 downloads left · expires in 7 days</span>
                </div>
                <button class="btn btn-secondary btn-sm" type="button">
                  <RefreshCw :size="14" />
                  Resend
                </button>
              </div>
            </template>

            <!-- Portfolio Sites & Song Feeds visual -->
            <template v-if="feature.id === 'portfolio'">
              <div class="artist-visual">
                <div class="av-header">
                  <div class="av-avatar">
                    <Music :size="18" />
                  </div>
                  <span class="av-name">Demo Artist</span>
                </div>
                <div class="av-songs">
                  <div v-for="song in songRows" :key="song" class="av-song">
                    <Play :size="12" />
                    <span>{{ song }}</span>
                  </div>
                </div>
                <span class="av-link">Packs →</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Check, ArrowRight, FileText, Package, AudioLines, Code,
  CreditCard, Lock, Globe, Play, Mail, RefreshCw, Music
} from 'lucide-vue-next'

const features = [
  {
    id: 'packs',
    label: 'Sample Packs',
    icon: Package,
    color: '#f59e0b',
    title: 'Pack Manager',
    description: 'Build and publish sample packs with real metadata — not a folder of zips with a generic checkout bolted on.',
    benefits: [
      'Multipart sample upload',
      'Artwork + preview per pack',
      'BPM/key/duration metadata per sample',
      'Publish triggers automatic bundle build',
      'Draft/published status'
    ],
    stats: [
      { value: '5 GB', label: 'Max per pack' },
      { value: '20 GB', label: 'Seller storage' }
    ]
  },
  {
    id: 'previews',
    label: 'Audio',
    icon: AudioLines,
    color: '#22c55e',
    title: 'Audio Previews',
    description: 'Every sample gets a streaming preview the moment it\'s uploaded, so buyers can hear the pack before they buy it.',
    benefits: [
      'Streaming preview auto-generated for every sample',
      'Per-sample play in widget and pack pages',
      'One shared player, no overlap'
    ],
    stats: [
      { value: 'Every sample', label: 'Coverage' },
      { value: 'Auto-generated', label: 'No manual step' }
    ]
  },
  {
    id: 'embed',
    label: 'Embed',
    icon: Code,
    color: '#6366f1',
    title: 'Embed Widget',
    description: 'Drop a full storefront into any page that accepts a script tag — no SDK, no build step, no integration to configure.',
    benefits: [
      'Single script tag, zero runtime dependencies',
      'Grid view or single-pack detail via data-pack attribute',
      'Prices formatted per currency',
      'Dark-mode aware',
      'Inline checkout errors'
    ],
    stats: [
      { value: '1 script tag', label: 'Setup' },
      { value: '0 dependencies', label: 'Runtime' }
    ]
  },
  {
    id: 'payouts',
    label: 'Commerce',
    icon: CreditCard,
    color: '#8b5cf6',
    title: 'Stripe Payouts',
    description: "Stripe Connect direct charges mean you're the merchant of record — money settles in your own Stripe account, not AuxKit's.",
    benefits: [
      'Connect onboarding from your dashboard',
      "Direct charges — you're the merchant of record",
      'Flat 10% platform fee',
      'Refunds auto-revoke downloads and rebate the fee'
    ],
    stats: [
      { value: '10% flat fee', label: 'Platform cut' },
      { value: '~87-90% to you', label: 'Per sale' }
    ]
  },
  {
    id: 'delivery',
    label: 'Delivery',
    icon: Lock,
    color: '#ef4444',
    title: 'Secure Delivery',
    description: 'No lost-download support tickets. Buyers get a tokenized link with clear limits, and can self-serve when they run out.',
    benefits: [
      'Email delivery with tokenized link',
      '5 downloads, 7-day window',
      'Buyer self-service resend',
      'Extension requests you approve with one click (+5 downloads, +7 days)',
      'Rate-limited to prevent abuse'
    ],
    stats: [
      { value: '5 downloads', label: 'Per link' },
      { value: '7-day window', label: 'Before expiry' }
    ]
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: Globe,
    color: '#06b6d4',
    title: 'Portfolio Sites & Song Feeds',
    description: 'A hosted artist page and song feed are free, forever — commerce is something you turn on when you\'re ready.',
    benefits: [
      'Hosted artist page',
      'Song list management',
      'Pack catalogue',
      'Free tier with 3 GB storage'
    ],
    stats: [
      { value: '3 GB free', label: 'Storage' },
      { value: '€0', label: 'Cost' }
    ]
  }
]

const packRows = [
  { name: 'Demo Drums Vol. 1', samples: 42, status: 'published' },
  { name: 'Demo Textures', samples: 18, status: 'published' },
  { name: 'Demo Vocal Chops', samples: 26, status: 'draft' }
]

const sampleRows = [
  { name: 'Kick 01', bars: [40, 70, 55, 90, 60, 35, 80] },
  { name: 'Snare 02', bars: [60, 30, 75, 45, 85, 55, 40] },
  { name: 'Hi-Hat Loop', bars: [25, 55, 40, 70, 30, 60, 45] }
]

const songRows = ['Late Nights', 'Analog Drift', 'Nocturne 04']
</script>

<style scoped>
.feature-deep-dive {
  background: var(--color-bg);
}

.feature-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
  align-items: center;
  padding: var(--space-4xl) 0;
  border-bottom: 1px solid var(--color-border-subtle);
}

.feature-block:last-child {
  border-bottom: none;
}

.feature-block.reversed {
  direction: rtl;
}

.feature-block.reversed > * {
  direction: ltr;
}

.feature-content {
  max-width: 520px;
}

.feature-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
}

.feature-content h2 {
  font-size: 2.25rem;
  margin-bottom: var(--space-lg);
}

.feature-description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.feature-benefits {
  list-style: none;
  margin-bottom: var(--space-xl);
}

.feature-benefits li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: var(--space-sm) 0;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.check-icon {
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-meta {
  display: flex;
  gap: var(--space-2xl);
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-xl);
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
}

.meta-label {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.feature-actions {
  display: flex;
  gap: var(--space-md);
}

/* Visuals */
.feature-visual {
  display: flex;
  justify-content: center;
}

.visual-container {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 4/3;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.btn-sm {
  padding: var(--space-xs) var(--space-md);
  font-size: 0.8125rem;
}

/* Pack table visual */
.pack-table-visual {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.pt-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border-subtle);
}

.pt-row:last-child {
  border-bottom: none;
}

.pt-head {
  background: var(--color-bg-elevated);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.pt-name {
  color: var(--color-text-primary);
  font-weight: 500;
}

.pt-status {
  text-transform: capitalize;
  font-weight: 600;
}

.pt-status.published { color: var(--color-success); }
.pt-status.draft { color: var(--color-warning); }

/* Samples visual */
.samples-visual {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.sv-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.sv-play {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-accent);
}

.sv-name {
  flex-shrink: 0;
  width: 72px;
  font-size: 0.75rem;
  color: var(--color-text-primary);
}

.sv-waveform {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 24px;
}

.sv-bar {
  flex: 1;
  background: var(--color-accent);
  opacity: 0.6;
  border-radius: 2px;
}

/* Snippet visual */
.snippet-visual {
  width: 100%;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

.snippet-visual pre {
  margin: 0;
  padding: var(--space-lg);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.snippet-visual .tag { color: var(--color-accent-hover); }
.snippet-visual .attr { color: #f59e0b; }
.snippet-visual .str { color: #22c55e; }

/* Payout visual */
.payout-visual {
  width: 100%;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

.pv-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-xs) 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.pv-total {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* Delivery visual */
.delivery-visual {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

.dv-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-md);
}

.dv-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.dv-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.dv-status {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Artist visual */
.artist-visual {
  width: 100%;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

.av-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.av-avatar {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: 50%;
}

.av-name {
  font-weight: 600;
  color: var(--color-text-primary);
}

.av-songs {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.av-song {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.av-link {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
}

@media (max-width: 1024px) {
  .feature-block {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .feature-block.reversed {
    direction: ltr;
  }

  .feature-content {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .feature-content h2 {
    font-size: 1.75rem;
  }

  .feature-actions {
    flex-direction: column;
  }

  .feature-meta {
    flex-direction: column;
    gap: var(--space-md);
  }
}
</style>
