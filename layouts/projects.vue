<script setup lang="ts">

</script>
<template>
    <NuxtLayout name="default">

        <ul
            class="flex flex-wrap text-sm font-medium my-4 text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li class="mr-2">
                <NuxtLink to="/project" aria-current="page"
                    class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Save
                    / load project</NuxtLink>
            </li>
            <li class="mr-2">
                <NuxtLink to="/project"
                    class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Keyword
                    classification</NuxtLink>
            </li>
            <li class="mr-2">
                <NuxtLink to="/project"
                    class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Structure
                    builder</NuxtLink>
            </li>
            <li class="mr-2">
                <NuxtLink to="/project"
                    class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Blog
                    builder</NuxtLink>
            </li>
        </ul>
        <slot />
    </NuxtLayout>
</template>
