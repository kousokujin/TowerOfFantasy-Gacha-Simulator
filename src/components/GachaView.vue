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
        <v-card width="500"  v-if="controller.draw_count > 0">
          <v-card-title>抽選アイテム一覧</v-card-title>
          <v-card-subtitle>{{controller.draw_count}}回</v-card-subtitle>
          <v-tabs v-model="reality_tabs">
            <v-tab v-for="(reality,reality_idx) in ['SSR','SR','N']" :key="reality_idx" :value="reality">
              {{reality}}
            </v-tab>
          </v-tabs>
          <v-card-item>
            <v-window v-model="reality_tabs">
              <v-window-item v-for="(reality,reality_idx) in ['SSR','SR','N']" :key="reality_idx" :value="reality">
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
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  import GachaCreator from "../lib/LIControllerCreator.js"

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
        reality_tabs: null
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
      }
    }
  }
</script>
