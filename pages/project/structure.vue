<script setup lang="ts">
// You might choose this based on an API call or logged-in status
definePageMeta({
    layout: false,
});

import { IURL } from "~/interfaces/IURL";
import { IKeyword } from "../../interfaces/IKeyword";
import { isRuntimeOnly } from "nuxt/dist/app/compat/capi";

//DATA
const KEYWORDS = ref<IKeyword[]>([]);
const STRUCTURE = ref<IURL[]>([]);


//INPUTS
const INPUT_ADD_URL = ref("")
const INPUT_SEARCH = ref("")
const INPUT_EDIT_URL = ref("")
const RADIO_KEYWORD_TYPE = ref("Transactional")
const SELECT_INDEX = ref()

//STATUS
const CURRENT_URL = ref(0)
const CURRENT_URL_PATH = ref("")


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

const FILTERED_STRUCTURE = computed(() => STRUCTURE.value.filter((e: IURL) => e.type === RADIO_KEYWORD_TYPE.value || e.type === (RADIO_KEYWORD_TYPE.value === 'Transactional' ? 'GT' : 'GI')))

/**
 * Assigned keywords to current selected URL
 */
const ASSIGNED_KEYWORDS = computed(() => KEYWORDS.value.filter((e: IKeyword) => e.url === CURRENT_URL_PATH.value))

/**
 * AMOUNT OF VOLUME SEARCH
 */
const VOLUME_SEARCH = computed(() => ASSIGNED_KEYWORDS.value.reduce(((sum: number, element: IKeyword) => sum + element.volume), 0))

//MOVE URL SELECT OPTIONS
const MOVE_OPTIONS = computed(() => {
    const indexes = [...Array(FILTERED_STRUCTURE.value.length).keys()]
    indexes.splice(0, 1)
    return indexes
})



//METHODS
const onClickButtonAddGroup = () =>{
    if (INPUT_ADD_URL.value.length > 3) {
        STRUCTURE.value.push({ id: STRUCTURE.value.length, path:  INPUT_ADD_URL.value, type: RADIO_KEYWORD_TYPE.value === 'Transactional' ? 'GT' : 'GI', volume: 0 })
        INPUT_ADD_URL.value = ""
    }
    onUpdateLocalStorage()
}


/**
 * EVENT: on Click Add keyword to URL button
 * 1. Find in filtered word all keywords that are checked.
 * 2. Set the current URL
 * 3. Set the selected option in false
 * 4. Set all selected to false for reset the button
 * 5. Update the search volume of url
 * 6. Reorder the URLs in function of volume
 * 7. Update database in localstorage
 */
const onClickButtonToURL = () => {
    FILTERED_KEYWORDS.value.forEach((e: IKeyword) => {
        if (e.selected) {
            KEYWORDS.value[e.id].url = CURRENT_URL_PATH.value
            KEYWORDS.value[e.id].selected = false
        }
    })
    INPUT_SEARCH.value = ""
    const structure_index = FILTERED_STRUCTURE.value[CURRENT_URL.value].id
    STRUCTURE.value[structure_index].volume = VOLUME_SEARCH.value
    STRUCTURE.value.sort((a: any, b: any) => b.volume - a.volume);
    onUpdateLocalStorage()

}



/**
 * 
 * @param event 
 * 
 * 1. Set NEW_URL as default like https://website/url because it's the most
 * common case.
 * 
 * 2. Check that input contains information
 * 
 * 2.1 if contains information check if we are editing root
 * 2.2 If we are editing root modify the root in informational and transactional
 * 2.3 Modify associated keywords
 * 
 * 3. If we are editing some another keyword...
 * 4. Edit the keywords associated to old name
 * 5. Find the ID of (really the ID is the index in STRUCTURED variable) from FILTERED_STRUCTURE
 * I do the find over FILTERED_STRUCTURE in order to use a array smallest
 * 
 * 6. Edit the STRUCTURE record
 * 7. Update localstorage
 * 8. Edit the Current_url_path for update in view the URL
 * 
 */
const onInputEditURL = (event: any) => {
    let new_url = "/" + event.target.value
    if (event.target.value.length > 0) {
        if (CURRENT_URL.value === 0) {
            new_url = 'https://' + event.target.value
            STRUCTURE.value[0].path = new_url
            STRUCTURE.value[1].path = new_url + "/blog"

            let filtered = KEYWORDS.value.filter((e: IKeyword) => e.url === CURRENT_URL_PATH.value);
            filtered.forEach((e: IKeyword) => KEYWORDS.value[e.id].url = new_url)

            filtered = KEYWORDS.value.filter((e: IKeyword) => e.url === CURRENT_URL_PATH.value + "/blog");
            filtered.forEach((e: IKeyword) => KEYWORDS.value[e.id].url = new_url + "/blog")
        } else {
            ASSIGNED_KEYWORDS.value.forEach((e: IKeyword) => KEYWORDS.value[e.id].url = new_url)
            const structure_index = FILTERED_STRUCTURE.value[CURRENT_URL.value].id
            STRUCTURE.value[structure_index].path = new_url

        }
        onUpdateLocalStorage()
        CURRENT_URL_PATH.value = new_url
    }

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
 const onKeyPressEnterInputAddURL = () => {
    if (INPUT_ADD_URL.value.length > 3) {
        let url = INPUT_ADD_URL.value[0] === '/' ? INPUT_ADD_URL.value : '/' + INPUT_ADD_URL.value
        STRUCTURE.value.push({ id: STRUCTURE.value.length, path: url, type: RADIO_KEYWORD_TYPE.value, volume: 0 })
        INPUT_ADD_URL.value = ""
    }
    onUpdateLocalStorage()
    onSelectURL(FILTERED_STRUCTURE.value.length - 1)
}


/**
 * 
 * EVENT: on Click in Remove Group Button
 * 
 * 1. Set all keywords assigned to this URL as '' for return to keywords without URLS
 * 2. Get the ID (index in structured) of current URL record
 * 3. Remove the URL from STRUCTURED
 * 4. REduce the value of Current URL to previous one
 * 5. Rebuild Ids * 
 */
const onClickButtonRemoveGroup = (position: number) => {    
    const structure_index = FILTERED_STRUCTURE.value[position].id
    STRUCTURE.value.splice(structure_index, 1)
    CURRENT_URL.value--
    STRUCTURE.value.forEach((e: IURL, index:number)=>STRUCTURE.value[index].id = index)
}

/**
 * 
 * EVENT: on Click in RemoveURL Button
 * 
 * 1. Set all keywords assigned to this URL as '' for return to keywords without URLS
 * 2. Get the ID (index in structured) of current URL record
 * 3. Remove the URL from STRUCTURED
 * 4. REduce the value of Current URL to previous one
 * 5. Rebuild Ids * 
 */
const onClickButtonRemoveURL = () => {
    ASSIGNED_KEYWORDS.value.forEach((e: IKeyword) => KEYWORDS.value[e.id].url = '')
    const structure_index = FILTERED_STRUCTURE.value[CURRENT_URL.value].id
    STRUCTURE.value.splice(structure_index, 1)
    CURRENT_URL.value--
    STRUCTURE.value.forEach((e: IURL, index:number)=>STRUCTURE.value[index].id = index)
}

/**
 * EVENT: on input in keywrods without search
 * Set all keywords as un selected
 * Select only found to just press "set (selected type)"
 */
 const onInputSearch = () => {
    KEYWORDS.value.forEach((e) => e.selected = false)
    if (INPUT_SEARCH.value  !== "") {
        FILTERED_KEYWORDS.value.forEach((e) => e.selected = true)
    }
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
    setTimeout(() => {
        CURRENT_URL.value = index
        if(!['GI','GT'].includes(FILTERED_STRUCTURE.value[index].type)){
            CURRENT_URL_PATH.value = FILTERED_STRUCTURE.value[index].path
            INPUT_EDIT_URL.value = FILTERED_STRUCTURE.value[index].path.substring(1, FILTERED_STRUCTURE.value[index].path.length)
            if (index === 0) {
                INPUT_EDIT_URL.value = FILTERED_STRUCTURE.value[index].path.substring(8, FILTERED_STRUCTURE.value[index].path.length)
            }
        }
    }, 300)
}


/**
 * EVENT: On change order of URL
 * @param index 
 * 
 * 1. Evaluate if index and select_index are diferente. It doesn't have sense
 * do code for move a url to the same position
 * 2. Get the id / index of source array position
 * 3. Get the id / index of destiny array position
 * 4. Copy the source to a temp array
 * 5. Move the destiny array to source with the index of source
 * 6. Move the temp array to destiny with index of destiny
 * 7. Reset the Selector field due is shared between all URLS
 * 8. Save the changes in database
 * 
 */

const onSelectURLOrder = (index: number) => {
    if (index !== SELECT_INDEX.value) {
        const from = FILTERED_STRUCTURE.value[index].id;
        const to = FILTERED_STRUCTURE.value[SELECT_INDEX.value].id;
        const temp = { ...STRUCTURE.value[from], id: to }
        STRUCTURE.value[from] = { ...STRUCTURE.value[to], id: from }
        STRUCTURE.value[to] = { ...temp, id: to }
        SELECT_INDEX.value = undefined
        onUpdateLocalStorage()
    }

}

const onSelectStructureType = () => {

}

/**
 * EVENT on do something related to database, update it
 */


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
    KEYWORDS.value = JSON.parse(localStorage.getItem("keywords") || "").map((e: IKeyword) => { return { ...e, selected: false } });
    STRUCTURE.value = JSON.parse(localStorage.getItem("structure") || "");
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
                    <h5 class="va-h5 text-center w-full">Transactional keywords ({{ FILTERED_KEYWORDS.length -1 }})</h5>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-center gap-2">
                        <va-input type="search" v-model="INPUT_SEARCH" placeholder="Search keywords" preset="bordered"
                            @input="onInputSearch" />
                        <va-button color="info" @click="onClickButtonToURL()" >To URL</va-button>
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

                    <va-sidebar-item active-color="primary" v-for="(item, index) in FILTERED_STRUCTURE"
                        :active="CURRENT_URL === index" @click="onSelectURL(index)">
                        <va-sidebar-item-content class="flex justify-between" v-if="['Transactional', 'Informational'].includes(item.type)">
                            <span class="w-full">
                                {{ index === 0 ? '' : index + " - " }}{{ index > 0 ? FILTERED_STRUCTURE[0].path : '' }}{{
                                    item.path }}

                            </span>
                            <va-select v-if="index > 0" v-model="SELECT_INDEX" :options="MOVE_OPTIONS" placeholder="Move"
                                class="w-20" @update:modelValue="onSelectURLOrder(index)" />
                        </va-sidebar-item-content>
                        <va-sidebar-item-content class="flex justify-between" v-else>
                            <span class="flex justify-between w-full">
                                {{ index === 0 ? '' : index + " - " }}
                                <va-input type="text" v-model="STRUCTURE[item.id].path" placeholder="type here URL or group"
                                class="w-auto" preset="bordered" @input="onUpdateLocalStorage" />
                                <va-button color="danger" icon="clear" @click="onClickButtonRemoveGroup(index)"
                                size="small"></va-button>
                            </span>
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                    <section class="flex flex-col gap-2">
                        <ol class="flex flex-col gap-4 list-disc">
                            <li>
                                <strong class="font-bold text-blue-400">
                                    For add URL
                                </strong>
                                (Example: brands/brandname) and press Enter, Initial "/"" will set automatically
                            </li>
                            <li>
                                <strong class="font-bold text-blue-400">
                                    For add URL Group
                                </strong>
                                Write the name and press "Add Group" button
                            </li>
                        </ol>
                        <div class="flex gap-4">
                            <va-input type="text" v-model="INPUT_ADD_URL" placeholder="type here URL or group"
                                class="w-auto" preset="bordered" @keyup.enter="onKeyPressEnterInputAddURL" />
                            <va-button :disabled="INPUT_ADD_URL.length === 0" color="pirmary" @click="onClickButtonAddGroup()">Add
                                Group</va-button>

                        </div>
                    </section>
                </va-card-content>
            </va-card>
            <!--ASSIGNED KEYWORDS -->
            <va-card>
                <va-card-title class="flex flex-col">
                    <h6 class="va-h6 w-full">Keywrods for: {{ CURRENT_URL > 0 ? FILTERED_STRUCTURE[0].path +
                        CURRENT_URL_PATH :
                        CURRENT_URL_PATH
                    }}</h6>
                    <span class="text-lg">volume: {{ VOLUME_SEARCH }}</span>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-end gap-2">
                        <va-input type="text" v-model="INPUT_EDIT_URL" @input="onInputEditURL($event)" preset="bordered"
                            label="rename url" :error="INPUT_EDIT_URL.length === 0"
                            error-messages="this field must contain information for autosave">
                            
                            <template #prepend>
                                <span class="border-b border-gray-100">{{ CURRENT_URL > 0 ? FILTERED_STRUCTURE[0].path + "/"
                                    : "https://"
                                }}</span>
                            </template>
                        </va-input>
                        <va-button :disabled="CURRENT_URL === 0" color="danger" @click="onClickButtonRemoveURL()">Remove
                            URL</va-button>
                    </section>
                    <va-sidebar-item active-color="primary" v-for="(item, index) in ASSIGNED_KEYWORDS" :key="index"
                        @click="item.selected = !item.selected" :active="item.selected">
                        <va-sidebar-item-content class="flex justify-between">
                            <va-button color="danger" icon="clear" @click="KEYWORDS[item.id].url = ''"
                                size="small"></va-button>
                            <span class="w-full">{{ item.keyword }}</span>
                            <span>{{ item.volume }}</span>
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
        </div>
    </NuxtLayout>
</template>
