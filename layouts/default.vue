<script setup lang="ts">
import { Navbar, NavbarCollapse, NavbarLink, Button } from 'flowbite-vue'

const DARKMODE = ref(false)

const isShowModal = ref(false)

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

onMounted(() => {
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
        class="border-slate-400 bg-gradient-to-b from-slate-50 to-gray-300 rounded-b border-b content-center dark:bg-slate-700 dark:bg-gradient-to-b dark:from-slate-700 dark:to-gray-900 dark:border-slate-600 dark:shadow-slate-700  dark:text-white flex font-bold justify-between items-center p-4  shadow-md shadow-slate-600">
        <h2 class="text-xl">Keyword Research OS Tool</h2>
        <nav class="flex gap-8">
            <NuxtLink class="flex gap-2 items-center text-xl" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    :stroke="DARKMODE ? '#FFFFFF' : '#475569'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
                </svg>
                <span>Home</span>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center text-xl" to="/concatenator">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    :stroke="DARKMODE ? '#FFFFFF' : '#475569'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span>Concatenator</span>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center text-xl" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    :stroke="DARKMODE ? '#FFFFFF' : '#475569'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                <span>Keyword cleaner</span>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center text-xl" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    :stroke="DARKMODE ? '#FFFFFF' : '#475569'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
                    <path
                        d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
                </svg>
                <span>Project manager</span>
            </NuxtLink>
        </nav>
        <button type="button" class="bg-transparent border-none p-2 rounded-lg" @click="toggleDarkMode()">
            <svg v-if="DARKMODE" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
    </button>

</header>

<main class="bg-white border-gray-200 border flex flex-col mx-auto my-4 w-10/12 p-4 rounded-xl dark:border-slate-600 dark:shadow-slate-700 shadow-2xl shadow-slate-600">
    <slot />
</main></template>