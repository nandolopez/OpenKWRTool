<script setup lang="ts">


const CURRENT_SECTION = ref(0)

const SECTIONS = ref<string[]>(["Save / load project", "Keyword qualifier", "Structure builder"])
const URLS = ['/project', '/project/qualifier', '/project/structure']

const ROUTE = useRoute()

const onClickTab = (input: string) => navigateTo(URLS[SECTIONS.value.indexOf(input)]);


/**
 * On mount component...
 * set the Tab as specific pressed URL
 */

onMounted(() => CURRENT_SECTION.value = URLS.indexOf(ROUTE.path))

</script>


<template>
    <NuxtLayout name="default">
        <va-card class="mb-4">
            <va-card-content>
                <va-tabs v-model="CURRENT_SECTION" center>
                    <template #tabs>
                        <va-tab v-for="tab in SECTIONS" :key="tab" @click="onClickTab(tab)">
                            {{ tab }}
                        </va-tab>
                    </template>
                </va-tabs>

            </va-card-content>
        </va-card>
        <div class="flex flex-col gap-4">
            <slot />

        </div>
    </NuxtLayout>
</template>

