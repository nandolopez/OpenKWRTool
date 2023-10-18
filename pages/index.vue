<script setup lang="ts">

const MENU = ref([])
const DARK_MODE = localStorage.getItem('dark_mode') === 'true';
onMounted(async () => {
    await fetch('modules.json')
        .then((result) => result.json())
        .then((data) => MENU.value = data)
})

</script>
<template>
    <article class="flex flex-wrap justify-between p-6 w-full">
        <NuxtLink class="flex flex-col gap-2 items-center" v-for="menu_item in MENU" :to="menu_item.to">
            <Icon :name="menu_item.icon" :color="DARK_MODE ? 'white' : 'dark'" />
            {{ menu_item.label }}
        </NuxtLink>
    </article>
</template>