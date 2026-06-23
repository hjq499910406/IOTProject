<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 50 50"
    aria-hidden="true"
    class="common-loading"
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="rgba(var(--t-color-rgb), 0.2)"
      :stroke-width="strokeWidth"
    />
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="var(--t-color)"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-dasharray="31.4 94.2"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  size?: number | string
  strokeWidth?: number | string
}>(), {
  size: 32,
  strokeWidth: 4
});
</script>

<style scoped>
.common-loading {
  display: block;
}
</style>
