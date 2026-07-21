<template>
  <section id="developer-api" class="dev-api section grid-texture">
    <div class="container">
      <div class="dev-api__grid">
        <div class="dev-api__intro" v-motion-slide-visible-once-left>
          <SectionLabel>Developer API and Embed Widget</SectionLabel>
          <h2>Build sample-pack commerce into your own site</h2>
          <p>
            A public API and a drop-in embed widget power the storefront without you
            writing a checkout flow. Authorize requests with an API key (created and
            revealed from your dashboard). Only <code>GET /public/packs</code> and
            <code>GET /public/packs/{id}</code> are read-only and safe to call
            straight from a browser or a build step. Everything else below is
            state-changing—including <code>GET /download</code>, which consumes one of
            the buyer's 5 downloads per request, so it must only be triggered on a
            buyer's click, never prefetched or cached:
          </p>

          <ul class="dev-api__endpoints">
            <li>
              <code>GET /public/packs</code>
              <span>List published packs</span>
            </li>
            <li>
              <code>GET /public/packs/{id}</code>
              <span>Pack detail, with samples</span>
            </li>
            <li>
              <code>POST /public/packs/{id}/checkout</code>
              <span>Start a Stripe Checkout session</span>
            </li>
            <li>
              <code>GET /download?token=</code>
              <span>Redirects to the presigned download—consumes one download per request, never prefetch or cache</span>
            </li>
            <li>
              <code>POST /public/purchases/resend</code>
              <span>Resend a download link</span>
            </li>
            <li>
              <code>POST /public/purchases/request-extension</code>
              <span>Request +5 downloads, +7 days</span>
            </li>
          </ul>

          <p class="dev-api__meta">Bearer ak_ keys · 60 req/min · domain-restricted · 1-year expiry</p>

          <p>
            When a buyer clicks purchase, the checkout endpoint starts a Stripe
            Checkout session for the pack; the embed widget calls it for you. Buyers
            get self-service too—resending a download link or requesting an extension
            doesn't require contacting support.
          </p>

          <router-link to="/docs" class="btn btn-secondary">
            Read the docs
            <ArrowRight :size="18" />
          </router-link>
        </div>

        <div class="dev-api__snippet" v-motion-slide-visible-once-right>
          <EmbedCodeSnippet />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
import SectionLabel from './SectionLabel.vue'
import EmbedCodeSnippet from './EmbedCodeSnippet.vue'
</script>

<style scoped>
.dev-api {
  background: var(--bg);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.dev-api__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: start;
}

.dev-api__intro h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: var(--space-lg);
}

.dev-api__intro p {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.dev-api__endpoints {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  margin-bottom: var(--space-lg);
}

.dev-api__endpoints li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--border);
}

.dev-api__endpoints li:last-child {
  border-bottom: none;
}

.dev-api__endpoints code {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--accent-hover);
}

.dev-api__endpoints span {
  font-size: 0.8125rem;
  color: var(--text-faint);
}

.dev-api__meta {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-faint);
  margin-bottom: var(--space-lg);
}

.dev-api__snippet {
  position: sticky;
  top: 100px;
}

@media (max-width: 1024px) {
  .dev-api__grid {
    grid-template-columns: 1fr;
  }

  .dev-api__snippet {
    position: static;
  }
}

@media (max-width: 640px) {
  .dev-api__endpoints li {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
