<template>
    <v-container>
      <v-row>
        <div class="text-h3 pa-2">恒常ガチャ</div>
      </v-row>
      <v-row>
        <v-col v-for="item in navlist.normal" :key="item" cols="auto">
          <v-card width="300" :color="item.color" :to="item.link">
            <v-card-title>{{item.title}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <div class="text-h3 pa-2">限定ガチャ</div>
      </v-row>
      <v-row>
        <v-col cols="auto" v-for="item in navlist.spetials" :key="item">
          <v-card width="300" :color="item.color" :to="item.link">
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-subtitle>{{item.chara_name}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <div class="text-h3 pa-2">限定ボリションガチャ</div>
      </v-row>
      <v-row>
        <v-col cols="auto" v-for="item in navlist.sp_matrices" :key="item">
          <v-card width="300" :color="item.color" :to="item.link">
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-subtitle>{{item.chara_name}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <AboutPage />
    </v-container>
</template>

<script>
  import special_items from "../../maps/redcore_specials.js"
  import special_matrices from "../../maps/matrices_specials.js"
  import about_page from "./AboutPage.vue"
  import utility from "../../lib/Utility.js"
  export default {
    name: 'HomeView',
    components: {
      "AboutPage" : about_page
    },
    data: () => ({
      drawer: false,
      navlist: {
        normal: [
          {title: "ゴールドコアガチャ", link: "/gacha10/goldcore", color: "yellow-lighten-2"},
          {title: "ブラックコアガチャ", link: "/gacha10/blackcore", color: "purple-lighten-4"},
          {title: "検索クーポンガチャ", link: "/gacha10/goldmatrices" , color: "orange-lighten-2"}
        ],
        spetials: [],
        sp_matrices: []
      }
    }),

    created: function(){
      Object.keys(special_items).forEach(x=>{
        let add_item = {
          title: special_items[x].title,
          chara_name: special_items[x].chara_name,
          link: "/gacha10/redcore/"+x,
          color: utility.TypeToColor(special_items[x].type),
          icon: utility.TypeToIcon(special_items[x].type)
        }
        this.navlist.spetials.push(add_item)

        if(Object.keys(special_matrices).includes(x) == true){
          let add_matrix = {
            title: special_items[x].title,
            chara_name: special_items[x].chara_name,
            link: "/gacha10/specialmatrices/"+x,
            color: utility.TypeToColor(special_items[x].type),
            icon: utility.TypeToIcon(special_items[x].type)
          }
          this.navlist.sp_matrices.push(add_matrix)
        }
      })
      document.title = "幻塔ガチャシミュレーター"
    }
  }
</script>
