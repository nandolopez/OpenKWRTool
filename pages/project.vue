<script setup lang="ts">
const KW = reactive([])
const KW_INFO = reactive([])
const KW_MIX = reactive([])
const KW_TRA = reactive([])
const STRUCTURE = reactive([])
const BLOG = reactive([])
const SEARCH_INPUT = ref("")

const moveFromKWToInfo = (index:number) =>{
    KW_INFO.push(KW[index]);
    KW.splice(index, 1);
}
const moveFromKWToMix = (index:number) =>{
    KW_MIX.push(KW[index]);
    KW.splice(index, 1);
}
const moveFromKWToTra= (index:number) =>{
    KW_TRA.push(KW[index]);
    KW.splice(index, 1);
}

const moveFromInfoToKW= (index:number) =>{
    KW.push(KW[index]);
    KW_INFO.splice(index, 1);
}
const moveFromMixToKW= (index:number) =>{
    KW.push(KW[index]);
    KW_MIX.splice(index, 1);
}
const moveFromTraToKW= (index:number) =>{
    KW.push(KW[index]);
    KW_TRA.splice(index, 1);
}




</script>
<template>
    <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li class="mr-2">
            <a href="#" aria-current="page"
                class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Save
                / load project</a>
        </li>
        <li class="mr-2">
            <a href="#"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Keyword
                classification</a>
        </li>
        <li class="mr-2">
            <a href="#"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Structure
                builder</a>
        </li>
        <li class="mr-2">
            <a href="#"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Blog
                builder</a>
        </li>
    </ul>
    <div>
    </div>
</template>
