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
    </v-container>
    <v-container>
      <AboutPage />
    </v-container>
</template>

<script>
  import special_items from "../../maps/redcore_specials.js"
  import about_page from "./AboutPage.vue"
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
        ],
        spetials: [] 
      }
    }),

    created: function(){
      Object.keys(special_items).forEach(x=>{
        let add_item = {
          title: special_items[x].title,
          chara_name: special_items[x].chara_name,
          link: "/gacha10/redcore/"+x,
          color: "red-lighten-4"
        }
        this.navlist.spetials.push(add_item)
      })
      document.title = "幻塔ガチャシミュレーター"
    }
  }
</script>
