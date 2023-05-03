<template>
  <Result10WeaponView v-if="controller.type == 'weapon'" :controller="controller" />
  <Result10MatrixesView v-if="controller.type == 'matrices'" :controller="controller" />
</template>
<script>
    import Result10MatrixesView from "./Result10MatricesView.vue"
    import Result10WeaponView from "./Result10WeaponView.vue"
    export default {
        props: ['controller'],
        components: {
            "Result10MatrixesView": Result10MatrixesView,
            "Result10WeaponView": Result10WeaponView
        }
    }
</script>