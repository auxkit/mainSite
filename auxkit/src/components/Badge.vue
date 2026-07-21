<template>
  <span class="tag-badge" :class="variant ? `tag-badge--${variant}` : ''">
    <span class="tag-dot" />
    <slot />
  </span>
</template>

<script setup>
// Reusable status/tag chip: small colored dot, tinted background, 1px
// border, uppercase tracked-out label. No pulse animation, no glow.
// variant: 'accent' | 'live' | 'beta' | undefined (neutral)
defineProps({
  variant: {
    type: String,
    default: '',
  },
})
</script>
