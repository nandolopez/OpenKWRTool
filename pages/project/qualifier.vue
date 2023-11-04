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
const INPUT_SEARCH_UNQUALIFIED = ref("")
const INPUT_SEARCH_INFORMATIONAL = ref("")
const INPUT_SEARCH_TRANSACTIONAL = ref("")

// For Initial status for All checked / unchecked in "check all" buttons
const ALL_UNQUALIFIED = ref(false);
const ALL_INFORMATIONAL = ref(false);
const ALL_TRANSACTIONAL = ref(false);


//COMPUTED PROPERTIES

/**
 * Display keywords by type if associated searchbox is unqualified, show the filtered
 * information, if input search contain something, do the filter
 */
const UNQUALIFIED = computed(() => {
    if (INPUT_SEARCH_UNQUALIFIED.value !== '') {
        return Keywords.value.filter((e: IKeyword) => e.type === '' && e.keyword.includes(INPUT_SEARCH_UNQUALIFIED.value))
    }
    return Keywords.value.filter((e: IKeyword) => e.type === '')
})
const INFORMATIONAL = computed(() => {
    if (INPUT_SEARCH_INFORMATIONAL.value !== '') {
        return Keywords.value.filter((e: IKeyword) => e.type === 'Informational' && e.keyword.includes(INPUT_SEARCH_INFORMATIONAL.value))
    }
    return Keywords.value.filter((e: IKeyword) => e.type === 'Informational')
})
const TRANSACTIONAL = computed(() => {
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
const onClickButtonCheckAll = (type: string = "unqualified") => {
    switch (type) {
        case 'Unqualified':
            ALL_UNQUALIFIED.value = !ALL_UNQUALIFIED.value
            UNQUALIFIED.value.forEach(e => Keywords.value[e.id].selected = ALL_UNQUALIFIED.value)
            break;
        case 'Informational':
            ALL_INFORMATIONAL.value = !ALL_INFORMATIONAL.value
            INFORMATIONAL.value.forEach(e => Keywords.value[e.id].selected = ALL_INFORMATIONAL.value)
            break;
        case 'Transactional':
            ALL_TRANSACTIONAL.value = !ALL_TRANSACTIONAL.value
            TRANSACTIONAL.value.forEach(e => Keywords.value[e.id].selected = ALL_TRANSACTIONAL.value)
            break;
    }
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
    Trash.value = []

    LAST_ACTION_IS_DELETE.value = true

    //I use this foreach for reassign Ids and identify the removable keywords
    Trash.value = [...Keywords.value.filter((e) => e.selected === true)]

    Keywords.value = Keywords.value.filter((e) => e.selected === false)

    onReassignIdsToKeywords()
    onUpdateLocalStorage()

    INPUT_SEARCH_UNQUALIFIED.value = ""
    INPUT_SEARCH_INFORMATIONAL.value = ""
    INPUT_SEARCH_TRANSACTIONAL.value = ""
    ALL_UNQUALIFIED.value = false
    ALL_INFORMATIONAL.value = false
    ALL_TRANSACTIONAL.value = false
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
 * EVENT: on input in Unqualified search
 * Set all keywords as un selected
 * Select only found to just press "set (selected type)"
 */
const onInputSearchUnqualified = () =>{
    Keywords.value.forEach((e)=>e.selected = false)
    if(INPUT_SEARCH_UNQUALIFIED.value.length>0){
        UNQUALIFIED.value.forEach((e)=>e.selected = true)
    }
}

/**
 * EVENT: on input in informational search
 * Set all keywords as un selected
 * Select only found to just press "set (selected type)"
 */
const onInputSearchInformational = () =>{
    Keywords.value.forEach((e)=>e.selected = false)
    if(INPUT_SEARCH_INFORMATIONAL.value.length>0){
        INFORMATIONAL.value.forEach((e)=>e.selected = true)
    }
}

/**
 * EVENT: on input in Unqualified search
 * Set all keywords as un selected
 * Select only found to just press "set (selected type)"
 */
const onInputSearchTransactional = () =>{
    Keywords.value.forEach((e)=>e.selected = false)
    if(INPUT_SEARCH_TRANSACTIONAL.value.length>0){
        TRANSACTIONAL.value.forEach((e)=>e.selected = true)
    }    
}

/**
 *  ? Why this function?
 *  # For sort the array as Monthly searchs and reassign the Ids based in index
 */
const onReassignIdsToKeywords = () => {
    Keywords.value.sort((a: any, b: any) => b.volume - a.volume);
    Keywords.value.forEach((element: any, index: number) => {
        Keywords.value[index].id = index
        Keywords.value[index].selected = false
    });
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

    INPUT_SEARCH_UNQUALIFIED.value = ""
    INPUT_SEARCH_INFORMATIONAL.value = ""
    INPUT_SEARCH_TRANSACTIONAL.value = ""
    ALL_UNQUALIFIED.value = false
    ALL_INFORMATIONAL.value = false
    ALL_TRANSACTIONAL.value = false
}

const onUpdateLocalStorage = () => {
    localStorage.setItem('keywords', JSON.stringify(Keywords.value))
}

onMounted(() => {
    Keywords.value = JSON.parse(localStorage.keywords)
})

</script>
<template>
    <NuxtLayout name="projects">
        <va-card>
            <va-card-title>
                <h5 class="va-h5 text-center w-full">Actions</h5>
            </va-card-title>
            <va-card-content class="flex justify-around">
                <va-button color="info" :disabled="disableButtonIfNotSelectedKeyword"
                    @click="onClickButtonSetInformational">Set
                    Informational</va-button>
                <va-button color="success" :disabled="disableButtonIfNotSelectedKeyword"
                    @click="onClickButtonSetTransactional">Set Transactional /
                    Mixed</va-button>
                <va-button color="danger" :disabled="disableButtonIfNotSelectedKeyword"
                    @click="onClickButtonRemoveKeywords">Remove
                    keywords</va-button>
                <va-button color="warning" :disabled="Trash.length === 0" @click="onClickButtonUndoLastAction">Undo last
                    action</va-button>
            </va-card-content>
        </va-card>
        <div class="grid grid-cols-3 gap-4">
            <va-card>
                <va-card-title>
                    <h5 class="va-h5 text-center w-full">Unqualified keywords ({{ UNQUALIFIED.length }})</h5>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-center gap-2">
                        <va-button @click="onClickButtonCheckAll('Unqualified')">{{ ALL_UNQUALIFIED ? 'Unc' : 'C' }}heck
                            All</va-button>
                        <va-input type="search" v-model="INPUT_SEARCH_UNQUALIFIED" placeholder="Search unqualified keyword"
                            preset="bordered"  @input="onInputSearchUnqualified()" />
                    </section>
                    <va-sidebar-item v-for="(item, index) in UNQUALIFIED" :key="index"
                        @click="item.selected = !item.selected" :active="item.selected">

                        <va-sidebar-item-content class="flex justify-between">
                            <va-sidebar-item-title class="flex gap-4">
                                <svg v-if="item.selected" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="9 11 12 14 22 4"></polyline>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                                <a :href="'https://google.com/search?q=' + item.keyword.replace(' ', '+')"
                                    class="text-white dark:text-white">
                                    {{ item.keyword }}
                                </a>
                            </va-sidebar-item-title>
                            <span>{{ item.volume }}</span>
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
            <va-card color="info">
                <va-card-title>
                    <h5 class="va-h5 text-center w-full">Informational keywords ({{ INFORMATIONAL.length }})</h5>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-center gap-2">
                        <va-button @click="onClickButtonCheckAll('Informational')">{{ ALL_INFORMATIONAL ? 'Unc' : 'C' }}heck
                            All</va-button>
                        <va-input type="search" v-model="INPUT_SEARCH_INFORMATIONAL"
                            placeholder="Search informational keyword" preset="bordered"
                            @input="onInputSearchInformational()"
                             />
                    </section>
                    <va-sidebar-item active-color="primary" v-for="(item, index) in INFORMATIONAL" :key="index"
                        @click="item.selected = !item.selected" :active="item.selected">
                        <va-sidebar-item-content class="flex justify-between">
                            <span class="flex gap-4">
                                <svg v-if="item.selected" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="9 11 12 14 22 4"></polyline>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>

                                {{ item.keyword }}

                            </span>
                            <span>{{ item.volume }}</span>
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
            <va-card color="success">
                <va-card-title>
                    <h5 class="va-h5 text-center w-full">Transactional keywords ({{ TRANSACTIONAL.length }})</h5>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-center gap-2">
                        <va-button @click="onClickButtonCheckAll('Transactional')">{{ ALL_TRANSACTIONAL ? 'Unc' : 'C' }}heck
                            All</va-button>
                        <va-input type="search" v-model="INPUT_SEARCH_TRANSACTIONAL"
                            placeholder="Search transactional keyword" preset="bordered"
                            @input="onInputSearchTransactional()"
                         />
                    </section>
                    <va-sidebar-item active-color="primary" v-for="(item, index) in TRANSACTIONAL" :key="index"
                        @click="item.selected = !item.selected" :active="item.selected">
                        <va-sidebar-item-content class="flex justify-between">
                            <span class="flex gap-4">
                                <svg v-if="item.selected" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="9 11 12 14 22 4"></polyline>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                                <a :href="'https://google.com/search?q=' + item.keyword.replace(' ', '+')"
                                    class="text-white dark:text-white">
                                    {{ item.keyword }}
                                </a>
                            </span>
                            <span>{{ item.volume }}</span>
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
        </div>
    </NuxtLayout>
</template>
<style></style>