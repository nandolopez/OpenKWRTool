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
const FILTERED_KEYWORDS = computed<IKeyword[]>(() => {
    if (INPUT_SEARCH.value !== '') {
        return KEYWORDS.value.filter((e: IKeyword) => e.url === '' && e.type === RADIO_KEYWORD_TYPE.value && e.keyword.includes(INPUT_SEARCH.value))
    } else {
        return KEYWORDS.value.filter((e: IKeyword) => e.url === '' && e.type === RADIO_KEYWORD_TYPE.value)
    }
})

const FILTERED_STRUCTURE = computed(() => {
    return STRUCTURE.value.filter((e: IURL) => e.type === RADIO_KEYWORD_TYPE.value)
})

const ASSIGNED_KEYWORDS = computed(() => {
    return KEYWORDS.value.filter((e: IKeyword) => e.url === INPUT_EDIT_URL.value)
})

//METHODS

const onClickButtonAddKeyword = () => {
    FILTERED_KEYWORDS.value.forEach((e:IKeyword)=>{
        if(e.selected){
            KEYWORDS.value[e.id].url = INPUT_EDIT_URL.value
            KEYWORDS.value[e.id].selected = false
        }
    })
    INPUT_SEARCH.value = ""
    onUpdateLocalStorage()
}

const onClickButtonAddURL = () => {
    if (INPUT_ADD_URL.value.length > 3) {
        STRUCTURE.value.push({ id: STRUCTURE.value.length, path: INPUT_ADD_URL.value, type: RADIO_KEYWORD_TYPE.value })
    }
    INPUT_ADD_URL.value = ""
    onUpdateLocalStorage()
}
const onClickButtonCheckAll = () => {
    CHECK_ALL_STATUS.value = !CHECK_ALL_STATUS.value
    FILTERED_KEYWORDS.value.forEach(e => KEYWORDS.value[e.id].selected = CHECK_ALL_STATUS.value)
}

const onInputEditURL = (event: any) =>{
    const new_url = event.target.value
    const structure_index = FILTERED_STRUCTURE.value[CURRENT_URL.value].id
    ASSIGNED_KEYWORDS.value.forEach((e:IKeyword)=>{
        KEYWORDS.value[e.id].url = new_url
    })
    
    console.log(STRUCTURE.value[structure_index])
    STRUCTURE.value[structure_index].path = new_url
    onUpdateLocalStorage()
}

const onClickButtonRemoveURL = () =>{
    ASSIGNED_KEYWORDS.value.forEach((e:IKeyword)=>{
        KEYWORDS.value[e.id].url = ''
    })
    const structure_index = FILTERED_STRUCTURE.value[CURRENT_URL.value].id
    STRUCTURE.value.splice(structure_index, 1)
}

onMounted(() => {
    KEYWORDS.value = JSON.parse(localStorage.keywords).map((e: IKeyword) => { return { ...e, selected: false } });
    STRUCTURE.value = JSON.parse(localStorage.structure);
    INPUT_EDIT_URL.value = FILTERED_STRUCTURE.value[0].path
    console.log(KEYWORDS.value[25])
});

const onSelectURL = (index: number) => {
    CURRENT_URL.value = index
    INPUT_EDIT_URL.value = FILTERED_STRUCTURE.value[index].path
}


const onUpdateLocalStorage = () => {
    localStorage.setItem('structure', JSON.stringify(STRUCTURE.value))
    localStorage.setItem('keywords', JSON.stringify(KEYWORDS.value))
    
}


</script>
<template>
    <NuxtLayout name="projects">
        <va-card>
            <va-card-title>
                <h5 class="text-center va-h5 w-full">What you want to structure?</h5>
            </va-card-title>
            <va-card-content class="flex justify-center gap-4">
                <va-radio v-model="RADIO_KEYWORD_TYPE" option="Transactional" name="radio-group"
                    label="Website structure" />
                <va-radio v-model="RADIO_KEYWORD_TYPE" option="Informational" name="radio-group" label="blog" />
            </va-card-content>
        </va-card>
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
            <va-card>
                <va-card-title>
                    <h5 class="va-h5 text-center w-full">URLS</h5>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex items-center gap-2">
                        <va-input type="text" v-model="INPUT_ADD_URL" placeholder="Add SubURL (Example: brands/brand_name)"
                            preset="bordered" @keyup.enter="onClickButtonAddURL" />
                        <va-button color="success" @click="onClickButtonAddURL()">Add</va-button>
                    </section>

                    <va-sidebar-item active-color="primary" v-for="(item, index) in FILTERED_STRUCTURE"
                        :active="CURRENT_URL === index" @click="onSelectURL(index)">
                        <va-sidebar-item-content class="flex justify-between">
                            {{ index > 0 ? FILTERED_STRUCTURE[0].path + '/' : '' }}{{ item.path }}
                        </va-sidebar-item-content>
                    </va-sidebar-item>
                </va-card-content>
            </va-card>
            <va-card>
                <va-card-title class="flex flex-col">
                    <h6 class="va-h6 text-center w-full">Keywrods for:</h6>
                    <span class="text-lg">{{ CURRENT_URL > 0 ? FILTERED_STRUCTURE[0].path + '/' + INPUT_EDIT_URL : INPUT_EDIT_URL }}/</span>
                </va-card-title>
                <va-card-content class="flex flex-col gap-4">
                    <section class="flex justify-between items-end gap-2">
                        <va-input type="text" v-model="INPUT_EDIT_URL" @input="onInputEditURL($event)" preset="bordered" label="rename url" />
                        <va-button :disabled="CURRENT_URL === 0" color="danger" @click="onClickButtonRemoveURL()">Remove URL</va-button>
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
    </NuxtLayout>
</template>
