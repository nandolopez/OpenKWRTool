<script setup lang="ts">

const MENU = ref<any>([])

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

    await fetch('modules.json')
        .then((result) => result.json())
        .then((data) => MENU.value = data)

})

const fonts = [{
    name: 'ph:',
    resolve: (code: any) => ({ class: `ph:${code}`, tag: 'Icon' }),
}]

</script>
<template>
    <header class=" bg-white dark:bg-gray-700 flex justify-between h-16 p-4 rounded-2xl shadow-lg w-full">
        <nav class="flex justify-between w-full">
            <h2 class="font-bold text-lg">
                Keyword Research OS Tool

            </h2>
            <button type="button" @click="toggleDark_Mode()"
                class="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                <svg v-if="!DARK_MODE" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
            </button>

        </nav>
    </header>

    <main class="flex mt-4 gap-4">
        <aside class="bg-white dark:bg-gray-700 flex flex-col justify-between h-full p-4 rounded-2xl shadow-lg w-80">
            <NuxtLink class="flex gap-2 items-center  w-full" v-for="menu_item in MENU" :to="menu_item.to">
                <Icon :name="menu_item.icon" :color="DARK_MODE ? 'black' : 'white'" />
                {{ menu_item.label }}
            </NuxtLink>
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

.dark {
    background: #1F262F;
}

a,
a span {
    @apply font-bold dark:text-gray-200 text-gray-600;
}</style>