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
  <v-container v-if="controller.last10.length > 0">
    <Result10View :controller="controller" />
  </v-container>
  <v-container v-else>
    <div class="text-h4">「ガチャを引く」ボタンを押してください。</div>
  </v-container>
  <v-container>
    <v-col>
      <v-row>
        <v-col v-if="controller.draw_count > 0" cols="auto">
          <v-card width="450">
            <v-card-title>抽選アイテム一覧</v-card-title>
            <v-card-subtitle>{{controller.draw_count}}回</v-card-subtitle>
            <v-tabs v-model="reality_tabs">
              <v-tab v-for="(reality,reality_idx) in ['SSR','SR','R','N']" :key="reality_idx" :value="reality">
                {{reality}}
              </v-tab>
            </v-tabs>
            <v-card-item>
              <v-window v-model="reality_tabs">
                <v-window-item v-for="(reality,reality_idx) in ['SSR','SR','R','N']" :key="reality_idx" :value="reality">
                  <v-table v-if="get_history_reality(reality).length">
                    <thead>
                      <tr>
                        <th class="text-left">
                          名前
                        </th>
                        <th class="text-left">
                          回数
                        </th>
                        <th class="text-left">
                          天井
                        </th>
                        <th class="text-left">
                          割合
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item,index) in get_history_reality(reality)"
                        :key="index"
                      >
                        <td>{{item}}</td>
                        <td>{{controller.history[item].count}}</td>
                        <td>{{controller.history[item].ceiling_count}}</td>
                        <td>{{get_rate(item)}}</td>
                      </tr>
                    </tbody>
                  </v-table>
                  <div v-else class="text-h6">アイテムがありません</div>
                </v-window-item>
              </v-window>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col v-if="controller.draw_count > 0" cols="auto">
          <CalcCostView :controller="controller" />
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  import GachaCreator from "../../lib/LIControllerCreator.js"
  import CalcCostView from "./CalcCostView.vue"
  import Result10View from "./Result10View.vue"

  function CreateController(path_params){
    if('id' in path_params){
      return GachaCreator(path_params.type,path_params.id)
    } 
    return GachaCreator(path_params.type)
  }

  export default {
    components: {
      "CalcCostView": CalcCostView,
      "Result10View": Result10View
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
    computed: {
      get_history_reality(){
        return (reality)=>{
          return this.controller.history_lists(reality)
        }
      },

      get_rate(){
        return (item)=>{
          return Math.round(this.controller.history[item].count / this.controller.draw_count * 1000) / 10
        }
      }
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
