<script lang="ts" setup>
defineProps(['label'])
</script>
<template>
    <div class="flex flex-col gap-4">
              <span>{{ label }}</span>
              <slot />
            </div>
</template>