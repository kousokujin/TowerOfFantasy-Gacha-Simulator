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
    <div class="text-h3">10連結果</div>
    <v-row>
      <v-col v-for="(item,index) in controller.last10" :key="index" cols="auto">
        <v-card width="250"
        :class="['d-flex']"
        :color="last10_color(item.reality)"
        >
          <v-card-item>
            <v-card-subtitle>
              <span>{{convert_rearity(item.reality)}}</span>
              <span v-if="item.ceiling"> 天井</span>
            </v-card-subtitle>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>抽選回数: {{get_history(item.name).count}}</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
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
          <v-card width="500">
            <v-card-title>コスト計算</v-card-title>
            <v-tabs v-model="cost_tabs">
              <v-tab value="cost_view">コスト</v-tab>
              <v-tab value="cost_edit">所有アイテム</v-tab>
            </v-tabs>
            <v-card-item>
              <v-window v-model="cost_tabs">
                <v-window-item value="cost_view">
                  <div class="text-h7">不足ルチル</div>
                  <div class="text-h5">{{calc_cost.need_tanium.toLocaleString()}}ルチル</div>
                  <v-table>
                    <thead>
                      <tr>
                        <th>ルチル</th>
                        <th>個数</th>
                        <th>価格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>6480</td>
                        <td>{{calc_cost.tanium_list.t6480}}</td>
                        <td>{{calc_cost.GetOneTaniumYen("t6480").toLocaleString()}}円</td>
                      </tr>
                      <tr>
                        <td>3280</td>
                        <td>{{calc_cost.tanium_list.t3280}}</td>
                        <td>{{calc_cost.GetOneTaniumYen("t3280").toLocaleString()}}円</td>
                      </tr>
                      <tr>
                        <td>1980</td>
                        <td>{{calc_cost.tanium_list.t1980}}</td>
                        <td>{{calc_cost.GetOneTaniumYen("t1980").toLocaleString()}}円</td>
                      </tr>
                      <tr>
                        <td>980</td>
                        <td>{{calc_cost.tanium_list.t980}}</td>
                        <td>{{calc_cost.GetOneTaniumYen("t980").toLocaleString()}}円</td>
                      </tr>
                      <tr>
                        <td>300</td>
                        <td>{{calc_cost.tanium_list.t300}}</td>
                        <td>{{calc_cost.GetOneTaniumYen("t980").toLocaleString()}}円</td>
                      </tr>
                      <tr>
                        <td>60</td>
                        <td>{{calc_cost.tanium_list.t60}}</td>
                        <td>{{calc_cost.GetOneTaniumYen("t60").toLocaleString()}}円</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-window-item>
                <v-window-item value="cost_edit">
                  <v-text-field clearable label="煙水晶" v-model="cost_textareas.crystal"></v-text-field>
                  <v-text-field clearable label="所有ルチル" v-model="cost_textareas.exist_tanium"></v-text-field>
                  <v-text-field clearable label="レッドコア" v-model="cost_textareas.core"></v-text-field>
                </v-window-item>
              </v-window>
            </v-card-item>
            <v-card-item>
                <div class="text-h7">必要課金額</div>
                <div class="text-h4">{{calc_cost.yen.toLocaleString()}}円</div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  import GachaCreator from "../lib/LIControllerCreator.js"
  import CostCalclator from "../lib/LICalcCost.js"

  function CreateController(path){
        let split_path = path.split('/')

        if(split_path.length >= 3){
          return GachaCreator(split_path[1],split_path[2])
        } 
        return GachaCreator(split_path[1])
  }

  export default {
    data(){
      return {
        controller: CreateController(this.$route.path),
        calc_cost: new CostCalclator(),
        reality_tabs: null,
        cost_tabs: null,
        cost_textareas: {
          crystal: 0,
          exist_tanium: 0,
          core: 0
        }
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
      last10_color(){
        return (reality)=>{
          switch(reality){
            case "SSR":
              return "yellow-lighten-2"
            case "SR":
              return "purple-lighten-4"
            case "R":
              return "light-green-lighten-4"
            default:
              return "white"
          }
        }
      },

      convert_rearity(){
        return (reality)=>{
          return this.controller.ConvertReality(reality)
        }
      },

      get_history_reality(){
        return (reality)=>{
          return this.controller.history_lists(reality)
        }
      },

      get_history(){
        return (item)=>{
          return this.controller.history[item]
        }
      },

      get_rate(){
        return (item)=>{
          return Math.round(this.controller.history[item].count / this.controller.draw_count * 1000) / 10
        }
      }
    },

    watch:{
      '$route'(to){
        this.controller = CreateController(to.path)
        document.title = this.controller.title
      },
      'controller.draw_count': function(to){
        this.calc_cost.draw_count = to
      },
      'cost_textareas.core': function(to){
        this.calc_cost.core_count = to
      },
      'cost_textareas.crystal': function(to){
        this.calc_cost.crystal = to
      },
      'cost_textareas.exist_tanium': function(to){
        this.calc_cost.exist_tanium = to
      }

    }
  }
</script>
