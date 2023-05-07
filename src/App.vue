<template>
  <v-app>
    <v-app-bar color="indigo-darken-4" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title to="/">幻塔ガチャシミュレーター</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app disable-resize-watcher v-model="drawer">
      <v-list dense nav>
        <v-list-subheader>恒常ガチャ</v-list-subheader>
        <v-list-item v-for="item in nav_list.normal" :prepend-icon="item.icon" :title="item.title" :key="item" :to="item.link">
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-subheader>限定ガチャ</v-list-subheader>
        <v-list-item v-for="item in nav_list.spetials" :prepend-icon="item.icon" :title="item.title" :key="item" :to="item.link">
        </v-list-item>
      </v-list>
      <v-list dense nav>
        <v-list-subheader>限定ボリション</v-list-subheader>
        <v-list-item v-for="item in nav_list.sp_matrices" :prepend-icon="item.icon" :title="item.title" :key="item" :to="item.link">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import special_items from "./maps/redcore_specials.js"
import special_matrices from "./maps/matrices_specials.js"
import utility from "./lib/Utility.js"
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    nav_list: {
      normal: [
        {title: "ゴールドコアガチャ", link: "/gacha10/goldcore", icon: "mdi-circle-outline"},
        {title: "ブラックコアガチャ", link: "/gacha10/blackcore", icon: "mdi-circle"},
        {title: "検索クーポンガチャ", link: "/gacha10/goldmatrices", icon: "mdi-vector-rectangle"}
      ],
      spetials: [],
      sp_matrices: []
    }
  }),

  created: function(){
    Object.keys(special_items).forEach(x=>{
      let add_item = {
        title: special_items[x].title,
        link: "/gacha10/redcore/"+x,
        icon: utility.TypeToIcon(special_items[x].type)
      }
      this.nav_list.spetials.push(add_item)

      if(Object.keys(special_matrices).includes(x) == true){
        let add_matrix = {
          title: special_items[x].title,
          chara_name: special_items[x].chara_name,
          link: "/gacha10/specialmatrices/"+x,
          color: utility.TypeToColor(special_items[x].type),
          icon: utility.TypeToIcon(special_items[x].type)
        }
        this.nav_list.sp_matrices.push(add_matrix)
      }
    })
  }
};
</script>
