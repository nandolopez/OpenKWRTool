<script setup lang="ts">
import { TheCard, Toggle, Sidebar, SidebarItem } from 'flowbite-vue'

const { data, refresh, pending } = await useFetch('modules.json')

const DARK_MODE = ref(false)

const toggleDark_Mode = () => {
    DARK_MODE.value = !DARK_MODE.value
    const DARK = document.documentElement.classList
    localStorage.getItem('dark_mode') === 'true' ? DARK.remove("dark") : DARK.add("dark");
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
    <div class="flex gap-4">
        <aside id="default-sidebar"
            class="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2 font-medium">
                    <li>
                        <NuxtLink class="font-bold text-lg" to="/" is-active>Keyword Research OS Tool</NuxtLink>
                    </li>
                    <li class="flex justify-center">
                        <label class="relative inline-flex items-center cursor-pointer  gap-2">
                            <input type="checkbox" value="" class="sr-only peer">
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                            <svg v-if="!DARK_MODE" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                        </label>
                    </li>
                    <li v-for="item in data">
                        <NuxtLink class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" :to="item.to" is-active>
                            <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                
                                <Icon :name="item.icon" :color="DARK_MODE ? 'black' : 'white'" />
                                {{ item.label }}
                            </span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </aside>
        <main class="bg-white dark:bg-gray-700 h-full p-4 rounded-2xl shadow-lg w-full">
            <slot />
        </main>
    </div>
</template>

<style>
body {
    @apply dark:bg-gray-800 bg-gray-100 dark:text-gray-200 text-gray-600 p-4;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

.dark {
    background: #1F262F;
}

a,
a span {
    @apply font-bold dark:text-gray-200 text-gray-600;
}
</style>