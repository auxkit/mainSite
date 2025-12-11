<template>
  <section class="hero">
    <!-- Animated Background -->
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
      <div class="floating-shapes">
        <div 
          v-for="n in 20" 
          :key="n" 
          class="shape"
          :style="getShapeStyle(n)"
        ></div>
      </div>
      <div class="glow-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    </div>
    
    <div class="container hero-content">
      <!-- Announcement Banner -->
      <a href="#" class="announcement-banner" v-motion-fade-visible>
        <span class="announcement-badge">New</span>
        <span class="announcement-text">AuxKit 2.0 is here — Faster workflows, smarter automations</span>
        <ArrowRight :size="16" />
      </a>

      <h1 class="hero-title" v-motion-slide-visible-bottom>
        <span class="title-line">AuxKit powers your workflow.</span>
        <span class="title-line gradient-animated">
          <span class="typing-container">
            <span class="typing-text">{{ currentWord }}</span>
            <span class="cursor"></span>
          </span>
        </span>
      </h1>
      
      <p class="hero-description" v-motion-slide-visible-bottom :delay="100">
        A modular suite of tools that helps teams move faster, collaborate cleaner, 
        and scale without chaos. Join <span class="highlight">2,500+ teams</span> already shipping better.
      </p>
      
      <div class="hero-actions" v-motion-slide-visible-bottom :delay="200">
        <router-link to="/pricing" class="btn btn-primary btn-lg">
          <span>Get Started Free</span>
          <ArrowRight :size="18" />
        </router-link>
        <button class="btn btn-secondary btn-lg" @click="showDemo = true">
          <Play :size="18" />
          <span>Watch Demo</span>
          <span class="demo-duration">2 min</span>
        </button>
      </div>

      <!-- Trust Indicators -->
      <div class="trust-indicators" v-motion-fade-visible :delay="300">
        <div class="trust-item">
          <Check :size="16" />
          <span>Free forever plan</span>
        </div>
        <div class="trust-item">
          <Check :size="16" />
          <span>No credit card required</span>
        </div>
        <div class="trust-item">
          <Check :size="16" />
          <span>Setup in 5 minutes</span>
        </div>
      </div>

      <!-- Interactive Module Visualization -->
      <div class="hero-visualization" v-motion-fade-visible :delay="400">
        <div class="viz-container">
          <!-- Central Hub -->
          <div class="central-hub">
            <div class="hub-ring hub-ring-1"></div>
            <div class="hub-ring hub-ring-2"></div>
            <div class="hub-ring hub-ring-3"></div>
            <div class="hub-core">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor" opacity="0.9"/>
                <rect x="18" y="2" width="12" height="12" rx="3" fill="currentColor" opacity="0.6"/>
                <rect x="2" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.6"/>
                <rect x="18" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
          </div>

          <!-- Orbiting Modules -->
          <div class="orbit orbit-1">
            <div 
              v-for="(module, index) in modules" 
              :key="module.name"
              class="module-node"
              :class="{ active: activeModule === module.name }"
              :style="getOrbitPosition(index, modules.length, 160)"
              @mouseenter="activeModule = module.name"
              @mouseleave="activeModule = null"
            >
              <div class="node-icon">
                <component :is="module.icon" :size="20" />
              </div>
              <span class="node-label">{{ module.name }}</span>
            </div>
          </div>

          <!-- Connection Lines -->
          <svg class="connections" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.1" />
                <stop offset="50%" stop-color="#6366f1" stop-opacity="0.5" />
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0.1" />
              </linearGradient>
            </defs>
            <line 
              v-for="(_, index) in modules" 
              :key="index"
              :x1="200" :y1="200" 
              :x2="200 + Math.cos((index / modules.length) * Math.PI * 2 - Math.PI / 2) * 160"
              :y2="200 + Math.sin((index / modules.length) * Math.PI * 2 - Math.PI / 2) * 160"
              stroke="url(#line-grad)"
              stroke-width="1"
              stroke-dasharray="4 4"
              class="connection-line"
            />
          </svg>

          <!-- Data Particles -->
          <div class="particles">
            <div 
              v-for="n in 6" 
              :key="n" 
              class="particle"
              :style="{ '--delay': `${n * 0.8}s`, '--angle': `${n * 60}deg` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Company Logos -->
      <div class="hero-logos" v-motion-fade-visible :delay="500">
        <span class="logos-label">Trusted by innovative teams</span>
        <div class="logos-grid">
          <div v-for="company in companies" :key="company" class="logo-item">
            <span>{{ company }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
      <span>Scroll to explore</span>
    </div>

    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDemo" class="video-modal" @click.self="showDemo = false">
          <div class="modal-content">
            <button class="modal-close" @click="showDemo = false">
              <X :size="24" />
            </button>
            <div class="video-container">
              <div class="video-placeholder">
                <Play :size="64" />
                <span>Product Demo Video</span>
                <p>See AuxKit in action — 2 minute overview</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  ArrowRight, Play, Check, X,
  Workflow, Database, ListTodo, Plug2, BarChart3, Zap
} from 'lucide-vue-next'

const showDemo = ref(false)
const activeModule = ref(null)
const currentWordIndex = ref(0)

const words = ['No noise, no friction.', 'Built for speed.', 'Modular by design.', 'Scale with confidence.']
const currentWord = ref(words[0])

const companies = ['Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'Raycast']

const modules = [
  { name: 'Workflows', icon: Workflow },
  { name: 'Data', icon: Database },
  { name: 'Tasks', icon: ListTodo },
  { name: 'Integrations', icon: Plug2 },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Automations', icon: Zap }
]

const getOrbitPosition = (index, total, radius) => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return { transform: `translate(${x}px, ${y}px)` }
}

const getShapeStyle = (n) => {
  const size = 4 + Math.random() * 6
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 20}s`
  }
}

let wordInterval
onMounted(() => {
  wordInterval = setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % words.length
    currentWord.value = words[currentWordIndex.value]
  }, 3000)
})

onUnmounted(() => {
  clearInterval(wordInterval)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 72px;
  overflow: hidden;
}

/* Background */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-gradient {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 200%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
}

.floating-shapes {
  position: absolute;
  inset: 0;
}

.shape {
  position: absolute;
  background: var(--color-accent);
  border-radius: 50%;
  opacity: 0.1;
  animation: float-up linear infinite;
}

@keyframes float-up {
  0%, 100% { transform: translateY(0); opacity: 0; }
  10% { opacity: 0.15; }
  90% { opacity: 0.15; }
  100% { transform: translateY(-100vh); opacity: 0; }
}

.glow-orbs {
  position: absolute;
  inset: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: orb-drift 25s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: rgba(99, 102, 241, 0.2);
  top: 10%;
  left: 10%;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: rgba(139, 92, 246, 0.15);
  top: 50%;
  right: 10%;
  animation-delay: -8s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: rgba(236, 72, 153, 0.1);
  bottom: 10%;
  left: 30%;
  animation-delay: -16s;
}

@keyframes orb-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

/* Content */
.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-3xl) 0;
  z-index: 1;
}

/* Announcement */
.announcement-banner {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-2xl);
  transition: all var(--transition-base);
}

.announcement-banner:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

.announcement-badge {
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-accent);
  color: white;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm);
}

.announcement-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.announcement-banner > svg {
  color: var(--color-accent);
}

/* Title */
.hero-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 900px;
  margin-bottom: var(--space-lg);
}

.title-line {
  display: block;
}

.gradient-animated {
  background: linear-gradient(
    135deg,
    var(--color-accent) 0%,
    #a855f7 25%,
    #ec4899 50%,
    #a855f7 75%,
    var(--color-accent) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 4s linear infinite;
}

@keyframes gradient-flow {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.typing-container {
  display: inline-flex;
  align-items: center;
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 0.9em;
  background: var(--color-accent);
  margin-left: 4px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Description */
.hero-description {
  max-width: 600px;
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: var(--space-2xl);
}

.highlight {
  color: var(--color-text-primary);
  font-weight: 600;
}

/* Actions */
.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.btn-lg {
  padding: var(--space-lg) var(--space-2xl);
  font-size: 1.0625rem;
}

.demo-duration {
  margin-left: var(--space-sm);
  padding: 2px var(--space-sm);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  opacity: 0.7;
}

/* Trust */
.trust-indicators {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  margin-bottom: var(--space-3xl);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.trust-item svg {
  color: var(--color-success);
}

/* Visualization */
.hero-visualization {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-bottom: var(--space-3xl);
}

.viz-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
}

/* Hub */
.central-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.hub-ring {
  position: absolute;
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring-pulse 3s ease-in-out infinite;
}

.hub-ring-1 { width: 100px; height: 100px; }
.hub-ring-2 { width: 140px; height: 140px; animation-delay: 0.5s; }
.hub-ring-3 { width: 180px; height: 180px; animation-delay: 1s; }

@keyframes ring-pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
}

.hub-core {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--color-bg-card);
  border: 2px solid var(--color-accent);
  border-radius: var(--radius-xl);
  color: var(--color-accent);
  box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
  cursor: pointer;
  transition: all var(--transition-base);
}

.hub-core:hover {
  transform: scale(1.1);
  box-shadow: 0 0 60px rgba(99, 102, 241, 0.4);
}

/* Orbit */
.orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: orbit-spin 45s linear infinite;
}

@keyframes orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Modules */
.module-node {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -32px;
  margin-top: -32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  animation: counter-spin 45s linear infinite;
}

@keyframes counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  transition: all var(--transition-base);
}

.module-node:hover .node-icon,
.module-node.active .node-icon {
  background: var(--color-accent-subtle);
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

.node-label {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* Connections */
.connections {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connection-line {
  animation: dash-animate 3s linear infinite;
}

@keyframes dash-animate {
  to { stroke-dashoffset: -16; }
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
  animation: orbit-particle 5s linear infinite;
  animation-delay: var(--delay);
}

@keyframes orbit-particle {
  0% {
    transform: rotate(var(--angle)) translateX(80px);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% {
    transform: rotate(calc(var(--angle) + 360deg)) translateX(80px);
    opacity: 0;
  }
}

/* Logos */
.hero-logos {
  text-align: center;
}

.logos-label {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}

.logos-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2xl);
  flex-wrap: wrap;
}

.logo-item {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-muted);
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}

.logo-item:hover {
  opacity: 1;
}

/* Scroll */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-2xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-muted);
  font-size: 0.75rem;
  animation: fade-in 1s ease 1s both;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  position: relative;
}

.scroll-wheel {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: var(--color-text-muted);
  border-radius: 2px;
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 0.3; }
}

/* Modal */
.video-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  padding: var(--space-xl);
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 900px;
}

.modal-close {
  position: absolute;
  top: calc(var(--space-2xl) * -1);
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: var(--space-sm);
  transition: transform var(--transition-fast);
}

.modal-close:hover {
  transform: scale(1.1);
}

.video-container {
  aspect-ratio: 16/9;
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  color: var(--color-accent);
}

.video-placeholder span {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.video-placeholder p {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding-top: 100px;
    padding-bottom: var(--space-3xl);
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .trust-indicators {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .viz-container {
    transform: scale(0.7);
    margin: -50px auto;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
