<script setup lang="ts">
// You might choose this based on an API call or logged-in status
definePageMeta({
    layout: false,
});

import { IURL } from "~/interfaces/IURL";
import { IKeyword } from "../../interfaces/IKeyword";

//DATA
const KEYWORDS = ref<IKeyword[]>([]);
const STRUCTURE = ref<IURL[]>([]);


//INPUTS
const INPUT_ADD_URL = ref("")
const INPUT_EDIT_URL = ref("")
const INPUT_SEARCH = ref("")
const RADIO_KEYWORD_TYPE = ref("Transactional")

//STATUS
const CHECK_ALL_STATUS = ref(false)
const CURRENT_URL = ref(0)

//COMPUTED PROPERTIES

/**
 * Lists of filtered KEYWORDS by url is clear and type = selected in RADIO_KEYWORD_TYPE
 *  
 * 1. IF SEARCH_INPUT has content
 * 1.1 Get keywords that contains the wrote text
 * 2.If not, get the full list
 */

const FILTERED_KEYWORDS = computed<IKeyword[]>(() => {
    if (INPUT_SEARCH.value !== '') {
        return KEYWORDS.value.filter((e: IKeyword) => e.url === '' && e.type === RADIO_KEYWORD_TYPE.value && e.keyword.includes(INPUT_SEARCH.value))
    } else {
        return KEYWORDS.value.filter((e: IKeyword) => e.url === '' && e.type === RADIO_KEYWORD_TYPE.value)
    }
})

/**
 * Lists of filtered URLs by type = selected in RADIO_KEYWORD_TYPE
 */

const FILTERED_STRUCTURE = computed(() => STRUCTURE.value.filter((e: IURL) => e.type === RADIO_KEYWORD_TYPE.value))

/**
 * Assigned keywords to current selected URL
 */
const ASSIGNED_KEYWORDS = computed(() => KEYWORDS.value.filter((e: IKeyword) => e.url === INPUT_EDIT_URL.value))

//METHODS

/**
 * EVENT: on Click Add keyword to URL button
 * 1. Find in filtered word all keywords that are checked.
 * 2. Set the current URL
 * 3. Set the selected option in false
 */
const onClickButtonAddKeyword = () => {
    FILTERED_KEYWORDS.value.forEach((e: IKeyword) => {
        if (e.selected) {
            KEYWORDS.value[e.id].url = INPUT_EDIT_URL.value
            KEYWORDS.value[e.id].selected = false
        }
    })
    INPUT_SEARCH.value = ""
    onUpdateLocalStorage()
}


/**
 * EVENT: on Click Add URL button
 * 1. Find in filtered structure that are checked.
 * 2. Check if the user wrote the / if not add to the URL
 * 3. Add the URL to structure variable
 * 4. Reset the ADD_URL input
 * 5. Update the localstorage (database)
 * 6. Set current URL to last index
 */
const onClickButtonAddURL = () => {
    if (INPUT_ADD_URL.value.length > 3) {
        let url = INPUT_ADD_URL.value[0] === '/' ? INPUT_ADD_URL.value : '/' + INPUT_ADD_URL.value
        STRUCTURE.value.push({ id: STRUCTURE.value.length, path: url, type: RADIO_KEYWORD_TYPE.value })
        INPUT_ADD_URL.value = ""
    }
    onUpdateLocalStorage()
    CURRENT_URL.value = FILTERED_STRUCTURE.value.length
}


/**
 * on Click Check/Uncheck all button
 * 1. Set the global status Check_all_status to opposite status between true / false
 * 2. For each element in filtered keywords set the selected property to CHECK_ALL_STATUS
 */
const onClickButtonCheckAll = () => {
    CHECK_ALL_STATUS.value = !CHECK_ALL_STATUS.value
    FILTERED_KEYWORDS.value.forEach(e => KEYWORDS.value[e.id].selected = CHECK_ALL_STATUS.value)
}


/**
 * 
 * @param event 
 * 
 * 1. Modify all keywords that contains the current URL to the new one
 * 2. Find the ID of (really the ID is the index in STRUCTURED variable) from FILTERED_STRUCTURE
 * I do the find over FILTERED_STRUCTURE in order to use a array smallest
 * 
 * 3. Edit the STRUCTURE record
 * 4. Update localstorage
 * 
 */
const onInputEditURL = (event: any) => {
    const new_url = event.target.value
    ASSIGNED_KEYWORDS.value.forEach((e: IKeyword) => KEYWORDS.value[e.id].url = new_url)
    const structure_index = FILTERED_STRUCTURE.value[CURRENT_URL.value].id
    STRUCTURE.value[structure_index].path = new_url
    onUpdateLocalStorage()
}

/**
 * 
 * EVENT: on Click in RemoveURL Button
 * 
 * 1. Set all keywords assigned to this URL as '' for return to keywords without URLS
 * 2. Get the ID (index in structured) of current URL record
 * 3. Remove the URL from STRUCTURED
 * 4. REduce the value of Current URL to previous one
 * 
 */
const onClickButtonRemoveURL = () => {
    ASSIGNED_KEYWORDS.value.forEach((e: IKeyword) => KEYWORDS.value[e.id].url = '')
    const structure_index = FILTERED_STRUCTURE.value[CURRENT_URL.value].id
    STRUCTURE.value.splice(structure_index, 1)
    CURRENT_URL.value--
}

/**
 * 
 * EVENT: on Select a URL
 * 
 * @param index: number 
 * Description: index of selected URL
 * 
 * 1. Set CURRENT_URL as index of selected URL
 * 2. Set the INPUT for edit selected URL
 * 
 */
const onSelectURL = (index: number) => {
    CURRENT_URL.value = index
    INPUT_EDIT_URL.value = FILTERED_STRUCTURE.value[index].path
}


const onUpdateLocalStorage = () => {
    localStorage.setItem('structure', JSON.stringify(STRUCTURE.value))
    localStorage.setItem('keywords', JSON.stringify(KEYWORDS.value))

}
/**
 * 
 * EVENT: on mount VUE component
 * 
 * 1. Get from localstorage the keywords, and set all selected as false if come
 * of keyword qualified
 * 2. Get the Structure from localstorage
 * 3. The first URL as selected
 * 
 */

onMounted(() => {
    KEYWORDS.value = JSON.parse(localStorage.keywords).map((e: IKeyword) => { return { ...e, selected: false } });
    STRUCTURE.value = JSON.parse(localStorage.structure);
    onSelectURL(0)
});

</script>
<template>
    <NuxtLayout name="projects">
        <!--RADIO FOR SELECT TYPE OF KEYWORDS TO SHOW DEPENDING IF WE WANT STRUCTURE THE BLOG OR THE MAIN SITE-->
        <va-card>
            <va-card-title>
                <h5 class="text-center va-h5 w-full">What you want to structure?</h5>
            </va-card-title>
            <va-card-content class="flex justify-center gap-4">
                <va-radio v-model="RADIO_KEYWORD_TYPE" option="Transactional" name="radio-group" label="Website structure"
                    @click="onSelectURL(0)" />
                <va-radio v-model="RADIO_KEYWORD_TYPE" option="Informational" name="radio-group" label="blog"
                    @click="onSelectURL(0)" />
            </va-card-content>
        </va-card>
        <!--LIST OF KEYWORDS WITHOUT ASSIGNED URL -->
        <div class="grid grid-cols-3 gap-4">
            <va-card :color="RADIO_KEYWORD_TYPE === 'Transactional' ? 'success' : 'info'">
                <va-card-title>
                    <h5 class="va-h5 text-center w-full">Transactional keywords</h5>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-center gap-2">
                        <va-button @click="onClickButtonCheckAll()">{{ CHECK_ALL_STATUS ? 'Unc' : 'C' }}heck
                            All</va-button>
                        <va-input type="search" v-model="INPUT_SEARCH" placeholder="Search keywords" preset="bordered" />
                        <va-button color="info" @click="onClickButtonAddKeyword()">Add to URL</va-button>
                    </section>
                    <va-sidebar-item active-color="primary" v-for="(item, index) in FILTERED_KEYWORDS" :key="index"
                        @click="item.selected = !item.selected" :active="item.selected">
                        <va-sidebar-item-content class="flex justify-between">
                            <span class="flex gap-4">
                                <svg v-if="item.selected" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="9 11 12 14 22 4"></polyline>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                                {{ item.keyword }}</span>
                            <span>{{ item.volume }}</span>
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
            <!--LIST OF URLS FILTERED BY TYPE -->
            <va-card>
                <va-card-title>
                    <h5 class="va-h5 text-center w-full">URLS</h5>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex items-start gap-2">
                        <va-input type="text" v-model="INPUT_ADD_URL" placeholder="Add subURL, Example: brands/brand_name"
                            preset="bordered" @keyup.enter="onClickButtonAddURL"
                            messages="Initial / will set automatically, just type and press ENTER. Minimal 4 characters" />
                    </section>

                    <va-sidebar-item active-color="primary" v-for="(item, index) in FILTERED_STRUCTURE"
                        :active="CURRENT_URL === index" @click="onSelectURL(index)">
                        <va-sidebar-item-content class="flex justify-between">
                            {{ index > 0 ? FILTERED_STRUCTURE[0].path : '' }}{{ item.path }}
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
            <!--ASSIGNED KEYWORDS -->
            <va-card>
                <va-card-title class="flex flex-col">
                    <h6 class="va-h6 text-center w-full">Keywrods for:</h6>
                    <span class="text-lg">{{ CURRENT_URL > 0 ? FILTERED_STRUCTURE[0].path + INPUT_EDIT_URL : INPUT_EDIT_URL
                    }}/</span>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-end gap-2">
                        <va-input type="text" v-model="INPUT_EDIT_URL" @input="onInputEditURL($event)" preset="bordered"
                            label="rename url" />
                        <va-button :disabled="CURRENT_URL === 0" color="danger" @click="onClickButtonRemoveURL()">Remove
                            URL</va-button>
                    </section>
                    <va-sidebar-item active-color="primary" v-for="(item, index) in ASSIGNED_KEYWORDS" :key="index"
                        @click="item.selected = !item.selected" :active="item.selected">
                        <va-sidebar-item-content class="flex justify-between">
                            <span>{{ item.keyword }}</span>
                            <span>{{ item.volume }}</span>
                            <va-button color="danger" @click="KEYWORDS[item.id].url = ''">Remove KW</va-button>
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
        </div>
    </NuxtLayout></template>
