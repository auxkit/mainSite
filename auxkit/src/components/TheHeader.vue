<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container header-inner">
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

      <nav class="nav-desktop">
        <router-link to="/features" class="nav-link">Features</router-link>
        <router-link to="/use-cases" class="nav-link">Use Cases</router-link>
        <router-link to="/pricing" class="nav-link">Pricing</router-link>
        <router-link to="/docs" class="nav-link">Docs</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
      </nav>

      <div class="header-actions">
        <a href="#" class="nav-link">Sign In</a>
        <router-link to="/pricing" class="btn btn-primary btn-sm">Get AuxKit</router-link>
      </div>

      <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
        <component :is="mobileMenuOpen ? XIcon : MenuIcon" :size="24" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <nav class="mobile-nav">
          <router-link to="/features" class="mobile-nav-link" @click="mobileMenuOpen = false">Features</router-link>
          <router-link to="/use-cases" class="mobile-nav-link" @click="mobileMenuOpen = false">Use Cases</router-link>
          <router-link to="/pricing" class="mobile-nav-link" @click="mobileMenuOpen = false">Pricing</router-link>
          <router-link to="/docs" class="mobile-nav-link" @click="mobileMenuOpen = false">Docs</router-link>
          <router-link to="/about" class="mobile-nav-link" @click="mobileMenuOpen = false">About</router-link>
          <div class="mobile-nav-divider"></div>
          <a href="#" class="mobile-nav-link">Sign In</a>
          <router-link to="/pricing" class="btn btn-primary mt-md" @click="mobileMenuOpen = false">Get AuxKit</router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu as MenuIcon, X as XIcon } from 'lucide-vue-next'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  transition: all var(--transition-base);
}

.header-scrolled {
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border-subtle);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 1.25rem;
}

.logo-icon {
  color: var(--color-accent);
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.nav-link {
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.btn-sm {
  padding: var(--space-sm) var(--space-lg);
  font-size: 0.875rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  padding: var(--space-sm);
}

.mobile-menu {
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-lg);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.mobile-nav-link {
  color: var(--color-text-secondary);
  font-size: 1rem;
  font-weight: 500;
  padding: var(--space-sm) 0;
}

.mobile-nav-link:hover {
  color: var(--color-text-primary);
}

.mobile-nav-divider {
  height: 1px;
  background: var(--color-border);
  margin: var(--space-sm) 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 1024px) {
  .nav-desktop,
  .header-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }
}
</style>
