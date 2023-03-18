<template>
  <v-container>
    <v-row>
      <v-btn v-on:click="DrawButton" size="x-large" color="red-lighten-1">
        ガチャを引く
      </v-btn>
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
            <v-card-subtitle>{{convert_rearity(item.reality)}}</v-card-subtitle>
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
  <v-container v-if="controller.draw_count > 0">
    <div class="text-h3">抽選アイテム一覧</div>
    <div class="text-h6">{{controller.draw_count}}回</div>
    <v-row>
      <div v-for="(reality,reality_idx) in ['SSR','SR','N']" :key="reality_idx">
        <v-col v-if="get_history_reality(reality).length > 0">
          <v-card width="500">
            <v-card-item>
              <v-card-title>{{reality}}</v-card-title>
            </v-card-item>
            <v-card-item>
              <v-table>
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
            </v-card-item>
          </v-card>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  import GachaController from "../lib/LIBlackcoreController.js"
  export default {
    name: 'BlackCore',

    data(){
      return {
        controller: new GachaController()
      }
    },
    
    methods:{
      DrawButton: function(){
        this.controller.Draw_AnyCount(10)
      }
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
    }
  }
</script>
