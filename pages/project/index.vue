<script setup lang="ts">
definePageMeta({
    layout: false
})

// INPUTS

const STATUS = ref("")
const INPUT_FILE_LOAD_PROJECT = ref("")

const INPUT_FILE_LOAD_CSV = ref("")
const INPUT_SELECT_PRESET = ref("None")

const INPUT_NUMBER_INITIAL_LINE = ref<number | undefined>()
const INPUT_INITIAL_COLUMN = ref<number | undefined>()
const INPUT_PROJECT_NAME = ref("")



const onClickButtonSaveProject = () => {
    const element = document.createElement('a');
    const file = new Blob([localStorage.keywords], { type: 'text/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'MyProject.json';
    document.body.appendChild(element);
    element.click();
}

const onClickButtonLoadProcessCSV = () => {

}

const disabledButtonSaveProject = computed(() => {
    return localStorage.keywords === undefined
})


</script>
<template>
    <NuxtLayout name="projects">
        <h2 class="border-b font-bold mb-6 pb-4 text-2xl  w-full">Current project</h2>
        <!--Loader-->
        <article class="grid grid-cols-2 gap-2 w-full">
            <section class="flex flex-col items-center justify-center">
                <button type="button"
                    class="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="onClickButtonSaveProject()" :disabled="disabledButtonSaveProject">
                    Save current project</button>
                <p v-if="disabledButtonSaveProject">No projects loaded in your browser</p>

            </section>
            <section>
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
                    <input id="dropzone-file" type="file" class="hidden" accept=".json" />
                </label>
            </section>
        </article>
        <h2 class="border-b font-bold mb-6 pb-4 text-2xl  w-full">New project</h2>
        <!--Loader-->
        <article class="grid grid-cols-2 gap-4 w-full">
            <section>
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                    <input id="dropzone-file" type="file" class="hidden" accept=".csv" />
                </label>
            </section>
            <section class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Presets</label>
                    <select id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>none</option>
                        <option>Google Keyword Planner</option>
                    </select>
                </div>
                <div>
                    <label for="line" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Initial
                        line</label>
                    <input type="number" id="line"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </div>
                <div>
                    <label for="keyword_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Keyword column
                    </label>
                    <input type="number" id="keyword_column"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </div>
                <div>
                    <label for="volume_column" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Volume column
                    </label>
                    <input type="number" id="keyword_column"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </div>
                <div>
                    <label for="project_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Project name
                    </label>
                    <input type="text" id="project_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </div>
                <div class="flex items-center justify-center pt-6 w-full">
                    <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32 h-12"
                        @click="onClickButtonSaveProject()">
                        Process CSV</button>
                </div>

            </section>
        </article>
    </NuxtLayout>
</template>
