<script setup lang="ts">

const MENU = ref([])
onMounted(async () => {
    await fetch('modules.json')
        .then((result) => result.json())
        .then((data) => MENU.value = data)
})

</script>
<template>
    <UVerticalNavigation :links="MENU" />
</template>