<script setup lang="ts">

const MENU = ref([
    {
        to: '/',
        label: 'Home',
        icon: 'i-heroicons-home',
    },
    {
        to: "/modules/concatenator",
        label: "Concadenador",
        icon: "i-heroicons-link"
    },
    {
        to: "/modules/cleaner",
        label: "Cleaner",
        icon: "i-heroicons-trash"
    },
    {
        to: "/modules/project",
        label: "Project",
        icon: "i-heroicons-chart-bar"
    }
])

const DARK_MODE = ref(false)

const toggleDark_Mode = () => {

    if (localStorage.getItem('dark_mode') === 'true') {
        document.documentElement.classList.remove("dark");
    } else {
        document.documentElement.classList.add("dark");
    }
    localStorage.setItem('dark_mode', document.documentElement.classList.contains("dark").toString())
};

onMounted(async () => {

    //If it's first time, localstorage > dark_mode record does not exists dark_mode = false
    if (localStorage.getItem('dark_mode') === null) {
        /**
         * Checking if browser accept matchMedia for detect if is dark mode
         * compatible by default
         */
        const hasDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        //If it's compatible set the mode in localStorage variable
        //Added the ! for set oposite and change in toggle_dark as user want
        localStorage.setItem('dark_mode', (!hasDarkMode).toString())
    } else {
        toggleDark_Mode()
    }
    toggleDark_Mode()

})

</script>
<template>
    <header class=" bg-white dark:bg-gray-700 flex justify-between h-16 p-4 rounded-2xl shadow-lg w-full">
        <h2 class="text-xl">Keyword Research OS Tool</h2>
        <UButton color="white" variant="solid" size="xl" :icon="DARK_MODE ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            @click="toggleDark_Mode()" />

    </header>

    <main class="flex mt-4 gap-4">
        <aside class="bg-white dark:bg-gray-700 flex justify-between h-full p-4 rounded-2xl shadow-lg w-80">
            <UVerticalNavigation :links="MENU" />
        </aside>
        <main class="bg-white dark:bg-gray-700 h-full p-4 rounded-2xl shadow-lg w-full">
            <slot />

        </main>
    </main>
</template>

<style>
body {
    @apply dark:bg-gray-800 bg-gray-100 dark:text-gray-200 text-gray-600 p-4;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

a,
a span {
    @apply font-bold dark:text-gray-200 text-gray-600;
}
</style>