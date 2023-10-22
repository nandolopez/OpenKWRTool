<script setup lang="ts">

const DARK_MODE = ref(false)

const toggleDark_Mode = () => {

    //HTML object for add / remove the dark class
    const DARK = document.documentElement.classList
    localStorage.getItem('dark_mode') === 'true' ? DARK.remove("dark") : DARK.add("dark");
    //Updating the localstorage variable for remember the next visit
    localStorage.setItem('dark_mode', document.documentElement.classList.contains("dark").toString())
    DARK_MODE.value = localStorage.getItem('dark_mode') === 'true'
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
        localStorage.setItem('dark_mode', (hasDarkMode).toString())
        if (hasDarkMode) {
            toggleDark_Mode()
        }
    }
    DARK_MODE.value = localStorage.getItem('dark_mode') === 'true'
})

</script>
<template>
    <div class="flex gap-4">
        <aside id="default-sidebar" class="w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar">
            <div class="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl">
                <ul class="space-y-2 font-medium">
                    <li>
                        <NuxtLink class="font-bold text-lg" to="/" is-active>Keyword Research OST</NuxtLink>
                    </li>
                    <li class="flex justify-center border-b-2">
                        <label class="relative inline-flex items-center cursor-pointer gap-2 my-4">
                            <input type="checkbox" value="" class="sr-only peer" @click="toggleDark_Mode()">
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                            <svg v-if="!DARK_MODE" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" :stroke="DARK_MODE ? '#000000' : '#FFFFFF'" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                        </label>
                    </li>
                    <li>
                        <NuxtLink
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-4 group w-full"
                            to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                :stroke="DARK_MODE ? '#000000' : '#FFFFFF'" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            Home
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-4 group w-full"
                            to="/project">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                :stroke="DARK_MODE ? '#000000' : '#FFFFFF'" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                            </svg>
                            Concatenator
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-4 group w-full"
                            to="/cleaner">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                :stroke="DARK_MODE ? '#000000' : '#FFFFFF'" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Cleaner
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-4 group w-full"
                            to="/project">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                :stroke="DARK_MODE ? '#000000' : '#FFFFFF'" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                <rect x="9" y="9" width="6" height="6"></rect>
                                <line x1="9" y1="1" x2="9" y2="4"></line>
                                <line x1="15" y1="1" x2="15" y2="4"></line>
                                <line x1="9" y1="20" x2="9" y2="23"></line>
                                <line x1="15" y1="20" x2="15" y2="23"></line>
                                <line x1="20" y1="9" x2="23" y2="9"></line>
                                <line x1="20" y1="14" x2="23" y2="14"></line>
                                <line x1="1" y1="9" x2="4" y2="9"></line>
                                <line x1="1" y1="14" x2="4" y2="14"></line>
                            </svg>
                            Projects
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </aside>
        <main class="bg-white dark:bg-gray-900 h-full p-4 rounded-2xl shadow-lg w-full">
            <slot />
        </main>
    </div>
</template>

<style>
body {
    @apply dark:bg-gray-800 bg-gray-100 dark:text-gray-200 text-gray-600 p-4;
    /*font-family: 'Plus Jakarta Sans', sans-serif;*/
}

.dark {
    background: #1F262F;
}

a,
a span {
    @apply font-bold dark:text-gray-200 text-gray-600;
}
</style>