<script lang="ts" setup>

const props = defineProps<{
    modelValue: any,
    label: string
}>()

const emit = defineEmits<{
  (e: 'update', modelValue: string): void
}>()

const emitClick = (event: any) => {
    $emit('update:modelValue', event.target?.value)
}

const LABELDATA = computed(()=>{
    return [" ", "  ","  ","   "].includes(props.label) ? "Example not available" : props.label
})

</script>
<template>
    <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="props.modelValue" @input="emitClick($event)" id="check" class="sr-only peer" />
        <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ LABELDATA }}</span>
    </label>
</template>