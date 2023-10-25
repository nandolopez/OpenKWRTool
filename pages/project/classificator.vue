<script setup lang="ts">
// You might choose this based on an API call or logged-in status
definePageMeta({
    layout: false
})

import { IKeyword } from '../../interfaces/IKeyword'

//Main keywords from local storage
const Keywords = ref<IKeyword[]>([])

//For undo last action button
const Trash = ref<IKeyword[]>([])

//If the last action is a deletion recover it
const LAST_ACTION_IS_DELETE = ref(false)

//SEARCH INPUTS
const INPUT_SEARCH_UNCLASSIFIED = ref("")
const INPUT_SEARCH_INFORMATIONAL = ref("")
const INPUT_SEARCH_TRANSACTIONAL = ref("")

// For Initial status for All checked / unchecked in "check all" buttons
const ALL_UNCLASSIFIED = ref(false);
const ALL_INFORMATIONAL = ref(false);
const ALL_TRANSACTIONAL = ref(false);


//COMPUTED PROPERTIES

/**
 * Display keywords by type if associated searchbox is clear, show the filterose
 * information, if input search contain something, do the filter
 */
const clear = computed(() => {
    if (INPUT_SEARCH_UNCLASSIFIED.value !== '') {
        return Keywords.value.filter((e: IKeyword) => e.type === '' && e.keyword.includes(INPUT_SEARCH_UNCLASSIFIED.value))
    }
    return Keywords.value.filter((e: IKeyword) => e.type === '')
})
const Informational = computed(() => {
    if (INPUT_SEARCH_INFORMATIONAL.value !== '') {
        return Keywords.value.filter((e: IKeyword) => e.type === 'Informational' && e.keyword.includes(INPUT_SEARCH_INFORMATIONAL.value))
    }
    return Keywords.value.filter((e: IKeyword) => e.type === 'Informational')
})
const Transactional = computed(() => {
    if (INPUT_SEARCH_TRANSACTIONAL.value !== '') {
        return Keywords.value.filter((e: IKeyword) => e.type === 'Transactional' && e.keyword.includes(INPUT_SEARCH_TRANSACTIONAL.value))
    }
    return Keywords.value.filter((e: IKeyword) => e.type === 'Transactional')
})



/**
 * For enable / disable action buttons (set transactional / informational) and
 * remove KW
 */
const disableButtonIfNotSelectedKeyword = computed(() => {
    return Keywords.value.every((e: IKeyword) => e.selected === false)
})

//METHODS

/**
 * On check all buttons set all as checked / no checked 
 * and modify his global status
 */
const onClickButtonCheckAllUnclassified = () => {
    ALL_UNCLASSIFIED.value = !ALL_UNCLASSIFIED.value
    clear.value.forEach(e => Keywords.value[e.id].selected = ALL_UNCLASSIFIED.value)
    onUpdateLocalStorage()
}
const onClickButtonCheckAllInformational = () => {
    ALL_INFORMATIONAL.value = !ALL_INFORMATIONAL.value
    Informational.value.forEach(e => Keywords.value[e.id].selected = ALL_INFORMATIONAL.value)
    onUpdateLocalStorage()
}
const onClickButtonCheckAllTransactional = () => {
    ALL_TRANSACTIONAL.value = !ALL_TRANSACTIONAL.value
    Transactional.value.forEach(e => Keywords.value[e.id].selected = ALL_TRANSACTIONAL.value)
    onUpdateLocalStorage()
}

/**
 * 1. Reset Trash (the undo records for return in case of error)
 * 2. Set last action is delete as true for know that the undo it's a recovery
 * of last deleted keyword.
 * 3. Get all selected keywords for delete and do a backup in Trash variable.
 * 4. Find one by one and remove
 * 5. Recompose each ID, this is for avoid be finding the index of keywords and
 * improve the performance.
 * 
 */

const onClickButtonRemoveKeywords = () => {
    Trash.value = [];
    LAST_ACTION_IS_DELETE.value = true

    //I use this foreach for reassign Ids and identify the removable keywords
    Trash.value = Keywords.value.filter((e) => e.selected === true)

    Trash.value.forEach((e: IKeyword) => { Keywords.value.splice(e.id, 1) })

    onReassignIdsToKeywords()
    onUpdateLocalStorage()
}


/**
 *  Change selected keywords as informational
 */
const onClickButtonSetInformational = () => onSetKeywordType('Informational')

/**
 *  Change selected keywords as Transactional
 */
const onClickButtonSetTransactional = () => onSetKeywordType('Transactional')

/**
 *  1. If last action it's a remove of keyword, recover it and in her previous
 *  position (defined by ID)
 *  2. Recompose the IDs based in the index of each keywords
 * 
 *  3. If we like undo a assignment, the affected keywords as before
 *  
 */
const onClickButtonUndoLastAction = () => {
    if (LAST_ACTION_IS_DELETE.value) {

        Trash.value.forEach((e: IKeyword) => {
            Keywords.value.splice(e.id, 0, e)
        })
        onReassignIdsToKeywords()
    } else {
        Trash.value.forEach((e: IKeyword) => {
            Keywords.value[e.id].type = e.type
            Keywords.value[e.id].selected = false
        })
    }
    Trash.value = [];
    LAST_ACTION_IS_DELETE.value = false
    onUpdateLocalStorage()

}

/**
 *  ? Why this function?
 *  # For sort the array as Monthly searchs and reassign the Ids based in index
 */
const onReassignIdsToKeywords = () => {
    Keywords.value.sort((a: any, b: any) => b.volume - a.volume);
    Keywords.value.forEach((element: any, index: number) => Keywords.value[index].id = index);
}


const onSetKeywordType = (type: string) => {
    Trash.value = [];
    Keywords.value.forEach(e => {
        if (e.selected) {
            Trash.value.push({ ...e })
            Keywords.value[e.id].type = type
            Keywords.value[e.id].selected = false
        }
    })
    onUpdateLocalStorage()

    INPUT_SEARCH_UNCLASSIFIED.value = ""
    INPUT_SEARCH_INFORMATIONAL.value = ""
    INPUT_SEARCH_TRANSACTIONAL.value = ""
    ALL_UNCLASSIFIED.value = false
    ALL_INFORMATIONAL.value = false
    ALL_TRANSACTIONAL.value = false
}

const onUpdateLocalStorage = () => localStorage.setItem('keywords', JSON.stringify(Keywords.value))

onMounted(() => {
    Keywords.value = JSON.parse(localStorage.keywords)
})

</script>
<template>
    <NuxtLayout name="projects">
        <section class="flex justify-around">
            <button type="button"
                class="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                :disabled="disableButtonIfNotSelectedKeyword" @click="onClickButtonSetInformational">Set
                Informational</button>
            <button type="button"
                class="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                :disabled="disableButtonIfNotSelectedKeyword" @click="onClickButtonSetTransactional">Set Transactional /
                Mixed</button>
            <button type="button"
                class="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
                :disabled="disableButtonIfNotSelectedKeyword" @click="onClickButtonRemoveKeywords">Remove keywords</button>
            <button type="button"
                class="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                :disabled="Trash.length === 0" @click="onClickButtonUndoLastAction">Undo last action</button>
        </section>
        <div class="grid grid-cols-3 gap-4 1/2">
            <article class="flex flex-col gap-2">
                <h2 class="block text-center text-xl mb-4">Unclassified keywords</h2>
                <section class="flex justify-between items-center gap-2">
                    <button type="button"
                        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        @click="onClickButtonCheckAllUnclassified">{{ ALL_UNCLASSIFIED ? 'Unc' : 'C' }}heck All</button>
                    <input type="search" v-model="INPUT_SEARCH_UNCLASSIFIED"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search keyword">
                </section>
                <ul class="flex flex-col max-h-screen gap-2 overflow-y-auto">
                    <li v-for="item in clear" @click="Keywords[item.id].selected = !Keywords[item.id].selected"
                        class="flex gap-4 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                        <div class="w-full flex items-center gap-4">
                            <input id="default-checkbox" type="checkbox" v-model="Keywords[item.id].selected"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <a :href="'https://www.google.com/search?q=' + item.keyword.replace(' ', '+')"
                                target="_blank">{{
                                    item.keyword }}</a>
                        </div>
                        <span class="block px-4 text-right">{{ item.volume }}</span>
                    </li>
                </ul>
            </article>
            <article class="flex flex-col gap-2 h-full">
                <h2 class="block text-center text-xl mb-4">Informational keywords</h2>
                <section class="flex justify-between items-center gap-2">
                    <button type="button"
                        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        @click="onClickButtonCheckAllInformational">{{ ALL_INFORMATIONAL ? 'Unc' : 'C' }}heck All</button>
                    <input type="search" v-model="INPUT_SEARCH_INFORMATIONAL"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search keyword">
                </section>
                <ul class="flex flex-col max-h-screen gap-2 overflow-y-auto">
                    <li v-for="item in Informational" @click="Keywords[item.id].selected = !Keywords[item.id].selected"
                        class="flex gap-4 p-2 bg-blue-800 border border-blue-200 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700 w-full">
                        <div class="w-full flex items-center gap-4">
                            <input id="default-checkbox" type="checkbox" v-model="Keywords[item.id].selected"
                                class="w-4 h-4  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <a :href="'https://www.google.com/search?q=' + item.keyword.replace(' ', '+')" target="_blank"
                                class="text-white dark:text-white">{{
                                    item.keyword }}</a>
                        </div>
                        <span class="block px-4 text-right">{{ item.volume }}</span>
                    </li>
                </ul>
            </article>
            <article class="flex flex-col gap-2 h-full">
                <h2 class="block text-center text-xl mb-4">Transactional / mixed keywords</h2>
                <section class="flex justify-between items-center gap-2">
                    <button type="button"
                        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        @click="onClickButtonCheckAllTransactional">{{ ALL_TRANSACTIONAL ? 'Unc' : 'C' }}heck All</button>
                    <input type="search" v-model="INPUT_SEARCH_TRANSACTIONAL"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search keyword">
                </section>
                <ul class="flex flex-col max-h-screen gap-2 overflow-y-auto">
                    <li v-for="item in Transactional" @click="Keywords[item.id].selected = !Keywords[item.id].selected"
                        class="flex gap-4 p-2 bg-teal-700 text-white border border-teal-200 rounded-lg shadow hover:bg-teal-100 dark:bg-teal-800 dark:border-teal-700 dark:hover:bg-teal-700 w-full">
                        <div class="w-full flex items-center gap-4">


                            <input id="default-checkbox" type="checkbox" v-model="Keywords[item.id].selected"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <a :href="'https://www.google.com/search?q=' + item.keyword.replace(' ', '+')" target="_blank"
                                class="text-white dark:text-white">{{
                                    item.keyword }}</a>
                        </div>
                        <span class="block px-4 text-right">{{ item.volume }}</span>
                    </li>
                </ul>
            </article>
        </div>
    </NuxtLayout>
</template>
