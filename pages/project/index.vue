<script setup lang="ts">
import { IKeyword } from '~/interfaces/IKeyword';

definePageMeta({
    layout: false
})


// INPUTS
const INPUT_SELECT_PRESET = ref("None")

const INPUT_SELECT_SEPARATOR = ref("Tabulations")

const INPUT_PROJECT_NAME = ref("")
const INPUT_NUMBER_STARTING_LINE = ref<number>(0)
const INPUT_KEYWORD_COLUMN = ref<number>(0)
const INPUT_VOLUME_COLUMN = ref<number>(0)
const INPUT_ADS_HIGH = ref<number>(0)

const TEXTAREA_BLACKLIST = ref("")
const TEXTAREA_FILTER_INFORMATIONAL = ref("")
const TEXTAREA_FILTER_TRANSACTIONAL = ref("")

//COMPUTED PROPERTIES

//Check if exists a active project
const disabledButtonSaveProject = computed(() => {
    return localStorage.keywords === undefined
})

// Validate form
const disabledCSVUploader = computed(() => {

    return INPUT_PROJECT_NAME.value === '' ||
        INPUT_NUMBER_STARTING_LINE.value === 0 ||
        INPUT_KEYWORD_COLUMN.value === 0 ||
        INPUT_VOLUME_COLUMN.value === 0
})

// Get active project from localstorage
const projectName = computed(() => localStorage.getItem('project'))


const onClickButtonSaveProject = () => {
    const element = document.createElement('a');
    const export_data = {
        project: localStorage.getItem('project'),
        keywords: JSON.parse(localStorage.getItem('keywords') || ''),
        structure: JSON.parse(localStorage.getItem('structure') || ''),
        blog: JSON.parse(localStorage.getItem('blog') || '')
    }

    const file = new Blob([JSON.stringify(export_data)], { type: 'text/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'MyProject.json';
    document.body.appendChild(element);
    element.click();

}


const onInputFileLoadProject = async (event: any) => {
    const file = event.target.files[0];
    const text = await file.text();
    const ImportedData = JSON.parse(text);
    localStorage.setItem('keywords', JSON.stringify(ImportedData.keywords))
    localStorage.setItem('project', ImportedData.project)
    localStorage.setItem('structure', ImportedData.structure)
    localStorage.setItem('blog', ImportedData.blog)
    localStorage.keywords = text
    location.reload();
};

const onInputFileLoadCSV = async (event: any) => {
    localStorage.removeItem('keywords')
    localStorage.removeItem('project')
    localStorage.removeItem('structure')
    localStorage.removeItem('blog')
    const file = event.target.files[0];
    const text = await file.text();
    const lines = text.split('\n');
    let separator = '\t';

    switch (INPUT_SELECT_SEPARATOR.value) {
        case "Tabulations":
            separator = '\t';
            break;
        case "Semicolon":
            separator = ';';
            break;
        case "Comma":
            separator = ',';
            break;
        case "Spaces":
            separator = ' ';
            break;
    }

    const BLACKLIST = TEXTAREA_BLACKLIST.value.split(", ")
    const INFORMATIONAL = TEXTAREA_FILTER_INFORMATIONAL.value.split(", ")
    const TRANSACTIONAL = TEXTAREA_FILTER_TRANSACTIONAL.value.split(", ")

    let data = lines.slice(INPUT_NUMBER_STARTING_LINE.value - 1).map((line: any) => {
        const values = line.split(separator);

        //keyword by default is undefined
        let kw_type = ''

        let keyword = values[INPUT_KEYWORD_COLUMN.value - 1]


        //If people bid up for the keyword this is transactional 
        if (values[INPUT_ADS_HIGH.value - 1] === "") kw_type = 'Transactional';

        //If keyword contains a word in INFORMATIONAL kw list, it's informational 
        if (INFORMATIONAL[0] !== '') {
            if (INFORMATIONAL.some((f: string) => values[INPUT_KEYWORD_COLUMN.value - 1].includes(f))) {
                kw_type = 'Informational';
            }
        }

        //If keyword contains a word in TRANSACTIONAL kw list, it's transactional 
        if (TRANSACTIONAL[0] !== '') {
            if (TRANSACTIONAL.some((f: string) => values[INPUT_KEYWORD_COLUMN.value - 1].includes(f))) {
                kw_type = 'Transactional';
            }
        }
        if (BLACKLIST[0] !== '') {
            if (BLACKLIST.some((bl: string) => values[INPUT_KEYWORD_COLUMN.value - 1].includes(bl))) {
                keyword = 'null'
            }
        }

        return {
            id: 0,
            keyword: keyword,
            volume: Number(values[INPUT_VOLUME_COLUMN.value - 1]),
            type: kw_type,
            url: "",
            selected: false
        };
    });


    data = data.filter((e: any) => e.keyword !== 'null')

    data.sort((a: any, b: any) => b.volume - a.volume);

    //assigning Ids
    data.forEach((element: any, index: number) => {
        data[index].id = index
    });

    localStorage.setItem('project', INPUT_PROJECT_NAME.value)
    localStorage.setItem('keywords', JSON.stringify(data))
    localStorage.setItem('structure', JSON.stringify([]))
    localStorage.setItem('blog', JSON.stringify([]))
    // location.reload();
};

const onInputSelectPreset = (event: any) => {
    if (event.target.value === 'Google') {
        INPUT_NUMBER_STARTING_LINE.value = 6
        INPUT_KEYWORD_COLUMN.value = 1
        INPUT_VOLUME_COLUMN.value = 4
        INPUT_ADS_HIGH.value = 10
        INPUT_SELECT_SEPARATOR.value = "Tabulations"
    }
}


</script>
<template>
    <NuxtLayout name="projects">
        <h2 class="va-h2">Current project: {{ projectName }}</h2>
        <!--Loader-->
        <article class="grid grid-cols-2 gap-2 w-full">
            <section class="flex flex-col items-center justify-center">
                <button type="button"
                    class="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="onClickButtonSaveProject()" :disabled="disabledButtonSaveProject">
                    Save the project</button>
                <button type="button"
                    class="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="onClickButtonSaveProject()" :disabled="disabledButtonSaveProject">
                    Export to Excel</button>
                <p v-if="disabledButtonSaveProject">No projects loaded in your browser</p>

            </section>
            <section>
                <div class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert" v-if="!disabledButtonSaveProject">
                    <span class="font-medium">Note: </span> Load a project removes the current active
                    project, please save it before load other one.
                </div>
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Load project,
                                click
                                here </span> or drag and drop</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept=".json"
                        @input="onInputFileLoadProject($event)" />
                </label>
            </section>
        </article>
        <h2 class="border-b font-bold mb-6 pb-4 text-2xl  w-full">New project</h2>
        <!--Loader-->
        <article class="grid grid-cols-2 gap-4 w-full">
            <section class="col-span-2">
                <p>Open the CSV with a editor (Excel / notepad / vim / textEdit...) and fill the following information</p>
                <p>You must fill the form for enable the CSV Uploader</p>
                <div class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert" v-if="!disabledButtonSaveProject">
                    <span class="font-medium">Note: </span> Load a CSV removes the current active
                    project, please save it before load a new CSV.
                </div>
            </section>
            <section class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label for="project_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Project name *
                    </label>
                    <input type="text" id="project_name" v-model="INPUT_PROJECT_NAME"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <label for="presets"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Presets</label>
                    <select id="presets" v-model="INPUT_SELECT_PRESET" @input="onInputSelectPreset($event)"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="None">None</option>
                        <option value="Google">Google Keyword Planner</option>
                    </select>
                </div>
                <div>
                    <label for="separator" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Separator
                        *</label>
                    <select id="separator" v-model="INPUT_SELECT_SEPARATOR"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="Tabulations">Tabulations</option>
                        <option value="Comma">Comma</option>
                        <option value="Semicolon">Semicolon</option>
                        <option value="Spaces">Spaces</option>
                    </select>
                </div>
                <div>
                    <label for="Headers_line" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Starting line *</label>
                    <input type="number" id="Headers_line" v-model="INPUT_NUMBER_STARTING_LINE"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <label for="keyword_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Keyword column *
                    </label>
                    <input type="number" id="keyword_column" v-model="INPUT_KEYWORD_COLUMN"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <label for="volume_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Volume column *
                    </label>
                    <input type="number" id="keyword_column" v-model="INPUT_VOLUME_COLUMN"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <label for="volume_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Google Ads High range
                    </label>
                    <input type="number" id="keyword_column" v-model="INPUT_ADS_HIGH"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <label for="volume_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dirt keywords filter (that you like remove from kw research)
                    </label>


                    <textarea id="message" rows="4" v-model="TEXTAREA_BLACKLIST"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write the blacklist keyword comma separated, example: brand1, unnecesary, text..."></textarea>
                </div>
                <div>
                    <label for="volume_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Informational filter
                    </label>
                    <textarea id="message" rows="4" v-model="TEXTAREA_FILTER_INFORMATIONAL"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write the informational of keywords comma separated, example: best, new, discover..."></textarea>
                </div>
                <div>
                    <label for="volume_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Transactional filter
                    </label>
                    <textarea id="message" rows="4" v-model="TEXTAREA_FILTER_TRANSACTIONAL"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write the transactional of keywords comma separated, example: price, purchase, shop..."></textarea>
                </div>

            </section>
            <section>
                <label for="dropzone-file-csv"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50  dark:bg-gray-700  dark:border-gray-600 "
                    :class="disabledCSVUploader ? 'opacity-50 cursor-not-allowed' : 'dark:hover:bg-bray-800 cursor-pointer hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600'">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Load CSV file,
                                click
                                here </span> or drag and drop</p>
                    </div>
                    <input id="dropzone-file-csv" type="file" class="hidden" accept=".csv" :disabled="disabledCSVUploader"
                        @input="onInputFileLoadCSV($event)" />
                </label>
            </section>
        </article>
    </NuxtLayout>
</template>
