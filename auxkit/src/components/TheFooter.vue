<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <router-link to="/" class="logo">
            <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor" opacity="0.9"/>
                <rect x="18" y="2" width="12" height="12" rx="3" fill="currentColor" opacity="0.6"/>
                <rect x="2" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.6"/>
                <rect x="18" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <span class="logo-text">AuxKit</span>
          </router-link>
          <p class="footer-tagline">Modular tools for modern teams.</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Twitter">
              <TwitterIcon :size="20" />
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <GithubIcon :size="20" />
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <LinkedinIcon :size="20" />
            </a>
          </div>
        </div>

        <!-- Product -->
        <div class="footer-section">
          <h4>Product</h4>
          <ul>
            <li><router-link to="/features">Features</router-link></li>
            <li><router-link to="/pricing">Pricing</router-link></li>
            <li><router-link to="/use-cases">Use Cases</router-link></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><router-link to="/docs">Documentation</router-link></li>
            <li><a href="#">API Reference</a></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div class="footer-section">
          <h4>Company</h4>
          <ul>
            <li><router-link to="/about">About</router-link></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} AuxKit. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Status</a>
          <span class="separator">·</span>
          <a href="#">Support</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Twitter as TwitterIcon, Github as GithubIcon, Linkedin as LinkedinIcon } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  padding: var(--space-4xl) 0 var(--space-xl);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: var(--space-3xl);
}

.footer-brand {
  max-width: 280px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: var(--space-md);
}

.logo-icon {
  color: var(--color-accent);
}

.footer-tagline {
  font-size: 0.9375rem;
  margin-bottom: var(--space-lg);
}

.social-links {
  display: flex;
  gap: var(--space-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.social-link:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-hover);
}

.footer-section h4 {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}

.footer-section ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-section a {
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  transition: color var(--transition-fast);
}

.footer-section a:hover {
  color: var(--color-text-primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-3xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-border);
}

.footer-bottom p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer-bottom-links a {
  color: var(--color-text-muted);
}

.footer-bottom-links a:hover {
  color: var(--color-text-primary);
}

.separator {
  color: var(--color-border);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .footer-brand {
    grid-column: 1 / -1;
    max-width: none;
    margin-bottom: var(--space-xl);
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: var(--space-md);
    text-align: center;
  }
}
</style>
