<template>
    <ResultMatricesView v-if="controller.type=='matrices'" :controller="controller"/>
    <ResultWeaponView v-if="controller.type=='weapon'" :controller="controller"/>
</template>
<script>
    import ResultMatricesView from "./ResultMatricesView.vue"
    import ResultWeaponView from "./ResultWeaponView.vue"
    export default {
        props: ['controller'],
        components: {
            "ResultMatricesView": ResultMatricesView,
            "ResultWeaponView": ResultWeaponView 
        }
    }
</script>