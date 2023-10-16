<script setup lang="ts">
const DARKMODE = ref(false)

const toggleDarkMode = () => {
    if (DARKMODE.value) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem('darkmode', "false")
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem('darkmode', "true")
    }
    DARKMODE.value = !DARKMODE.value
};

onMounted(async () => {
    await fetch("modules.json")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    //Checking if the user come previously for set the darkmode
    DARKMODE.value = localStorage.getItem('darkmode');

    //If it's first time, localstorage > darkmode record does not exists darkmode = false
    if (!DARKMODE.value) {

        /**
         * Set darkmode as opposite as user has in his browser, with this way we can reuse
         * toogleDarkMode function for set the user preference
         */

        DARKMODE.value = document.documentElement.classList.contains("dark")
        localStorage.setItem('darkmode', DARKMODE.value.toString())
    } else {
        /**
         * If user has enabled darkmode we set the variable as opposite for set correct
         * when do the toggle
         */
        localStorage.getItem('darkmode') === 'true' ? DARKMODE.value = false : DARKMODE.value = true;
    }
    toggleDarkMode()
})

</script>
<template>
    <header
        class="border-slate-400 bg-gray-300 rounded-b border-b content-center dark:bg-gray-900 dark:border-slate-600 dark:shadow-slate-700  dark:text-white flex font-bold justify-between items-center p-4  shadow shadow-slate-600">
        <h2 class="text-xl">Keyword Research OS Tool</h2>
        <nav class="flex gap-8">
            <NuxtLink class="flex gap-2 items-center text-xl" to="/">
                <UIcon name="i-heroicons-home" />
                <span>Home</span>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center text-xl" to="/modules/concatenator">
                <UIcon name="i-heroicons-link" />
                <span>Concatenator</span>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center text-xl" to="/modules/cleaner">
                <UIcon name="i-heroicons-trash" />
                <span>Keyword cleaner</span>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center text-xl" to="/modules/">
                <UIcon name="i-heroicons-briefcase" />
                <span>Project manager</span>
            </NuxtLink>
        </nav>
        <UButton color="white" variant="solid" size="xl" :icon="DARKMODE ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            @click="toggleDarkMode()" />

    </header>

    <main>
        <UContainer>
            <slot />

        </UContainer>
    </main>
</template>