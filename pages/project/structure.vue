<script setup lang="ts">
// You might choose this based on an API call or logged-in status
definePageMeta({
    layout: false,
});

import { IKeyword } from "../../interfaces/IKeyword";

//Main keywords from local storage
const Keywords = ref<IKeyword[]>([]);
const STRUCTURE = ref<string[]>([]);

//For undo last action button
const LAST_ACTION = ref<IKeyword[]>([]);
const ACTIVE_URL = ref<number>(0);

//If the last action is a deletion recover it
const LAST_ACTION_IS_DELETE = ref(false);

//SEARCH INPUTS
const INPUT_SEARCH = ref("");
const INPUT_URL = ref("");
const INPUT_ACTIVE_URL = ref("");

// For Initial status for All checked / unchecked in "check all" buttons
const ALL_TRANSACTIONAL = ref(false);

//COMPUTED PROPERTIES
/**
 * Active URL keywords
 */
const activeURLKeywords = computed(() => {
    return Keywords.value.filter(
        (e) => e.url === STRUCTURE.value[ACTIVE_URL.value],
    );
});

/**
 * Display keywords by type if associated searchbox is clear, show the filtered
 * information, if input search contain something, do the filter
 */

const KEYWORDS_TRANSACTIONAL = computed(() => {
    if (INPUT_SEARCH.value !== "") {
        ALL_TRANSACTIONAL.value = false;
        return Keywords.value.filter(
            (e: IKeyword) =>
                e.type === "Transactional" &&
                e.keyword.includes(INPUT_SEARCH.value) &&
                e.url === "",
        );
    }
    return Keywords.value.filter(
        (e: IKeyword) => e.type === "Transactional" && e.url === "",
    );
});

/**
 * Enable / disable button if inptu_url has content or not
 */
const disableButtonAddURL = computed(() => INPUT_URL.value.length < 4);

/**
 * For enable / disable action buttons (set transactional / informational) and
 * remove KW
 */
const disableButtonIfNotSelectedKeyword = computed(() =>
    Keywords.value.every((e: IKeyword) => e.selected === false),
);

const amountURL = computed(() =>
    activeURLKeywords.value.reduce(
        (accumulator: number, element: IKeyword) => accumulator + element.volume,
        0,
    ),
);

//METHODS

/**
 * On check all buttons set all as checked / no checked
 * and modify his global status
 */

const onClickButtonAddURL = () => {
    if(INPUT_URL.value.length >2){
        STRUCTURE.value.push(INPUT_URL.value);
        ACTIVE_URL.value = STRUCTURE.value.length;
        if (STRUCTURE.value.length === 0) {
            localStorage.setItem("blog", JSON.stringify([INPUT_URL.value]));
        }
        INPUT_URL.value = "";
        onUpdateLocalStorage();
        ACTIVE_URL.value = STRUCTURE.value.length
    }
};

/**
 * On check all buttons set all as checked / no checked
 * and modify his global status
 */

const onClickButtonCheckAllTransactional = () => {
    ALL_TRANSACTIONAL.value = !ALL_TRANSACTIONAL.value;
    KEYWORDS_TRANSACTIONAL.value.forEach(
        (e) => (Keywords.value[e.id].selected = ALL_TRANSACTIONAL.value),
    );
    onUpdateLocalStorage();
};

/**
 *  1. If last action it's a remove of keyword, recover it and in her previous
 *  position (defined by ID)
 *  2. Recompose the IDs based in the index of each keywords
 *
 *  3. If we like undo a assignment, the affected keywords as before
 *
 */
const onClickButtonUndoLastAction = () => {
    LAST_ACTION.value.forEach((e: IKeyword) => {
        Keywords.value[e.id].type = e.type;
        Keywords.value[e.id].selected = false;
    });

    LAST_ACTION.value = [];
    LAST_ACTION_IS_DELETE.value = false;
    onUpdateLocalStorage();
};
/**
 *  1. If last action it's a remove of keyword, recover it and in her previous
 *  position (defined by ID)
 *  2. Recompose the IDs based in the index of each keywords
 *
 *  3. If we like undo a assignment, the affected keywords as before
 *
 */
const onClickURL = (url: string) => {
    ACTIVE_URL.value = STRUCTURE.value.indexOf(url);
    INPUT_ACTIVE_URL.value = STRUCTURE.value[ACTIVE_URL.value];
};

const onClickButtonAddKeywordsToURL = () => {
    LAST_ACTION.value = [];
    Keywords.value.forEach((e) => {
        if (e.selected) {
            LAST_ACTION.value.push({ ...e });
            Keywords.value[e.id].url = STRUCTURE.value[ACTIVE_URL.value];
            Keywords.value[e.id].selected = false;
        }
    });
    onUpdateLocalStorage();

    INPUT_SEARCH.value = "";
};

const onInputTextURL = () => {
    activeURLKeywords.value.forEach((e) => {
        Keywords.value[e.id].url = INPUT_ACTIVE_URL.value;
    });
    if (ACTIVE_URL.value === 0) {
        const blog = JSON.parse(localStorage.getItem("blog") || "");
        blog[0] = INPUT_ACTIVE_URL.value;

        localStorage.setItem("blog", JSON.stringify(blog));
    }
    STRUCTURE.value[ACTIVE_URL.value] = INPUT_ACTIVE_URL.value;
    onUpdateLocalStorage();
};

const onClickButtonRemoveURL = () => {
    activeURLKeywords.value.forEach((e) => {
        Keywords.value[e.id].url = "";
    });
    STRUCTURE.value.splice(ACTIVE_URL.value, 1);
    ACTIVE_URL.value = 0;
    onUpdateLocalStorage();
};

const onUpdateLocalStorage = () => {
    localStorage.setItem("keywords", JSON.stringify(Keywords.value));
    localStorage.setItem("structure", JSON.stringify(STRUCTURE.value));
};

onMounted(() => {
    Keywords.value = JSON.parse(localStorage.keywords);
    STRUCTURE.value = JSON.parse(localStorage.structure);
    if (STRUCTURE.value.length > 0) STRUCTURE.value = ["https://yoursite.com"]
    INPUT_ACTIVE_URL.value = STRUCTURE.value[ACTIVE_URL.value];
});
</script>
<template>
    <NuxtLayout name="projects">
        <section class="flex justify-around">

            <button type="button"
                class="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                :disabled="LAST_ACTION.length === 0" @click="onClickButtonUndoLastAction">
                Undo last action
            </button>
        </section>
        <div class="grid grid-cols-3 gap-4 1/2">
            <article class="flex flex-col gap-2 h-full">
                <h2 class="block text-center text-xl mb-4">
                    Transactional / mixed keywords
                </h2>
                <section class="flex justify-between items-center gap-2">
                    <button type="button"
                        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        @click="onClickButtonCheckAllTransactional">
                        {{ ALL_TRANSACTIONAL ? "Unc" : "C" }}heck All
                    </button>
                    <input type="search" v-model="INPUT_SEARCH"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search keyword" />
                </section>
                <ul class="flex flex-col max-h-screen gap-2 overflow-y-auto">
                    <li v-for="item in KEYWORDS_TRANSACTIONAL"
                        @click="Keywords[item.id].selected = !Keywords[item.id].selected"
                        class="flex gap-4 p-2 bg-teal-700 text-white border border-teal-200 rounded-lg shadow hover:bg-teal-100 dark:bg-teal-800 dark:border-teal-700 dark:hover:bg-teal-700 w-full">
                        <div class="w-full flex items-center gap-4">
                            <input id="default-checkbox" type="checkbox" v-model="Keywords[item.id].selected"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <a :href="'https://www.google.com/search?q=' +
                                item.keyword.replace(' ', '+')
                                " target="_blank" class="text-white dark:text-white">{{ item.keyword }}</a>
                        </div>
                        <span class="block px-4 text-right">{{ item.volume }}</span>
                    </li>
                </ul>
            </article>
            <article class="flex flex-col gap-2 h-full">
                <h2 class="block text-center text-xl mb-4">Structure URL</h2>
                <section class="flex justify-between items-center gap-2">
                    <input type="text" v-model="INPUT_URL"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example.com or /content" @keyup.enter="onClickButtonAddURL" />
                    <button type="button"
                        class="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        :disabled="disableButtonAddURL" @click="onClickButtonAddURL">
                        Add URL
                    </button>

                </section>
                <ul class="flex flex-col max-h-screen gap-2 overflow-y-auto">
                    <li v-for="item in STRUCTURE" @click="onClickURL(item)"
                        class="cursor-pointer flex items-center gap-4 p-2 border text-white border-blue-200 rounded-lg shadow hover:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700 w-full"
                        :class="STRUCTURE[ACTIVE_URL] === item
                            ? 'dark:bg-blue-400 bg-blue-600 text-blue-700'
                            : ' bg-blue-800  dark:bg-blue-800'
                            ">
                        <div class="w-full flex items-center gap-4">{{ item }}</div>
                        <svg v-if="STRUCTURE[ACTIVE_URL] === item" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </li>
                </ul>
            </article>
            <article class="flex flex-col gap-2 h-full">
                <h2 class="block text-center text-xl mb-4">
                    Keywords of {{ STRUCTURE[ACTIVE_URL] }}
                </h2>
                <section class="flex justify-between items-center gap-2">
                    <input type="text" v-model="INPUT_ACTIVE_URL" @input="onInputTextURL"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <button type="button"
                        class="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
                        :disabled="ACTIVE_URL === 0" @click="onClickButtonRemoveURL()">
                        RemoveURL
                    </button>
                </section>
                <section class="flex justify-between items-center gap-2">
                    <button type="button"
                        class="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        :disabled="disableButtonIfNotSelectedKeyword" @click="onClickButtonAddKeywordsToURL()">
                        Add Keywords to URL
                    </button>
                    {{ amountURL }} Monthly search
                </section>
                <ul class="flex flex-col max-h-screen gap-2 overflow-y-auto">
                    <li v-for="item in activeURLKeywords" @click="Keywords[item.id].selected = !Keywords[item.id].selected"
                        class="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        <div class="w-full flex items-center gap-4">
                            <input id="default-checkbox" type="checkbox" v-model="Keywords[item.id].selected"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <a :href="'https://www.google.com/search?q=' +
                                item.keyword.replace(' ', '+')
                                " target="_blank" class="text-white dark:text-white">{{ item.keyword }}</a>
                        </div>
                        <span class="block px-4 text-right">{{ item.volume }}</span>
                    </li>
                </ul>
            </article>
        </div>
    </NuxtLayout>
</template>
