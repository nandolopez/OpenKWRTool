<script setup lang="ts">
import { IKeyword } from '../interfaces/IKeyword'


//Keyword List
const KeywordList = reactive<IKeyword[]>([]);

//For selectors keywords
const BATCH_KW = reactive<number[]>([])
const BATCH_INFORMATIONAL = reactive<number[]>([])
const BATCH_TRANSACTIONAL = reactive<number[]>([])
const BATCH_MIX = reactive<number[]>([])

//Flor do a fake routing
const CURRENT_MENU = ref("load")

//For search keywords of classified keywords
const SEARCH_INPUT = ref("")

//When load a keyword remove forbidden words
const BLACK_LIST_KEYWORDS = ref("")

//Set as informational this contained keywords
const INFORMATIONAL_LIST_KEYWORDS = ref("")

//Set as transactional this contained keywords
const TRANSACTIONAL_LIST_KEYWORDS = ref("")


/**
 * 
 * @param index 
 * @param type 
 * 
 * change type of specified keyword (indentified by index)
 */
const onChangeKeywordType = (index: number, type: string) => KeywordList[index].type = type


const onClickButtonLoadProject = () => {

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
    <article class="flex flex-col w-full">
        <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32"
            @click="onClickButtonLoadProject()">
            Copy result</button>
    </article>
    <article class="flex flex-col w-full">

    </article>
    <article class="flex flex-col w-full">

    </article>
    <article class="flex flex-col w-full">

    </article>
    <div>
    </div>
</template>
