<script setup lang="ts">

const REPLACE_ACCENTS = ref(true);
const REMOVE_BIG = ref(true);
const REMOVE_CHARACTERS = ref(true);
const SET_UNIQUES = ref(true);

//INPUT
const TEXTAREA_DIRT_KW = ref("")
const TEXTAREA_CLEAN_KW = ref("")
const TEXTAREA_BLACKLIST = ref("")

//STATUS
const REMOVED_HIGH_LONG_TAIL = ref(false)
const CLEANED_CHARACTERS = ref(false)
const REPLACED_ACCENT = ref(false)
const REMOVED_DUPLICATES = ref(false)
const REMOVED_BLACKLIST = ref(false)
const STEP = ref(0)

const onClickButtonHighLongtail = () => {
  TEXTAREA_CLEAN_KW.value = TEXTAREA_DIRT_KW.value
    .split("\n")
    .filter((line) => line.split(" ").length <= 10)
    .join("\n");
  REMOVED_HIGH_LONG_TAIL.value = true
  STEP.value++
}
const onClickButtonClearCharacters = () => {
  const regex = /[^a-zA-Z0-9ñÑ\s]/g;
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.replace(regex, "");
  CLEANED_CHARACTERS.value = true
  STEP.value++
}

const onClickButtonReplaceAccents = () => {
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("Á").join("a");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("á").join("a");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("É").join("e");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("é").join("e");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("Í").join("i");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("í").join("i");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("Ó").join("o");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("ó").join("o");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("Ú").join("u");
  TEXTAREA_CLEAN_KW.value = TEXTAREA_CLEAN_KW.value.split("ú").join("u");
  REPLACED_ACCENT.value = true
  STEP.value++
}

const onClickButtonRemoveDuplicates = () => {
  TEXTAREA_CLEAN_KW.value = [... new Set(TEXTAREA_CLEAN_KW.value.split("\n"))].join("\n");
  REMOVED_DUPLICATES.value = true
  STEP.value++
}
const onClickButtonRemoveBlacklistedKeywords = () => {
  const BLACKLIST = TEXTAREA_BLACKLIST.value.split(", ")
  const TO_CLEAN_LIST = TEXTAREA_CLEAN_KW.value.split("\n")
  const TO_REMOVE: number[] = []

  if (BLACKLIST[0] !== '') {
    TO_CLEAN_LIST.forEach((e: string, index) => {
      if (BLACKLIST.some((bl: string) => e.includes(bl))) {
        TO_REMOVE.push(index)
      }
    })

    TO_REMOVE.forEach(e => TO_CLEAN_LIST.splice(e, 1))
    TEXTAREA_CLEAN_KW.value = TO_CLEAN_LIST.join('\n');
  }
  STEP.value++
}

const onClickButtonCopy = () => {
  navigator.clipboard.writeText(TEXTAREA_CLEAN_KW.value);
}

const onClickButtonResetAll = () => {

  REPLACE_ACCENTS.value = true
  REMOVE_BIG.value = true
  REMOVE_CHARACTERS.value = true
  SET_UNIQUES.value = true

  //INPUT
  TEXTAREA_DIRT_KW.value = ""
  TEXTAREA_CLEAN_KW.value = ""
  TEXTAREA_BLACKLIST.value = ""

  //STATUS
  REMOVED_HIGH_LONG_TAIL.value = false
  CLEANED_CHARACTERS.value = false
  REPLACED_ACCENT.value = false
  REMOVED_DUPLICATES.value = false
  REMOVED_BLACKLIST.value = false
}

</script>
<template>
  <va-card class="h-full">
    <va-card-content>
      <div class="grid grid-cols-3 gap-2">
        <va-textarea rows="20" v-model="TEXTAREA_DIRT_KW" label="Insert here the keywords list"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

        <div class="flex flex-col gap-4">
          <h4 class="va-h4">FILTERS</h4>
          <h5 class="va-h6">Step 1. Remove unacceptable long tail</h5>
          <va-button @click="onClickButtonHighLongtail()" :disabled="STEP > 1">Clear +10 words long tail</va-button>
          <h5 class="va-h6">Step 2. Remove unaccepted characters </h5>
          <va-button @click="onClickButtonClearCharacters()" :disabled="STEP !== 2">clear characters</va-button>
          <h5 class="va-h6">Step 3. Replace accented characaters (é) for not accented characters (e).</h5>
          <va-button @click="onClickButtonReplaceAccents()" :disabled="STEP !== 3">Replace accents</va-button>
          <h5 class="va-h6">Step 4. Remove duplicated.</h5>
          <va-button @click="onClickButtonRemoveDuplicates()" :disabled="STEP !== 4">Remove duplicates</va-button>
          <h5 class="va-h6">Step 5. Remove blacklisted keywords.</h5>
          <va-textarea v-model="TEXTAREA_BLACKLIST" label="Black list" placeholder="Comma separated: word1, word 2, word 3..."></va-textarea>
          <va-button @click="onClickButtonRemoveBlacklistedKeywords()" :disabled="STEP !== 5">Remove blacklisted keywords</va-button>
          <va-button color="success" class="mt-20" @click="onClickButtonCopy()" :disabled="STEP !== 6">Copy result</va-button>
          <va-button color="danger" class="mt-20" @click="onClickButtonResetAll()">Reset all</va-button>
          
        </div>
        <va-textarea rows="20" v-model="TEXTAREA_CLEAN_KW" label="Your cleaned keywords" readonly
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>

    </va-card-content>
  </va-card>
</template>
