<script lang="ts" setup>
defineProps(['modelValue', 'label',])
defineEmits(['update:modelValue'])
const emitClick = (event:any) =>{
    $emit('update:modelValue', event.target?.value)
}
</script>
<template>
    <label for="check" class="flex gap-4">
        <input type="checkbox"
        :value="modelValue"
        @input="emitClick($event)" id="check" />
        {{label }}
    </label>
</template>