<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <div class="text-h3">{{controller.title}}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn v-on:click="DrawButton" size="x-large" color="red-lighten-1">
          ガチャを引く
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn v-on:click="ResetButton" icon="mdi-reload"></v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
  <Result10View :controller="controller" />
  <v-container>
    <v-col>
      <v-row>
        <ResultView  :controller="controller" />
        <CalcCostView :controller="controller" />
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  import GachaCreator from "../../lib/LIControllerCreator.js"
  import CalcCostView from "./CalcCostView.vue"
  import Result10View from "./Result10View.vue"
  import ResultView from "./ResultView.vue"

  function CreateController(path_params){
    if('id' in path_params){
      return GachaCreator(path_params.type,path_params.id)
    } 
    return GachaCreator(path_params.type)
  }

  export default {
    components: {
      "CalcCostView": CalcCostView,
      "Result10View": Result10View,
      "ResultView": ResultView
    },
    data(){
      return {
        controller: CreateController(this.$route.params),
        reality_tabs: null,
        cost_tabs: null
      }
    },
    
    methods:{
      DrawButton: function(){
        this.controller.Draw_AnyCount(10)

      },
      ResetButton: function(){
        this.controller.Reset()
      }
    },

    mounted(){
      document.title = this.controller.title
    },

    watch:{
      '$route.params'(to){
        this.controller = CreateController(to)
        if(this.controller != false){
          document.title = this.controller.title
        }
      }
    }
  }
</script>
