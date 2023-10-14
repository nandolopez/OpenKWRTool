<script setup lang="ts">
const DIRT_KWS = ref(``)
const CLEAN_KWS = ref("")
const REPLACE_ACCENTS = ref(true)
const REMOVE_BIG = ref(true)
const REMOVE_CHARACTERS = ref(true)

const onClickButtonClear = () => {
  CLEAN_KWS.value = DIRT_KWS.value
  if (REPLACE_ACCENTS) {
    CLEAN_KWS.value = CLEAN_KWS.value.split('Á').join('a')
    CLEAN_KWS.value = CLEAN_KWS.value.split('á').join('a')
    CLEAN_KWS.value = CLEAN_KWS.value.split('É').join('e')
    CLEAN_KWS.value = CLEAN_KWS.value.split('é').join('e')
    CLEAN_KWS.value = CLEAN_KWS.value.split('Í').join('i')
    CLEAN_KWS.value = CLEAN_KWS.value.split('í').join('i')
    CLEAN_KWS.value = CLEAN_KWS.value.split('Ó').join('o')
    CLEAN_KWS.value = CLEAN_KWS.value.split('ó').join('o')
    CLEAN_KWS.value = CLEAN_KWS.value.split('Ú').join('u')
    CLEAN_KWS.value = CLEAN_KWS.value.split('ú').join('u')
    CLEAN_KWS.value = CLEAN_KWS.value.split('Ñ').join('n')
    CLEAN_KWS.value = CLEAN_KWS.value.split('ñ').join('n')
  }

  if (REMOVE_CHARACTERS) {
    const regex = /[^a-zA-Z0-9\n ]/g;
    CLEAN_KWS.value = CLEAN_KWS.value.replace(regex, '');
  }

  if (REMOVE_BIG) {
    CLEAN_KWS.value = CLEAN_KWS.value.split('\n').filter(line => line.split(' ').length <= 10).join('\n');
  }

}

</script>
<template>
  <div class="grid grid-cols-3 gap-2">
    <div class="flex flex-col">
      <label for="dirt">Copy here your dirt keywords</label>
      <textarea id="dirt" rows="19" placeholder="Here your keywords" v-model="DIRT_KWS"
        class=" border-2 border-gray-300 dark:bg-slate-400 disabled:cursor-nSot-allowed disabled:opacity-50  p-4 rounded-xl w-full" />
    </div>
    <div class="flex flex-col gap-">
      <h2 class="text-2xl text-center">FILTERS</h2>
      <div class="flex gap-2">
        <input type="checkbox" id="dirt" v-model="REPLACE_ACCENTS" />
        <label for="dirt">Replaced accented letters (á, é, í..) for not accented letters (a, e, i...)</label>
      </div>
      <div class="flex gap-2">
        <input type="checkbox" id="dirt" v-model="REMOVE_BIG" />
        <label for="dirt">Remove long tail keywords with more of 10 words</label>
      </div>
      <div class="flex gap-2">
        <input type="checkbox" id="dirt" v-model="REMOVE_CHARACTERS" />
        <label for="dirt">Remove unwished characters like + - </label>
      </div>
      <div class="flex gap-2">
        <Button type="Button"
          class="py-2 px-4  bg-indigo-600 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          @click="onClickButtonClear()">Clear</Button>
      </div>
    </div>

    <div class="flex flex-col">
      <label for="clean">Your cleaned keywords</label>
      <textarea id="clean" rows="19" placeholder="Here your keywords" v-model="CLEAN_KWS" readonly
        class=" border-2 border-gray-300 dark:bg-slate-400 disabled:cursor-nSot-allowed disabled:opacity-50  p-4 rounded-xl w-full" />
    </div>
  </div>
</template>