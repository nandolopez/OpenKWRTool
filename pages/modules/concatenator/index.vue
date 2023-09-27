<script setup lang="ts">
const CLASSIFICATION_A_TITLE = ref("A");
const CLASSIFICATION_B_TITLE = ref("B");
const CLASSIFICATION_C_TITLE = ref("C");

const MAIN_KEYWORDS = ref('');
const CLASSIFICATION_A = ref("");
const CLASSIFICATION_B = ref("");
const CLASSIFICATION_C = ref("");

const CLASSIFICATION_B_CHECKBOX = ref(false);
const CLASSIFICATION_C_CHECKBOX = ref(false);

const STATUS = ref("");

const K_ARRAY = computed(() => {
  return MAIN_KEYWORDS.value.split('\n');
})
const A_ARRAY = computed(() => {
  return CLASSIFICATION_A.value.split('\n');
})
const B_ARRAY = computed(() => {
  return CLASSIFICATION_B.value.split('\n');
})
const C_ARRAY = computed(() => {
  return CLASSIFICATION_C.value.split('\n');
})

const FINAL_RESULT = ref("");

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

//Combine 2 word
const combineTwo = (a: string[], b: string[]) => {
  a.forEach((ea: string) => {
    b.forEach((eb: string) => {
      FINAL_RESULT.value += ea + " " + eb + "\n";
    })
  })
}
//Combine 2 word
const combineThree = (a: string[], b: string[], c: string[]) => {
  a.forEach((ea: string) => {
    b.forEach((eb: string) => {
      c.forEach((ec: string) => {
        FINAL_RESULT.value += ea + " " + eb + " " + ec + "\n";
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
          FINAL_RESULT.value += ea + " " + eb + " " + ec + " " + ed + "\n";

        })
      })
    })
  })
}

const onClilckButtonSelectAll = () => {
  //2 KEYWORDS COMBINATION
  KA.value = true
  AK.value = true
  KB.value = true
  BK.value = true
  KC.value = true
  CK.value = true

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
}
const onClilckButtonUnSelectAll = () => {
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

const onClickButtonCopy = () => {
  navigator.clipboard.writeText(FINAL_RESULT.value);
}

const onClickButtonGenerate = () => {
  STATUS.value = 'Generating combinations of 2 keywords'

  if (KA.value) combineTwo(K_ARRAY.value, A_ARRAY.value);
  if (AK.value) combineTwo(A_ARRAY.value, K_ARRAY.value);
  if (KB.value) combineTwo(K_ARRAY.value, B_ARRAY.value);
  if (BK.value) combineTwo(B_ARRAY.value, K_ARRAY.value);
  if (KC.value) combineTwo(K_ARRAY.value, C_ARRAY.value);
  if (CK.value) combineTwo(C_ARRAY.value, K_ARRAY.value);

  if (CLASSIFICATION_B_CHECKBOX || CLASSIFICATION_C_CHECKBOX) {
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
  }

  if (CLASSIFICATION_B_CHECKBOX && CLASSIFICATION_C_CHECKBOX) {
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
  STATUS.value = 'Finished :D'
}

const onClickButtonReset = () => {

  onClilckButtonUnSelectAll()

  CLASSIFICATION_B_CHECKBOX.value = false
  CLASSIFICATION_C_CHECKBOX.value = false

  CLASSIFICATION_A_TITLE.value = "A"
  CLASSIFICATION_B_TITLE.value = "B"
  CLASSIFICATION_C_TITLE.value = "C"
  MAIN_KEYWORDS.value = ""
  CLASSIFICATION_A.value = ""
  CLASSIFICATION_B.value = ""
  FINAL_RESULT.value = ""
  CLASSIFICATION_C.value = ""
}

</script>
<template>
  <div class="flex flex-col w-full gap-4">
    <!-- KEYWORDS TEXTAREA ZONE-->
    <section class="grid grid-cols-4 w-full gap-4">
      <article class="flex flex-col gap-4 justify-between items-center">
        <h2 class="text-xl">MAIN KEYWORDS</h2>
        <textarea rows="20" placeholder="Here your keywords" v-model="MAIN_KEYWORDS"
          class=" border-2 border-gray-300 dark:bg-slate-400 p-4 rounded-xl w-full" />
      </article>

      <article class="flex flex-col gap-4 justify-between items-center">
        <input type="text" class="border-2 border-gray-300 dark:bg-slate-400 p-2 rounded-xl text-center" v-model="CLASSIFICATION_A_TITLE"
          placeholder="Classification A" />
        <textarea rows="20" placeholder="Here your keywords" v-model="CLASSIFICATION_A"
          class=" border-2 border-gray-300 dark:bg-slate-400 p-4 rounded-xl w-full" />
      </article>

      <article class="flex flex-col gap-4 justify-between items-center">
        <input type="text" class="border-2 border-gray-300 dark:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50 p-2 rounded-xl text-center" v-model="CLASSIFICATION_B_TITLE"
          placeholder="Classification B" :disabled="!CLASSIFICATION_B_CHECKBOX" />
        <input type="checkbox" v-model="CLASSIFICATION_B_CHECKBOX" />
        <textarea rows="19" placeholder="Here your keywords" v-model="CLASSIFICATION_B"
          class=" border-2 border-gray-300 dark:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50  p-4 rounded-xl w-full" :disabled="!CLASSIFICATION_B_CHECKBOX" />
      </article>

      <article class="flex flex-col gap-4 justify-between items-center">
        <input type="text" class="border-2 border-gray-300 dark:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50 p-2 rounded-xl text-center" v-model="CLASSIFICATION_C_TITLE"
          placeholder="Classification C" :disabled="!CLASSIFICATION_C_CHECKBOX" />
        <input type="checkbox" v-model="CLASSIFICATION_C_CHECKBOX" />
        <textarea rows="19" placeholder="Here your keywords" v-model="CLASSIFICATION_C"
          class=" border-2 border-gray-300 dark:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50 p-4 rounded-xl w-full" :disabled="!CLASSIFICATION_C_CHECKBOX" />
      </article>

    </section>
    <!-- END OF KEYWORDS TEXTAREA ZONE-->
    <!-- SELECT ALL BUTTONS -->
    <section class="flex justify-start gap-4 w-full">
      <Button type="Button"
        class="py-2 px-4  bg-indigo-600 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
        @click="onClilckButtonSelectAll()">Select All</Button>
      <Button type="Button"
        class="py-2 px-4  bg-indigo-600 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
        @click="onClilckButtonUnSelectAll()">Unselect all</Button>
    </section>
    <!-- END OF SELECT ALL BUTTONS -->
    <!-- COMBINATIONS ZONE-->
    <div class="grid grid-cols-2">
      <h2 class="text-2xl text-center mb-4">2 KEYWORDS:</h2>
      <h2 class="text-2xl text-center mb-4">3 KEYWORDS:</h2>
      <article class="flex w-full justify-center gap-8">
        <div>
          <h3 class="text-lg mb-2 font-bold"> KEYWORD + {{ CLASSIFICATION_A_TITLE }}</h3>
          <label for="KA">
            <input type="checkbox" v-model="KA" id="KA" />
            KEYWORD + {{ CLASSIFICATION_A_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ A_ARRAY[0] }}</span>
          </p>

          <label for="AK">
            <input type="checkbox" v-model="AK" id="AK" />
            {{ CLASSIFICATION_A_TITLE }} + KEYWORD
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ K_ARRAY[0] }}</span>
          </p>
        </div>
        <div v-if="CLASSIFICATION_B_CHECKBOX">
          <h3 class="text-lg mb-2 font-bold"> KEYWORD + {{ CLASSIFICATION_B_TITLE }}</h3>
          <label for="KB">
            <input type="checkbox" v-model="KB" id="KB" />
            KEYWORD + {{ CLASSIFICATION_B_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ B_ARRAY[0] }}</span>
          </p>

          <label for="BK">
            <input type="checkbox" v-model="BK" id="BK" />
            {{ CLASSIFICATION_B_TITLE }} + KEYWORD
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ K_ARRAY[0] }}</span>
          </p>
        </div>

        <div v-if="CLASSIFICATION_C_CHECKBOX">
          <h3 class="text-lg mb-2 font-bold"> KEYWORD + {{ CLASSIFICATION_C_TITLE }}</h3>
          <label for="KC" v-if="CLASSIFICATION_C_CHECKBOX">
            <input type="checkbox" v-model="KC" id="KC" />
            KEYWORD + {{ CLASSIFICATION_C_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ C_ARRAY[0] }}</span>
          </p>

          <label for="CK" v-if="CLASSIFICATION_C_CHECKBOX">
            <input type="checkbox" v-model="CK" id="CK" />
            {{ CLASSIFICATION_C_TITLE }} + KEYWORD
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ K_ARRAY[0] }}</span>
          </p>
        </div>
      </article>



      <article class="flex justify-center gap-8 w-full" v-if="CLASSIFICATION_B_CHECKBOX || CLASSIFICATION_C_CHECKBOX">
        <div v-if="CLASSIFICATION_B_CHECKBOX">

          <h3 class="text-lg mb-2 font-bold"> KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }}
          </h3>
          <label for="KAB">
            <input type="checkbox" v-model="KAB" id="KAB" />
            KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ A_ARRAY[0] }} {{
            B_ARRAY[0] }}</span></p>

          <label for="KBA">
            <input type="checkbox" v-model="KBA" id="KBA" />
            KEYWORD + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ B_ARRAY[0] }} {{
            A_ARRAY[0] }}</span></p>

          <label for="ABK">
            <input type="checkbox" v-model="ABK" id="ABK" />
            {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + KEYWORD
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ B_ARRAY[0] }} {{
            K_ARRAY[0] }} </span></p>

          <label for="AKB">
            <input type="checkbox" v-model="AKB" id="AKB" />
            {{ CLASSIFICATION_A_TITLE }} + KEYWORD + {{ CLASSIFICATION_B_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ K_ARRAY[0] }} {{
            B_ARRAY[0] }} </span></p>

          <label for="BKA">
            <input type="checkbox" v-model="BKA" id="BKA" />
            {{ CLASSIFICATION_B_TITLE }} + KEYWORD + {{ CLASSIFICATION_A_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ B_ARRAY[0] }} {{
            K_ARRAY[0] }}</span></p>

          <label for="BAK">
            <input type="checkbox" v-model="BAK" id="BAK" />
            {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + KEYWORD
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ A_ARRAY[0] }} {{
            K_ARRAY[0] }}</span></p>
        </div>

        <div v-if="CLASSIFICATION_C_CHECKBOX">

          <h3 class="text-lg mb-2 font-bold"> KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }}
          </h3>
          <label for="KAC">
            <input type="checkbox" v-model="KAC" id="KAC" />
            KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ A_ARRAY[0] }} {{
            C_ARRAY[0] }}</span></p>

          <label for="KCA">
            <input type="checkbox" v-model="KCA" id="KCA" />
            KEYWORD + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_A_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ C_ARRAY[0] }} {{
            A_ARRAY[0] }}</span></p>

          <label for="ACK">
            <input type="checkbox" v-model="ACK" id="ACK" />
            {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + KEYWORD
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ C_ARRAY[0] }} {{
            K_ARRAY[0] }} </span></p>

          <label for="AKC">
            <input type="checkbox" v-model="AKC" id="AKC" />
            {{ CLASSIFICATION_A_TITLE }} + KEYWORD + {{ CLASSIFICATION_C_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ K_ARRAY[0] }} {{
            C_ARRAY[0] }} </span></p>

          <label for="CKA">
            <input type="checkbox" v-model="CKA" id="CKA" />
            {{ CLASSIFICATION_C_TITLE }} + KEYWORD + {{ CLASSIFICATION_A_TITLE }}
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ C_ARRAY[0] }} {{
            K_ARRAY[0] }}</span></p>

          <label for="CAK">
            <input type="checkbox" v-model="CAK" id="CAK" />
            {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + KEYWORD
          </label>
          <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ A_ARRAY[0] }} {{
            K_ARRAY[0] }}</span></p>
        </div>

      </article>
    </div>
    <section class="flex flex-col w-full gap-4">


      <article class="flex flex-wrap justify-between gap-8 w-full"
      v-if="CLASSIFICATION_B_CHECKBOX && CLASSIFICATION_C_CHECKBOX">
      <h2 class="text-2xl text-center mb-4 w-full">4 KEYWORDS:</h2>
        <!--K-->
        <div class="flex-col">

          <label for="KABC">
            <input type="checkbox" v-model="KABC" id="KABC" />
            KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_C_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ A_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ C_ARRAY[0] }}</span></p>
          </label>

          <label for="KACB">
            <input type="checkbox" v-model="KACB" id="KACB" />
            KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_B_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ A_ARRAY[0] }} {{
              C_ARRAY[0] }} {{ B_ARRAY[0] }}</span></p>
          </label>

          <label for="KBAC">
            <input type="checkbox" v-model="KBAC" id="KBAC" />
            KEYWORD + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ B_ARRAY[0] }} {{
              A_ARRAY[0] }} {{ C_ARRAY[0] }}</span></p>
          </label>

          <label for="KBCA">
            <input type="checkbox" v-model="KBCA" id="KBCA" />
            KEYWORD + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_A_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ B_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ A_ARRAY[0] }}</span></p>
          </label>

          <label for="KCAB">
            <input type="checkbox" v-model="KCAB" id="KCAB" />
            KEYWORD + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ C_ARRAY[0] }} {{
              A_ARRAY[0] }} {{ B_ARRAY[0] }}</span></p>
          </label>

          <label for="KCBA">
            <input type="checkbox" v-model="KCBA" id="KCBA" />
            KEYWORD + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ K_ARRAY[0] }} {{ C_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ A_ARRAY[0] }}</span></p>
          </label>
        </div>

        <!--A-->
        <div class="flex-col">
          <label for="AKCB">
            <input type="checkbox" v-model="AKCB" id="AKCB" />
            {{ CLASSIFICATION_A_TITLE }} + KEYWORD + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_B_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ K_ARRAY[0] }} {{
              C_ARRAY[0] }} {{ B_ARRAY[0] }}</span></p>
          </label>

          <label for="AKBC">
            <input type="checkbox" v-model="AKBC" id="AKBC" />
            {{ CLASSIFICATION_A_TITLE }} + KEYWORD + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_C_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ K_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ C_ARRAY[0] }}</span></p>
          </label>

          <label for="AKBC">
            <input type="checkbox" v-model="AKBC" id="AKBC" />
            {{ CLASSIFICATION_A_TITLE }} + KEYWORD + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_C_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ K_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ C_ARRAY[0] }}</span></p>
          </label>

          <label for="ABCK">
            <input type="checkbox" v-model="ABCK" id="ABCK" />
            {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + KEYWORD
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ B_ARRAY[0] }} {{
              C_ARRAY[0] }} {{ K_ARRAY[0] }}</span></p>
          </label>

          <label for="ABKC">
            <input type="checkbox" v-model="ABKC" id="ABKC" />
            {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + KEYWORD + {{ CLASSIFICATION_C_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ B_ARRAY[0] }} {{
              K_ARRAY[0] }} {{ C_ARRAY[0] }}</span></p>
          </label>

          <label for="ACBK">
            <input type="checkbox" v-model="ACBK" id="ACBK" />
            {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + KEYWORD
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ C_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ K_ARRAY[0] }}</span></p>
          </label>

          <label for="ACKB">
            <input type="checkbox" v-model="ACKB" id="ACKB" />
            {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + KEYWORD + {{ CLASSIFICATION_B_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ A_ARRAY[0] }} {{ C_ARRAY[0] }} {{
              K_ARRAY[0] }} {{ B_ARRAY[0] }}</span></p>
          </label>
        </div>


        <!--B-->
        <div class="flex-col">
          <label for="BKAC">
            <input type="checkbox" v-model="BKAC" id="BKAC" />
            {{ CLASSIFICATION_B_TITLE }} + KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ K_ARRAY[0] }} {{
              A_ARRAY[0] }} {{ C_ARRAY[0] }}</span></p>
          </label>

          <label for="BKCA">
            <input type="checkbox" v-model="BKCA" id="BKCA" />
            {{ CLASSIFICATION_B_TITLE }} + KEYWORD + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_A_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ K_ARRAY[0] }} {{
              C_ARRAY[0] }} {{ A_ARRAY[0] }}</span></p>
          </label>

          <label for="BAKC">
            <input type="checkbox" v-model="BAKC" id="BAKC" />
            {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + KEYWORD + {{ CLASSIFICATION_C_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ A_ARRAY[0] }} {{
              K_ARRAY[0] }} {{ C_ARRAY[0] }}</span></p>
          </label>

          <label for="BACK">
            <input type="checkbox" v-model="BACK" id="BACK" />
            {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + KEYWORD
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ A_ARRAY[0] }} {{
              C_ARRAY[0] }} {{ K_ARRAY[0] }}</span></p>
          </label>

          <label for="BCKA">
            <input type="checkbox" v-model="BCKA" id="BCKA" />
            {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + KEYWORD + {{ CLASSIFICATION_A_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ C_ARRAY[0] }} {{
              K_ARRAY[0] }} {{ A_ARRAY[0] }}</span></p>
          </label>

          <label for="BCAK">
            <input type="checkbox" v-model="BCAK" id="BCAK" />
            {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + KEYWORD
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ B_ARRAY[0] }} {{ C_ARRAY[0] }} {{
              A_ARRAY[0] }} {{ K_ARRAY[0] }}</span></p>
          </label>
        </div>

        <!--C-->
        <div class="flex-col">
          <label for="CKBA">
            <input type="checkbox" v-model="CKBA" id="CKBA" />
            {{ CLASSIFICATION_C_TITLE }} + KEYWORD + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ K_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ A_ARRAY[0] }}</span></p>
          </label>

          <label for="CKAB">
            <input type="checkbox" v-model="CKAB" id="CKAB" />
            {{ CLASSIFICATION_C_TITLE }} + KEYWORD + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ K_ARRAY[0] }} {{
              A_ARRAY[0] }} {{ B_ARRAY[0] }}</span></p>
          </label>

          <label for="CABK">
            <input type="checkbox" v-model="CABK" id="CABK" />
            {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + KEYWORD
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ A_ARRAY[0] }} {{
              B_ARRAY[0] }} {{ K_ARRAY[0] }}</span></p>
          </label>

          <label for="CAKB">
            <input type="checkbox" v-model="CAKB" id="CAKB" />
            {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + KEYWORD + {{ CLASSIFICATION_B_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ A_ARRAY[0] }} {{
              K_ARRAY[0] }} {{ B_ARRAY[0] }}</span></p>
          </label>

          <label for="CBAK">
            <input type="checkbox" v-model="CBAK" id="CBAK" />
            {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + {{ CLASSIFICATION_A_TITLE }} + KEYWORD
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ B_ARRAY[0] }} {{
              A_ARRAY[0] }} {{ K_ARRAY[0] }}</span></p>
          </label>

          <label for="CBKA">
            <input type="checkbox" v-model="CBKA" id="CBKA" />
            {{ CLASSIFICATION_C_TITLE }} + {{ CLASSIFICATION_B_TITLE }} + KEYWORD + {{ CLASSIFICATION_A_TITLE }}
            <p class="ml-10 mb-4">Example: <span class="text-blue-500 font-bold"> {{ C_ARRAY[0] }} {{ B_ARRAY[0] }} {{
              K_ARRAY[0] }} {{ A_ARRAY[0] }}</span></p>
          </label>
        </div>
      </article>

    </section>
    <!-- END OF COMBINATIONS ZONE-->
    <!-- RESULT ZONE-->
    <section class="flex flex-col">
      <div class="flex justify-between w-full">
        <span>
          Status: {{ STATUS }}

        </span>
        <button
          class="py-2 px-4  bg-indigo-600 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          type="button" @click="onClickButtonCopy()">Copy result</button>

      </div>
      <textarea rows="20" v-model="FINAL_RESULT" label="Final result"
        class=" border-2 border-gray-300 dark:bg-slate-400 p-4 rounded-xl w-full my-4" />
    </section>
    <!-- END OF RESULT ZONE-->
    <!-- RESET ZONE-->
    <section>
      <div class="flex justify-between mb-4">
        <button
          class="py-2 px-4  bg-indigo-600 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          type="button" @click="onClickButtonReset()">Reset</button>
        <button
          class="py-2 px-4  bg-indigo-600 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          type="button" @click="onClickButtonGenerate()">Generate</button>
      </div>
    </section>
    <!-- END OF RESET ZONE-->
  </div>
</template>