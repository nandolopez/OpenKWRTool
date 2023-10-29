<script setup lang="ts">
import { IURL } from '~/interfaces/IURL';

const CURRENT_SECTION = ref(0)
const LOADER = ref(false)

const SECTIONS = ref<IURL[]>([
    {
        id:0,
        path: '/project',
        type: 'Save / load project'
    },
    {
        id:1,
        path: '/project/qualifier',
        type: 'Keyword qualifier'
    },
    {
        id:2,
        path: '/project/structure',
        type: 'Structure builder'
    },
])

const ROUTE = useRoute()

const DISABLE_TAB = computed(() => localStorage.keywords !== undefined)
const onClickTab = (input: string) => {
    LOADER.value = true
    navigateTo(input);
}


/**
 * On mount component...
 * set the Tab as specific pressed URL
 */

onMounted(() => CURRENT_SECTION.value = SECTIONS.value.findIndex((e: IURL) => e.path === ROUTE.path))

</script>


<template>
    <NuxtLayout name="default">
        <va-card class="mb-4" v-if="DISABLE_TAB">
            <va-card-content>
                <va-tabs v-model="CURRENT_SECTION" center>
                    <template #tabs>
                        <va-tab v-for="item in SECTIONS" @click="onClickTab(item.path)">
                            {{ item.type }}
                        </va-tab>
                    </template>
                </va-tabs>
            </va-card-content>
        </va-card>
        <va-inner-loading loading class="mb-4" v-if="LOADER">
            <va-card color="info" >
                <va-card-content>Loading keywords</va-card-content>
            </va-card>
        </va-inner-loading>


        <div class="flex flex-col gap-4">
            <slot />

        </div>
    </NuxtLayout>
</template>

