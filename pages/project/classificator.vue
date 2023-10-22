<script setup lang="ts">
// You might choose this based on an API call or logged-in status
definePageMeta({
    layout: false
})

import { IKeyword } from '../../interfaces/IKeyword'

//Keyword List
const KeywordList = reactive<IKeyword[]>([]);

/**
 * 
 * @param index 
 * @param type 
 * 
 * change type of specified keyword (indentified by index)
 */
const onChangeKeywordType = (index: number, type: string) => KeywordList[index].type = type


const onClickButtonLoadProject = () => {

}


</script>
<template>
    <NuxtLayout name="projects">
        
    </NuxtLayout>
</template>
