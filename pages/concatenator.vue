<script setup lang="ts">

//TEXTAREA OF MAIN KEYWORDS
const INPUT_TEXTAREA_MAIN = ref('');


//INPUTS CLASSIFICATION A
const INPUT_TEXT_A = ref("A");
const INPUT_TEXTAREA_A = ref("");

//INPUTS CLASSIFICATION B
const INPUT_CHECKBOX_B = ref(false);
const INPUT_TEXT_B = ref("B");
const INPUT_TEXTAREA_B = ref("");

//INPUTS CLASSIFICATION C
const INPUT_CHECKBOX_C = ref(false);
const INPUT_TEXT_C = ref("C");
const INPUT_TEXTAREA_C = ref("");

//Input with status for inform the user what is processing
const STATUS = ref("");

// Texatrea with all combinations made (readonly and ready for copy the content)
const INPUT_TEXTAREA_RESULTS = ref("");

//2 KEYWORDS COMBINATION
const KA = ref(false)
const AK = ref(false)
const KB = ref(false)
const BK = ref(false)
const KC = ref(false)
const CK = ref(false)

//3 KEYWORDS COMBINATION
const KAB = ref(false)
const KBA = ref(false)
const AKB = ref(false)
const ABK = ref(false)
const BKA = ref(false)
const BAK = ref(false)
const KAC = ref(false)
const KCA = ref(false)
const AKC = ref(false)
const ACK = ref(false)
const CKA = ref(false)
const CAK = ref(false)
const KCB = ref(false)
const KBC = ref(false)
const CKB = ref(false)
const CBK = ref(false)
const BKC = ref(false)
const BCK = ref(false)


//4 KEYWORDS COMBINATION
const KABC = ref(false)
const KACB = ref(false)
const KBAC = ref(false)
const KBCA = ref(false)
const KCAB = ref(false)
const KCBA = ref(false)
const AKCB = ref(false)
const AKBC = ref(false)
const ABCK = ref(false)
const ABKC = ref(false)
const ACBK = ref(false)
const ACKB = ref(false)
const BKAC = ref(false)
const BKCA = ref(false)
const BAKC = ref(false)
const BACK = ref(false)
const BCKA = ref(false)
const BCAK = ref(false)
const CKBA = ref(false)
const CKAB = ref(false)
const CABK = ref(false)
const CAKB = ref(false)
const CBAK = ref(false)
const CBKA = ref(false)

//COMPUTED PROPERTIES
// INPUT_TEXTAREA_MAIN made array separated by backspace
const K_ARRAY = computed(() => {
  return INPUT_TEXTAREA_MAIN.value.split('\n');
})

// INPUT_TEXTAREA_A made array separated by backspace
const A_ARRAY = computed(() => {
  return INPUT_TEXTAREA_A.value.split('\n');
})

// INPUT_TEXTAREA_B made array separated by backspace
const B_ARRAY = computed(() => {
  return INPUT_TEXTAREA_B.value.split('\n');
})

// INPUT_TEXTAREA_C made array separated by backspace
const C_ARRAY = computed(() => {
  return INPUT_TEXTAREA_C.value.split('\n');
})


//METHODS

//Combine 2 word
const combineTwo = (a: string[], b: string[]) => {
  a.forEach((ea: string) => {
    b.forEach((eb: string) => {
      INPUT_TEXTAREA_RESULTS.value += ea + " " + eb + "\n";
    })
  })
}

//Combine 2 word
const combineThree = (a: string[], b: string[], c: string[]) => {
  a.forEach((ea: string) => {
    b.forEach((eb: string) => {
      c.forEach((ec: string) => {
        INPUT_TEXTAREA_RESULTS.value += ea + " " + eb + " " + ec + "\n";
      })
    })
  })
}

//Combine 3 word
const combineFour = (a: string[], b: string[], c: string[], d: string[]) => {
  a.forEach((ea: string) => {
    b.forEach((eb: string) => {
      c.forEach((ec: string) => {
        d.forEach((ed: string) => {
          INPUT_TEXTAREA_RESULTS.value += ea + " " + eb + " " + ec + " " + ed + "\n";

        })
      })
    })
  })
}

/**
 * Select all checkboxes
 */

const onClickButtonSelectAll = () => {
  //2 KEYWORDS COMBINATION
  KA.value = true
  AK.value = true
  KB.value = true
  BK.value = true
  KC.value = true
  CK.value = true

  if (INPUT_CHECKBOX_B) {
    //3 KEYWORDS COMBINATION
    KAB.value = true
    KBA.value = true
    AKB.value = true
    ABK.value = true
    BKA.value = true
    BAK.value = true
    KAC.value = true
    KCA.value = true
    AKC.value = true
    ACK.value = true
    CKA.value = true
    CAK.value = true
    KCB.value = true
    KBC.value = true
    CKB.value = true
    CBK.value = true
    BKC.value = true
    BCK.value = true

  } else {
    KAB.value = false
    KBA.value = false
    AKB.value = false
    ABK.value = false
    BKA.value = false
    BAK.value = false
    KAC.value = false
    KCA.value = false
    AKC.value = false
    ACK.value = false
    CKA.value = false
    CAK.value = false
    KCB.value = false
    KBC.value = false
    CKB.value = false
    CBK.value = false
    BKC.value = false
    BCK.value = false
  }

  if (INPUT_CHECKBOX_C) {
    //4 KEYWORDS COMBINATION
    KABC.value = true
    KACB.value = true
    KBAC.value = true
    KBCA.value = true
    KCAB.value = true
    KCBA.value = true
    AKCB.value = true
    AKBC.value = true
    ABCK.value = true
    ABKC.value = true
    ACBK.value = true
    ACKB.value = true
    BKAC.value = true
    BKCA.value = true
    BAKC.value = true
    BACK.value = true
    BCKA.value = true
    BCAK.value = true
    CKBA.value = true
    CKAB.value = true
    CABK.value = true
    CAKB.value = true
    CBAK.value = true
    CBKA.value = true
  } else {
    KABC.value = false
    KACB.value = false
    KBAC.value = false
    KBCA.value = false
    KCAB.value = false
    KCBA.value = false
    AKCB.value = false
    AKBC.value = false
    ABCK.value = false
    ABKC.value = false
    ACBK.value = false
    ACKB.value = false
    BKAC.value = false
    BKCA.value = false
    BAKC.value = false
    BACK.value = false
    BCKA.value = false
    BCAK.value = false
    CKBA.value = false
    CKAB.value = false
    CABK.value = false
    CAKB.value = false
    CBAK.value = false
    CBKA.value = false
  }
}

/**
 * Unselect all checkboxes
 */


const onClickButtonUnSelectAll = () => {
  //2 KEYWORDS COMBINATION
  KA.value = false
  AK.value = false
  KB.value = false
  BK.value = false
  KC.value = false
  CK.value = false

  //3 KEYWORDS COMBINATION
  KAB.value = false
  KBA.value = false
  AKB.value = false
  ABK.value = false
  BKA.value = false
  BAK.value = false
  KAC.value = false
  KCA.value = false
  AKC.value = false
  ACK.value = false
  CKA.value = false
  CAK.value = false
  KCB.value = false
  KBC.value = false
  CKB.value = false
  CBK.value = false
  BKC.value = false
  BCK.value = false

  //4 KEYWORDS COMBINATION
  KABC.value = false
  KACB.value = false
  KBAC.value = false
  KBCA.value = false
  KCAB.value = false
  KCBA.value = false
  AKCB.value = false
  AKBC.value = false
  ABCK.value = false
  ABKC.value = false
  ACBK.value = false
  ACKB.value = false
  BKAC.value = false
  BKCA.value = false
  BAKC.value = false
  BACK.value = false
  BCKA.value = false
  BCAK.value = false
  CKBA.value = false
  CKAB.value = false
  CABK.value = false
  CAKB.value = false
  CBAK.value = false
  CBKA.value = false

}

/**
 * Send the INPUT_TEXTAREA_RESULTS variable to clipboard
 */

const onClickButtonCopy = () => {
  navigator.clipboard.writeText(INPUT_TEXTAREA_RESULTS.value);
}

/**
 * Reset all fields as default
 */
const onClickButtonGenerate = () => {
  STATUS.value = 'Generating combinations of 2 keywords'

  if (KA.value) combineTwo(K_ARRAY.value, A_ARRAY.value);
  if (AK.value) combineTwo(A_ARRAY.value, K_ARRAY.value);
  if (KB.value) combineTwo(K_ARRAY.value, B_ARRAY.value);
  if (BK.value) combineTwo(B_ARRAY.value, K_ARRAY.value);
  if (KC.value) combineTwo(K_ARRAY.value, C_ARRAY.value);
  if (CK.value) combineTwo(C_ARRAY.value, K_ARRAY.value);

  if (INPUT_CHECKBOX_B || INPUT_CHECKBOX_C) {
    STATUS.value = 'Generating combinations of 3 keywords'
    if (KAB.value) combineThree(K_ARRAY.value, A_ARRAY.value, B_ARRAY.value)
    if (KBA.value) combineThree(K_ARRAY.value, B_ARRAY.value, A_ARRAY.value)
    if (AKB.value) combineThree(A_ARRAY.value, K_ARRAY.value, B_ARRAY.value)
    if (ABK.value) combineThree(A_ARRAY.value, B_ARRAY.value, K_ARRAY.value)
    if (BKA.value) combineThree(B_ARRAY.value, K_ARRAY.value, A_ARRAY.value)
    if (BAK.value) combineThree(B_ARRAY.value, A_ARRAY.value, K_ARRAY.value)
    if (KAC.value) combineThree(K_ARRAY.value, A_ARRAY.value, C_ARRAY.value)
    if (KCA.value) combineThree(K_ARRAY.value, C_ARRAY.value, A_ARRAY.value)
    if (AKC.value) combineThree(A_ARRAY.value, K_ARRAY.value, C_ARRAY.value)
    if (ACK.value) combineThree(A_ARRAY.value, C_ARRAY.value, K_ARRAY.value)
    if (CKA.value) combineThree(C_ARRAY.value, K_ARRAY.value, A_ARRAY.value)
    if (CAK.value) combineThree(C_ARRAY.value, A_ARRAY.value, K_ARRAY.value)
    if (KCB.value) combineThree(K_ARRAY.value, C_ARRAY.value, B_ARRAY.value)
    if (KBC.value) combineThree(K_ARRAY.value, B_ARRAY.value, C_ARRAY.value)
    if (CKB.value) combineThree(C_ARRAY.value, K_ARRAY.value, B_ARRAY.value)
    if (CBK.value) combineThree(C_ARRAY.value, B_ARRAY.value, K_ARRAY.value)
    if (BKC.value) combineThree(B_ARRAY.value, K_ARRAY.value, C_ARRAY.value)
    if (BCK.value) combineThree(B_ARRAY.value, C_ARRAY.value, K_ARRAY.value)

  }

  if (INPUT_CHECKBOX_B && INPUT_CHECKBOX_C) {
    STATUS.value = 'Generating combinations of 4 keywords'
    if (KABC.value) combineFour(K_ARRAY.value, A_ARRAY.value, B_ARRAY.value, C_ARRAY.value)
    if (KACB.value) combineFour(K_ARRAY.value, A_ARRAY.value, C_ARRAY.value, B_ARRAY.value)
    if (KBAC.value) combineFour(K_ARRAY.value, B_ARRAY.value, A_ARRAY.value, C_ARRAY.value)
    if (KBCA.value) combineFour(K_ARRAY.value, B_ARRAY.value, C_ARRAY.value, A_ARRAY.value)
    if (KCAB.value) combineFour(K_ARRAY.value, C_ARRAY.value, A_ARRAY.value, B_ARRAY.value)
    if (KCBA.value) combineFour(K_ARRAY.value, C_ARRAY.value, B_ARRAY.value, A_ARRAY.value)
    if (AKCB.value) combineFour(A_ARRAY.value, K_ARRAY.value, C_ARRAY.value, B_ARRAY.value)
    if (AKBC.value) combineFour(A_ARRAY.value, K_ARRAY.value, B_ARRAY.value, C_ARRAY.value)
    if (ABCK.value) combineFour(A_ARRAY.value, B_ARRAY.value, C_ARRAY.value, K_ARRAY.value)
    if (ABKC.value) combineFour(A_ARRAY.value, B_ARRAY.value, K_ARRAY.value, C_ARRAY.value)
    if (ACBK.value) combineFour(A_ARRAY.value, C_ARRAY.value, B_ARRAY.value, K_ARRAY.value)
    if (ACKB.value) combineFour(A_ARRAY.value, C_ARRAY.value, K_ARRAY.value, B_ARRAY.value)
    if (BKAC.value) combineFour(B_ARRAY.value, K_ARRAY.value, A_ARRAY.value, C_ARRAY.value)
    if (BKCA.value) combineFour(B_ARRAY.value, K_ARRAY.value, C_ARRAY.value, A_ARRAY.value)
    if (BAKC.value) combineFour(B_ARRAY.value, A_ARRAY.value, K_ARRAY.value, C_ARRAY.value)
    if (BACK.value) combineFour(B_ARRAY.value, A_ARRAY.value, C_ARRAY.value, K_ARRAY.value)
    if (BCKA.value) combineFour(B_ARRAY.value, C_ARRAY.value, K_ARRAY.value, A_ARRAY.value)
    if (BCAK.value) combineFour(B_ARRAY.value, C_ARRAY.value, A_ARRAY.value, K_ARRAY.value)
    if (CKBA.value) combineFour(C_ARRAY.value, K_ARRAY.value, B_ARRAY.value, A_ARRAY.value)
    if (CKAB.value) combineFour(C_ARRAY.value, K_ARRAY.value, A_ARRAY.value, B_ARRAY.value)
    if (CABK.value) combineFour(C_ARRAY.value, A_ARRAY.value, B_ARRAY.value, K_ARRAY.value)
    if (CAKB.value) combineFour(C_ARRAY.value, A_ARRAY.value, K_ARRAY.value, B_ARRAY.value)
    if (CBAK.value) combineFour(C_ARRAY.value, B_ARRAY.value, A_ARRAY.value, K_ARRAY.value)
    if (CBKA.value) combineFour(C_ARRAY.value, B_ARRAY.value, K_ARRAY.value, A_ARRAY.value)
  }
  STATUS.value = 'Finished, you can copy the result :D'
}

/**
 * Reset all fields as default
 */

const onClickButtonReset = () => {

  onClickButtonUnSelectAll()

  INPUT_CHECKBOX_B.value = false
  INPUT_CHECKBOX_C.value = false

  INPUT_TEXT_A.value = "A"
  INPUT_TEXT_B.value = "B"
  INPUT_TEXT_C.value = "C"
  INPUT_TEXTAREA_MAIN.value = ""
  INPUT_TEXTAREA_A.value = ""
  INPUT_TEXTAREA_B.value = ""
  INPUT_TEXTAREA_RESULTS.value = ""
  INPUT_TEXTAREA_C.value = ""
}

</script>
<template>
  <div class="flex flex-col w-full gap-4">

    <!-- KEYWORDS TEXTAREA ZONE-->


    <section class="grid grid-cols-4 w-full gap-4">

      <div class="flex flex-col text-center">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main keywords</label>
        <textarea rows="22"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Here your keywords" v-model="INPUT_TEXTAREA_MAIN"></textarea>
      </div>
      <div class="flex flex-col gap-2">
        <input type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="INPUT_TEXT_A" placeholder="Classification A" />
        <textarea rows="21"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Here your keywords" v-model="INPUT_TEXTAREA_A"></textarea>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <input type="checkbox" v-model="INPUT_CHECKBOX_B">
        <input type="text" :disabled="!INPUT_CHECKBOX_B"
          class="disabled:opacity-70 disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="INPUT_TEXT_B" placeholder="Classification B" />
        <textarea rows="20" :disabled="!INPUT_CHECKBOX_B"
          class="disabled:opacity-70 disabled:cursor-not-allowedblock p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Here your keywords" v-model="INPUT_TEXTAREA_B"></textarea>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <input type="checkbox" v-model="INPUT_CHECKBOX_C" :disabled="!INPUT_CHECKBOX_B"
          class="disabled:opacity-70 disabled:cursor-not-allowed">
        <input type="text" :disabled="!INPUT_CHECKBOX_C"
          class="disabled:opacity-70 disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="INPUT_TEXT_C" placeholder="Classification C" />
        <textarea rows="20" :disabled="!INPUT_CHECKBOX_C"
          class="disabled:opacity-70 disabled:cursor-not-allowedblock p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Here your keywords" v-model="INPUT_TEXTAREA_C"></textarea>
      </div>
    </section>


    <!-- END OF KEYWORDS TEXTAREA ZONE-->
    <!-- SELECT ALL BUTTONS -->
    <section class="flex justify-start gap-4 w-full">
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="onClickButtonSelectAll()">
        Select All</button>
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="onClickButtonUnSelectAll()">
        Unselect all</button>
    </section>
    <!-- END OF SELECT ALL BUTTONS -->

    <!-- COMBINATIONS ZONE-->
    <div class="flex flex-col gap-4">
      <h2 class="text-xl"> 2 KEYWORDS COMBINATIONS </h2>
      <div class="grid grid-cols-3 gap-8">
        <section class="flex flex-col gap-4">
          <h2 class="font-bold col-span-2  my-2 border-b-2">Keyword + {{ INPUT_TEXT_A }} combinations</h2>
          <!-- A + Keyword-->
          <FormGroupComponent :label="'Keyword + ' + INPUT_TEXT_A">
            <CheckboxComponent v-model="KA" :label="`Example: ${K_ARRAY[0]} ${A_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="INPUT_TEXT_A + ' + KEYWORD'">
            <CheckboxComponent v-model="AK" :label="`Example: ${A_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>
        </section>
        <section v-if="INPUT_CHECKBOX_B" class="flex flex-col gap-4">
          <h2 class="font-bold col-span-2  my-2 border-b-2">Keyword + {{ INPUT_TEXT_B }} combinations</h2>
          <!-- B + Keyword-->
          <FormGroupComponent :label="'Keyword + ' + INPUT_TEXT_B">
            <CheckboxComponent v-model="KB" :label="`Example: ${K_ARRAY[0]} ${B_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="INPUT_TEXT_B + ' + KEYWORD'">
            <CheckboxComponent v-model="BK" :label="`Example: ${B_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>
        </section>
        <section v-if="INPUT_CHECKBOX_C" class="flex flex-col gap-4">
          <h2 class="font-bold col-span-2  my-2 border-b-2">Keyword + {{ INPUT_TEXT_C }} combinations</h2>
          <!-- C + Keyword-->
          <FormGroupComponent :label="'Keyword + ' + INPUT_TEXT_C">
            <CheckboxComponent v-model="KC" :label="`Example: ${K_ARRAY[0]} ${C_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="INPUT_TEXT_C + ' + KEYWORD'">
            <CheckboxComponent v-model="CK" :label="`Example: ${C_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>
        </section>

      </div>

      <h2 class="mt-8 text-xl" v-if="INPUT_CHECKBOX_B"> 3 KEYWORDS COMBINATIONS </h2>
      <div class="grid grid-cols-3 gap-8" v-if="INPUT_CHECKBOX_B">
        <!-- Keyword + A + B-->
        <section class="flex flex-col gap-4">
          <h2 class="font-bold col-span-2  my-2 border-b-2">Keyword + {{ INPUT_TEXT_A }} +
            {{ INPUT_TEXT_B }} combinations</h2>
          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_A} + ${INPUT_TEXT_B}`">
            <CheckboxComponent v-model="KAB" :label="`Example: ${K_ARRAY[0]} ${A_ARRAY[0]} ${B_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_B} + ${INPUT_TEXT_A}`">
            <CheckboxComponent v-model="KBA" :label="`Example: ${K_ARRAY[0]} ${B_ARRAY[0]} ${A_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_A} + Keyword + ${INPUT_TEXT_B}`">
            <CheckboxComponent v-model="AKB" :label="`Example: ${A_ARRAY[0]} ${K_ARRAY[0]} ${B_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_A} + ${INPUT_TEXT_B} + KEYWORD`">
            <CheckboxComponent v-model="ABK" :label="`Example: ${A_ARRAY[0]} ${B_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_B} + Keyword + ${INPUT_TEXT_A}`">
            <CheckboxComponent v-model="BKA" :label="`Example: ${B_ARRAY[0]} ${K_ARRAY[0]} ${A_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_B} + ${INPUT_TEXT_A} + KEYWORD`">
            <CheckboxComponent v-model="BAK" :label="`Example: ${B_ARRAY[0]} ${A_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>

        </section>
        <section v-if="INPUT_CHECKBOX_C" class="flex flex-col gap-4">
          <!-- Keyword + A + C-->
          <h2 class="font-bold col-span-2  my-2 border-b-2">Keyword + {{ INPUT_TEXT_A }} +
            {{ INPUT_TEXT_C }} combinations</h2>
          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_A} + ${INPUT_TEXT_C}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="KAC" :label="`Example: ${K_ARRAY[0]} ${A_ARRAY[0]} ${C_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_C} + ${INPUT_TEXT_A}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="KCA" :label="`Example: ${K_ARRAY[0]} ${C_ARRAY[0]} ${A_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_A} + Keyword + ${INPUT_TEXT_C}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="AKC" :label="`Example: ${A_ARRAY[0]} ${K_ARRAY[0]} ${C_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_A} + ${INPUT_TEXT_C} + KEYWORD`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="ACK" :label="`Example: ${A_ARRAY[0]} ${C_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_C} + Keyword + ${INPUT_TEXT_A}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="CKA" :label="`Example: ${C_ARRAY[0]} ${K_ARRAY[0]} ${A_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_C} + ${INPUT_TEXT_A} + KEYWORD`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="CAK" :label="`Example: ${C_ARRAY[0]} ${A_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>

        </section>
        <section v-if="INPUT_CHECKBOX_C" class="flex flex-col gap-4">
          <h2 class="font-bold col-span-2 my-2 border-b-2">Keyword + {{ INPUT_TEXT_B }} +
            {{ INPUT_TEXT_C }} combinations</h2>
          <!-- Keyword + B + C-->
          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_B} + ${INPUT_TEXT_C}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="KBC" :label="`Example: ${K_ARRAY[0]} ${B_ARRAY[0]} ${C_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_C} + ${INPUT_TEXT_B}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="KCB" :label="`Example: ${K_ARRAY[0]} ${C_ARRAY[0]} ${B_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_B} + Keyword + ${INPUT_TEXT_C}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="BKC" :label="`Example: ${B_ARRAY[0]} ${K_ARRAY[0]} ${C_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_B} + ${INPUT_TEXT_C} + KEYWORD`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="BCK" :label="`Example: ${B_ARRAY[0]} ${C_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_C} + Keyword + ${INPUT_TEXT_B}`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="CKB" :label="`Example: ${C_ARRAY[0]} ${K_ARRAY[0]} ${B_ARRAY[0]}`" />
          </FormGroupComponent>
          <FormGroupComponent :label="`${INPUT_TEXT_C} + ${INPUT_TEXT_B} + KEYWORD`" v-if="INPUT_CHECKBOX_C">
            <CheckboxComponent v-model="CBK" :label="`Example: ${C_ARRAY[0]} ${B_ARRAY[0]} ${K_ARRAY[0]}`" />
          </FormGroupComponent>

        </section>



      </div>

      <h2 class="border-b-2 mt-4 text-xl " v-if="INPUT_CHECKBOX_C"> 4 KEYWORDS COMBINATIONS</h2>
      <div class="grid grid-cols-4 gap-8" v-if="INPUT_CHECKBOX_C">
        <!-- Keyword + A + B-->
        <section class="flex flex-col gap-4">

          <!--K-->
          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_A} + ${INPUT_TEXT_B} + ${INPUT_TEXT_C}`">
            <CheckboxComponent :label="`${K_ARRAY[0]} ${A_ARRAY[0]} ${B_ARRAY[0]} ${C_ARRAY[0]}`" v-model="KABC" />
          </FormGroupComponent>

          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_A} + ${INPUT_TEXT_C} + ${INPUT_TEXT_B}`">
            <CheckboxComponent :label="`${K_ARRAY[0]} ${A_ARRAY[0]} ${C_ARRAY[0]} ${B_ARRAY[0]}`" v-model="KACB" />
          </FormGroupComponent>

          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_B} + ${INPUT_TEXT_A} + ${INPUT_TEXT_C}`">
            <CheckboxComponent :label="`${K_ARRAY[0]} ${B_ARRAY[0]} ${A_ARRAY[0]} ${C_ARRAY[0]}`" v-model="KBAC" />
          </FormGroupComponent>

          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_B} + ${INPUT_TEXT_C} + ${INPUT_TEXT_A}`">
            <CheckboxComponent :label="`${K_ARRAY[0]} ${B_ARRAY[0]} ${C_ARRAY[0]} ${A_ARRAY[0]}`" v-model="KBCA" />
          </FormGroupComponent>

          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_C} + ${INPUT_TEXT_A} + ${INPUT_TEXT_B}`">
            <CheckboxComponent :label="`${K_ARRAY[0]} ${C_ARRAY[0]} ${A_ARRAY[0]} ${B_ARRAY[0]}`" v-model="KCAB" />
          </FormGroupComponent>

          <FormGroupComponent :label="`Keyword + ${INPUT_TEXT_C} + ${INPUT_TEXT_B} + ${INPUT_TEXT_A}`">
            <CheckboxComponent :label="`${K_ARRAY[0]} ${C_ARRAY[0]} ${B_ARRAY[0]} ${A_ARRAY[0]}`" v-model="KCBA" />
          </FormGroupComponent>


        </section>

        <section class="flex flex-col gap-4">

          <!--A-->

          <FormGroupComponent :label="`${INPUT_TEXT_A} + Keyword + ${INPUT_TEXT_C} + ${INPUT_TEXT_B}`">
            <CheckboxComponent :label="`${A_ARRAY[0]} ${K_ARRAY[0]} ${C_ARRAY[0]} ${B_ARRAY[0]}`" v-model="AKCB" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_A} + Keyword + ${INPUT_TEXT_B} + ${INPUT_TEXT_C}`">
            <CheckboxComponent :label="`${A_ARRAY[0]} ${K_ARRAY[0]} ${B_ARRAY[0]} ${C_ARRAY[0]}`" v-model="AKBC" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_A} + ${INPUT_TEXT_B} + ${INPUT_TEXT_C} + KEYWORD`">
            <CheckboxComponent :label="`${A_ARRAY[0]} ${B_ARRAY[0]} ${C_ARRAY[0]} ${K_ARRAY[0]}`" v-model="ABCK" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_A} + ${INPUT_TEXT_B} + Keyword + ${INPUT_TEXT_C}`">
            <CheckboxComponent :label="`${A_ARRAY[0]} ${B_ARRAY[0]} ${K_ARRAY[0]} ${C_ARRAY[0]}`" v-model="ABKC" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_A} + ${INPUT_TEXT_C} + ${INPUT_TEXT_B} + KEYWORD`">
            <CheckboxComponent :label="`${A_ARRAY[0]} ${C_ARRAY[0]} ${B_ARRAY[0]} ${K_ARRAY[0]}`" v-model="ACBK" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_A} + ${INPUT_TEXT_C} + Keyword + ${INPUT_TEXT_B}`">
            <CheckboxComponent :label="`${A_ARRAY[0]} ${C_ARRAY[0]} ${K_ARRAY[0]} ${B_ARRAY[0]}`" v-model="ACKB" />
          </FormGroupComponent>
        </section>
        <section class="flex flex-col gap-4">
          <!--B-->


          <FormGroupComponent :label="`${INPUT_TEXT_B} + Keyword + ${INPUT_TEXT_A} + ${INPUT_TEXT_C}`">
            <CheckboxComponent :label="`${B_ARRAY[0]} ${K_ARRAY[0]} ${A_ARRAY[0]} ${C_ARRAY[0]}`" v-model="BKAC" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_B} + Keyword + ${INPUT_TEXT_C} + ${INPUT_TEXT_A}`">
            <CheckboxComponent :label="`${B_ARRAY[0]} ${K_ARRAY[0]} ${C_ARRAY[0]} ${A_ARRAY[0]}`" v-model="BKCA" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_B} + ${INPUT_TEXT_A} + Keyword + ${INPUT_TEXT_C}`">
            <CheckboxComponent :label="`${B_ARRAY[0]} ${A_ARRAY[0]} ${K_ARRAY[0]} ${C_ARRAY[0]}`" v-model="BAKC" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_B} + ${INPUT_TEXT_A} + ${INPUT_TEXT_C} + KEYWORD`">
            <CheckboxComponent :label="`${B_ARRAY[0]} ${A_ARRAY[0]} ${C_ARRAY[0]} ${K_ARRAY[0]}`" v-model="BACK" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_B} + ${INPUT_TEXT_C} + Keyword + ${INPUT_TEXT_A}`">
            <CheckboxComponent :label="`${B_ARRAY[0]} ${C_ARRAY[0]} ${K_ARRAY[0]} ${A_ARRAY[0]}`" v-model="BCKA" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_B} + ${INPUT_TEXT_C} + ${INPUT_TEXT_A} + KEYWORD`">
            <CheckboxComponent :label="`${B_ARRAY[0]} ${C_ARRAY[0]} ${A_ARRAY[0]} ${K_ARRAY[0]}`" v-model="BCAK" />
          </FormGroupComponent>

        </section>
        <section class="flex flex-col gap-4">
          <!--C-->


          <FormGroupComponent :label="`${INPUT_TEXT_C} + Keyword + ${INPUT_TEXT_B} + ${INPUT_TEXT_A}`">
            <CheckboxComponent :label="`${C_ARRAY[0]} ${K_ARRAY[0]} ${B_ARRAY[0]} ${A_ARRAY[0]}`" v-model="CKBA" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_C} + Keyword + ${INPUT_TEXT_A} + ${INPUT_TEXT_B}`">
            <CheckboxComponent :label="`${C_ARRAY[0]} ${K_ARRAY[0]} ${A_ARRAY[0]} ${B_ARRAY[0]}`" v-model="CKAB" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_C} + ${INPUT_TEXT_A} + ${INPUT_TEXT_B} + KEYWORD`">
            <CheckboxComponent :label="`${C_ARRAY[0]} ${A_ARRAY[0]} ${B_ARRAY[0]} ${K_ARRAY[0]}`" v-model="CABK" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_C} + ${INPUT_TEXT_A} + Keyword + ${INPUT_TEXT_B}`">
            <CheckboxComponent :label="`${C_ARRAY[0]} ${A_ARRAY[0]} ${K_ARRAY[0]} ${B_ARRAY[0]}`" v-model="CAKB" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_C} + ${INPUT_TEXT_B} + ${INPUT_TEXT_A} + KEYWORD`">
            <CheckboxComponent :label="`${C_ARRAY[0]} ${B_ARRAY[0]} ${A_ARRAY[0]} ${K_ARRAY[0]}`" v-model="CBAK" />
          </FormGroupComponent>

          <FormGroupComponent :label="`${INPUT_TEXT_C} + ${INPUT_TEXT_B} + Keyword + ${INPUT_TEXT_A}`">
            <CheckboxComponent :label="`${C_ARRAY[0]} ${B_ARRAY[0]} ${K_ARRAY[0]} ${A_ARRAY[0]}`" v-model="CBKA" />
          </FormGroupComponent>
        </section>
      </div>

    </div>


    <!-- END OF COMBINATIONS ZONE-->
    <!-- RESULT ZONE-->
    <section class="flex justify-between">
      <span>
        Status: {{ STATUS }}
      </span>
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32"
        @click="onClickButtonCopy()">Copy result</button>
    </section>
    <section class="flex">
      <textarea rows="20" v-model="INPUT_TEXTAREA_RESULTS" label="Final result" readonly
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

    </section>
    <!-- END OF RESULT ZONE-->
    <!-- RESET ZONE-->
    <section class="flex justify-between mb-4">
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="onClickButtonReset()">Reset</button>
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="onClickButtonGenerate()">Generate</button>
    </section>
    <!-- END OF RESET ZONE-->
  </div>
</template>