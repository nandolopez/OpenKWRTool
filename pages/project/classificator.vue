<script setup lang="ts">
// You might choose this based on an API call or logged-in status
definePageMeta({
    layout: false
})

import { IKeyword } from '../../interfaces/IKeyword'

const Keywords = ref([])

const clear = computed<IKeyword[]>(()=>Keywords.value.filter((e:IKeyword)=>e.type === ''))
const Informational = computed<IKeyword[]>(()=>Keywords.value.filter((e:IKeyword)=>e.type === 'Informational'))
const Transactional = computed<IKeyword[]>(()=>Keywords.value.filter((e:IKeyword)=>e.type === 'Transactional'))
//const Mix = computed(()=>Keywords.value.filter((e:IKeyword)=>e.type === 'Mix'))

//Keyword List
const KeywordList = reactive<IKeyword[]>([]);

/**
 * 
 * @param index 
 * @param type 
 * 
 * change type of specified keyword (identified by index)
 */
const onChangeKeywordType = (index: number, type: string) => KeywordList[index].type = type
const onUpdateLocalStorage = () => localStorage.setItem('keywords', JSON.stringify('Keywords'))

onMounted(() => {
    Keywords.value = JSON.parse(localStorage.keywords)
    console.log(Keywords.value)
})

</script>
<template>
    <NuxtLayout name="projects">
        <div class="grid grid-cols-4 gap-4 1/2">
            <article class="flex flex-col gap-5">
                <h2>Unclassified keywords</h2>
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                        name</label>
                    <input type="text" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required>
                </div>
                <ul class="flex flex-col h-8/4 gap-2 overflow-scroll">
                    <li v-for="(item, index) in clear" class="flex gap-4 items-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                        <input id="default-checkbox" type="checkbox" v-model="item.selected"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <a :href="'https://www.google.es/search?q='+item.keyword.replace(' ','+')" is-active>{{item.keyword}}</a>
                    </li>                   
                </ul>
            </article>
            <article class="flex flex-col gap-5 h-full">
                <h2>Unclassified keywords</h2>
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                        name</label>
                    <input type="text" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required>
                </div>
                <ul class="flex flex-col gap-2">
                    <li v-for="item in Informational" class="flex gap-4 items-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                        <input id="default-checkbox" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <a href="https://www.google.es/search?q=" is-active>{{item.keyword}}</a>
                    </li>                   
                </ul>
            </article>
            <article class="flex flex-col gap-5 h-full">
                <h2>Unclassified keywords</h2>
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                        name</label>
                    <input type="text" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required>
                </div>
                <ul class="flex flex-col h-full gap-2">
                    <li v-for="item in Transactional" class="flex gap-4 items-center p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                        <input id="default-checkbox" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <a href="https://www.google.com" is-active>{{item.keyword}}</a>
                    </li>                   
                </ul>
            </article>
        </div>
    </NuxtLayout>
</template>
