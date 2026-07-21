<template>
  <div class="embed-snippet">
    <div class="snippet-bar">
      <h3>Embed widget</h3>
      <button class="copy-btn" type="button" @click="copy">
        <Check v-if="copied" :size="16" />
        <Copy v-else :size="16" />
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <pre class="usage-example"><code>{{ snippet }}</code></pre>

    <div class="attr-table-wrap">
      <table class="preview-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attr in attributes" :key="attr.name">
            <td><code>{{ attr.name }}</code></td>
            <td>
              <span v-if="attr.required" class="tag-badge tag-badge--accent">
                <span class="tag-dot" />Required
              </span>
              <span v-else class="tag-badge">Optional</span>
            </td>
            <td>{{ attr.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

// Ported as a native Vue SFC from auxkit-forms' PackEmbed.tsx pattern
// (.snippet-bar + .usage-example + attribute table), not copied verbatim.
// Placeholder key only — never a real API key or the real CloudFront URL.
const snippet = `<script
  src="https://embed.auxkit.dev/auxkit-embed.js"
  data-api-key="pk_YOUR_KEY"
  data-target="#auxkit-packs"
  async
><\/script>
<div id="auxkit-packs"></div>`

const attributes = [
  { name: 'data-api-key', required: true, description: 'Your public API key, used to authorize read-only requests.' },
  { name: 'data-api-base', required: false, description: 'Override the API base URL. Defaults to the AuxKit API.' },
  { name: 'data-target', required: false, description: "CSS selector for the mount point. Defaults to #auxkit-packs." },
  { name: 'data-pack', required: false, description: 'Show a single pack instead of the full storefront grid.' },
]

const copied = ref(false)
let timeout = null

function copy() {
  navigator.clipboard?.writeText(snippet).then(() => {
    copied.value = true
    clearTimeout(timeout)
    timeout = setTimeout(() => { copied.value = false }, 1800)
  })
}
</script>

<style scoped>
.embed-snippet {
  border: 1px solid var(--border);
  border-radius: var(--radius-none);
  background: var(--bg);
  overflow: hidden;
}

.snippet-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-subtle);
  border-bottom: 1px solid var(--border);
}

.snippet-bar h3 {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-tiny);
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  border-color: var(--accent);
  color: var(--text);
}

.usage-example {
  margin: 0;
  padding: var(--space-lg);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--text);
}

.attr-table-wrap {
  overflow-x: auto;
  border-top: 1px solid var(--border);
}

.preview-table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.preview-table th,
.preview-table td {
  text-align: left;
  padding: var(--space-sm) var(--space-lg);
  border-bottom: 1px solid var(--border);
}

.preview-table th {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  background: var(--bg-subtle);
}

.preview-table tr:last-child td {
  border-bottom: none;
}

.preview-table code {
  font-family: var(--font-mono);
  color: var(--accent-hover);
}
</style>
