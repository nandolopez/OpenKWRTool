<script setup lang="ts">
const DIRT_KWS = ref(``);
const CLEAN_KWS = ref("");
const REPLACE_ACCENTS = ref(true);
const REMOVE_BIG = ref(true);
const REMOVE_CHARACTERS = ref(true);
const SET_UNIQUES = ref(true);

const onClickButtonClear = () => {
  CLEAN_KWS.value = DIRT_KWS.value;
  if (REPLACE_ACCENTS) {
    CLEAN_KWS.value = CLEAN_KWS.value.split("Á").join("a");
    CLEAN_KWS.value = CLEAN_KWS.value.split("á").join("a");
    CLEAN_KWS.value = CLEAN_KWS.value.split("É").join("e");
    CLEAN_KWS.value = CLEAN_KWS.value.split("é").join("e");
    CLEAN_KWS.value = CLEAN_KWS.value.split("Í").join("i");
    CLEAN_KWS.value = CLEAN_KWS.value.split("í").join("i");
    CLEAN_KWS.value = CLEAN_KWS.value.split("Ó").join("o");
    CLEAN_KWS.value = CLEAN_KWS.value.split("ó").join("o");
    CLEAN_KWS.value = CLEAN_KWS.value.split("Ú").join("u");
    CLEAN_KWS.value = CLEAN_KWS.value.split("ú").join("u");
    CLEAN_KWS.value = CLEAN_KWS.value.split("Ñ").join("n");
    CLEAN_KWS.value = CLEAN_KWS.value.split("ñ").join("n");
  }

  if (REMOVE_CHARACTERS) {
    const regex = /[^a-zA-Z0-9\n ]/g;
    CLEAN_KWS.value = CLEAN_KWS.value.replace(regex, "");
  }

  if (REMOVE_BIG) {
    CLEAN_KWS.value = CLEAN_KWS.value
      .split("\n")
      .filter((line) => line.split(" ").length <= 10)
      .join("\n");
  }
  if(SET_UNIQUES){
    CLEAN_KWS.value = [... new Set(CLEAN_KWS.value.split("\n"))].join("\n");
  }
};
</script>
<template>
  <div class="grid grid-cols-3 gap-2">
    <textarea rows="20" v-model="CLEAN_KWS" label="Insert here the keywords list" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

    <div class="flex flex-col gap-4">
      <h2 class="text-2xl text-center">FILTERS</h2>
      <CheckboxComponent label="Replace accented letters (á, é, í....) for not accented letters (a, e, i...)" v-model="REPLACE_ACCENTS" />
      <CheckboxComponent label="Remove long tail keywords with more of 10 words" v-model="REMOVE_BIG" />
      <CheckboxComponent label="Remove unwished characters like + -" v-model="REMOVE_CHARACTERS" />
      <CheckboxComponent label="Remove duplicated content" v-model="SET_UNIQUES" />
      <UButton label="Clear" @click="onClickButtonClear()" />
    </div>
    <textarea rows="20" v-model="CLEAN_KWS" label="Your cleaned keywords" readonly  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
</template>
