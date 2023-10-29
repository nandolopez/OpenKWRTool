<script setup lang="ts">
import { utils, writeFile } from 'xlsx';
import { IKeyword } from '~/interfaces/IKeyword';
import { IURL } from '~/interfaces/IURL';
import { IWorksheet } from '~/interfaces/IWorksheet';

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
const disabledButtonSaveProject = computed(() => localStorage.keywords === undefined)

/**
 * FORM VALIDATOR
 * Check that all required fields contains correct information before enable the upload option
 */
const disabledCSVUploader = computed(() => {

    return INPUT_PROJECT_NAME.value === '' ||
        INPUT_NUMBER_STARTING_LINE.value === 0 ||
        INPUT_KEYWORD_COLUMN.value === 0 ||
        INPUT_VOLUME_COLUMN.value === 0
})

// Get active project from localstorage
const projectName = computed(() => localStorage.getItem('project'))


/**
 * EVENT: On click over Export to Excel button
 * 1. Get the keyword removing the unnecessary "Selected" option
 * 2. Convert the keywords list form JSON to Excel and save it in work sheet
 * "Keywords", ID and adding a option for check if keyword is in post.
 * 
 * In following steps: Convert Filter the keyword and add typical keywords fields
 * 
 * 3. Convert the keywords list filtered by Transactional form JSON to Excel and
 * save it in work sheet "Structure".
 * 
 * 4. Convert the keywords list filtered by Informational form JSON to Excel and
 * save it in work sheet "Blog".
 * 
 * Save the file and the browser will download automatically
 */
const onClickButtonExportToExcel = () => {

    const Keywords = JSON.parse(localStorage.getItem('keywords') || '').map((e: IKeyword) => {
        return {
            keyword: e.keyword,
            volume: e.volume,
            type: e.type,
            url: e.url,
            in_post: false
        }
    })
    /* generate worksheet and workbook */
    const workbook = utils.book_new();
    let worksheet = utils.json_to_sheet(Keywords);
    
    utils.book_append_sheet(workbook, worksheet, "Keywords");
 
    const structure = JSON.parse(localStorage.getItem('structure') || '')

    //Final worksheet to conver from JSON to Excel later
    let worksheet_object: IWorksheet[] = []

    //Get transactional keywords
    let filtered_structure = structure.filter(((e: IKeyword) => e.type === 'Transactional'))

    //Checking all structure for make the Worksheet
    filtered_structure.forEach((e: IURL) => {

        //Creating entry for current URL in worksheet pending of get Volume
        worksheet_object.push({
            URL: e.path,
            Keywords: "",
            Volume: 0,
            In_post: false,
            Title: "",
            MetaTitle: "",
            MetaDescription: "",
            Number_of_words: "0",
        })

        //Get the index of last entry for modify later the volume field
        const last_entry_ws_object = worksheet_object.length
        //Amount of search that will have the current URL
        let url_volume = 0

        //Get all keywords that contains current URL
        const filtered_keywords = Keywords.filter(((kw: IKeyword) => kw.type === 'Transactional' && kw.url === e.path))

        //Adding each keyword accomodated to worksheet structure
        for (let index = 0; index < filtered_keywords.length; index++) {
            const kw = filtered_keywords[index];
            url_volume += kw.volume
            worksheet_object.push({
                URL: kw.url,
                Keywords: kw.keyword,
                Volume: kw.volume,
                In_post: false,
                Title: "",
                MetaTitle: "",
                MetaDescription: "",
                Number_of_words: "",
            })
        }
        //adding the final volume        
        worksheet_object[last_entry_ws_object - 1].Volume = url_volume
    })

    
    worksheet = utils.json_to_sheet(worksheet_object);
    utils.book_append_sheet(workbook, worksheet, "Structure");

    //Resetting object do the same with informational keywords
    worksheet_object = [];

    //Get transactional keywords
    filtered_structure = structure.filter(((e: IKeyword) => e.type === 'Informational'))

    //Checking all structure for make the Worksheet
    filtered_structure.forEach((e: IURL) => {

        //Creating entry for current URL in worksheet pending of get Volume
        worksheet_object.push({
            URL: e.path,
            Keywords: "",
            Volume: 0,
            In_post: false,
            Title: "",
            MetaTitle: "",
            MetaDescription: "",
            Number_of_words: "0",
        })

        //Get the index of last entry for modify later the volume field
        const last_entry_ws_object = worksheet_object.length
        //Amount of search that will have the current URL
        let url_volume = 0

        //Get all keywords that contains current URL
        const filtered_keywords = Keywords.filter(((kw: IKeyword) => kw.type === 'Informational' && kw.url === e.path))

        //Adding each keyword accomodated to worksheet structure
        for (let index = 0; index < filtered_keywords.length; index++) {
            const kw = filtered_keywords[index];
            url_volume += kw.volume
            worksheet_object.push({
                URL: kw.url,
                Keywords: kw.keyword,
                Volume: kw.volume,
                In_post: false,
                Title: "",
                MetaTitle: "",
                MetaDescription: "",
                Number_of_words: "",
            })
        }
        //adding the final volume        
        worksheet_object[last_entry_ws_object - 1].Volume = url_volume
    })
    worksheet = utils.json_to_sheet(worksheet_object);
    utils.book_append_sheet(workbook, worksheet, "Blog");


    // create an XLSX file and try to save to file *
    const name = localStorage.project
    writeFile(workbook, name + ".xlsx", { compression: true });

}

const onClickButtonSaveProject = () => {
    const element = document.createElement('a');
    const export_data = {
        project: localStorage.getItem('project'),
        keywords: JSON.parse(localStorage.getItem('keywords') || ''),
        structure: JSON.parse(localStorage.getItem('structure') || '')
    }

    const file = new Blob([JSON.stringify(export_data)], { type: 'text/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'MyProject.json';
    document.body.appendChild(element);
    element.click();
}

const onInputFileLoadProject = async (event: any) => {
    const file = event[0]
    const text = await file.text();
    const ImportedData = JSON.parse(text);
    localStorage.setItem('keywords', JSON.stringify(ImportedData.keywords))
    localStorage.setItem('project', ImportedData.project)
    localStorage.setItem('structure', ImportedData.structure)
    localStorage.keywords = text
    location.reload();
};

const onInputFileLoadCSV = async (input: any) => {
    localStorage.removeItem('keywords')
    localStorage.removeItem('project')
    localStorage.removeItem('structure')
    const file = input[0]
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
    localStorage.setItem('structure', JSON.stringify([
        { id: 0, path: "https://mysite.com", type: 'Transactional' },
        { id: 1, path: "https://mysite.com/blog", type: 'Informational' }
    ]))
    location.reload();
};

const onInputSelectPreset = (event: any) => {

    if (INPUT_SELECT_PRESET.value === 'Google') {
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
        <va-card>
            <va-card-title>
                <h2 class="va-h4">Current project: {{ !disabledButtonSaveProject ? projectName : 'No project loaded' }}</h2>
            </va-card-title>
            <va-card-content>
                <article class="grid grid-cols-2 gap-2 w-full">
                    <section class="flex flex-col items-center justify-center gap-4">
                        <va-button type="button" @click="onClickButtonSaveProject()" :disabled="disabledButtonSaveProject">
                            Save the project</va-button>
                        <va-button type="button" @click="onClickButtonExportToExcel()"
                            :disabled="disabledButtonSaveProject">
                            Export to Excel</va-button>
                        <p v-if="disabledButtonSaveProject">No projects loaded in your browser</p>

                    </section>
                    <section>
                        <va-alert color="#ce6e67" class="mb-6" v-if="!disabledButtonSaveProject">
                            <span class="font-medium">Note: </span> Load a project removes the current active
                            project, please save the project before load other one.
                        </va-alert>

                        <va-file-upload dropzone @file-added="onInputFileLoadProject($event)" fileTypes=".json" />
                    </section>
                </article>

            </va-card-content>
        </va-card>
        <va-card class="mt-4">
            <va-card-title>
                <h2 class="va-h4">New project</h2>
            </va-card-title>
            <va-card-content>
                <article class="grid grid-cols-2 gap-4 w-full">
                    <h5 class="va-h5">Recommendations</h5>
                    <section class="col-span-2">
                        <ol class="list-disc ml-4  mb-4">
                            <li>
                                Open the CSV with a editor (Excel / notepad / vim / textEdit...) and fill the following
                                information
                            </li>
                            <li>You must fill the form for enable the CSV Uploader</li>
                        </ol>
                        <va-alert color="#ce6e67" class="mb-6" v-if="!disabledButtonSaveProject">
                            Load a CSV removes the current active project, please save the current project before load a new
                            CSV
                        </va-alert>

                    </section>
                    <section class="grid grid-cols-2 gap-6 mb-6">
                        <va-input type="text" v-model="INPUT_PROJECT_NAME" label="Project name *" />
                        <va-select v-model="INPUT_SELECT_PRESET" class="col-span-1" label="Presets"
                            :options="['None', 'Google']" highlight-matched-text
                            @Update:modelValue="onInputSelectPreset($event)" />
                        <va-select v-model="INPUT_SELECT_SEPARATOR" class="col-span-1" label="CSV separator *"
                            :options="['Tabulations', 'Comma', 'Semicolon', 'Spaces']" highlight-matched-text />

                        <va-input type="number" v-model="INPUT_NUMBER_STARTING_LINE" label="Starting line *" />
                        <va-input type="number" v-model="INPUT_KEYWORD_COLUMN" label="Keyword column *" />
                        <va-input type="number" id="keyword_column" v-model="INPUT_VOLUME_COLUMN" label="Volume column *" />
                        <va-input type="number" id="keyword_column" v-model="INPUT_ADS_HIGH"
                            label="Google Ads High range" />
                        <va-textarea label="Black list"
                            placeholder="All keywords that contain words listed here will be removed"
                            v-model="TEXTAREA_BLACKLIST" />
                        <va-textarea label="Informational list"
                            placeholder="All keywords that contain words listed here will set as Informational"
                            v-model="TEXTAREA_FILTER_INFORMATIONAL" />
                        <va-textarea label="Transactional list"
                            placeholder="All keywords that contain words listed here will set as Transactional"
                            v-model="TEXTAREA_FILTER_TRANSACTIONAL" />
                    </section>
                    <section>
                        <va-file-upload dropzone @file-added="onInputFileLoadCSV($event)" :disabled="disabledCSVUploader"
                            fileTypes=".csv" />
                    </section>
                </article>

            </va-card-content>
        </va-card>

    </NuxtLayout>
</template>
