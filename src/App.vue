<template>
  <v-app>
    <v-app-bar color="indigo-darken-4" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>幻塔ガチャシミュレーター</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app disable-resize-watcher v-model="drawer">
      <v-list dense nav>
        <v-list-subheader>恒常ガチャ</v-list-subheader>
        <v-list-item v-for="item in nav_list.constants" :prepend-icon="item.icon" :title="item.title" :key="item" :to="item.link">
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-subheader>限定ガチャ</v-list-subheader>
        <v-list-item v-for="item in nav_list.spetials" :prepend-icon="item.icon" :title="item.title" :key="item" :to="item.link">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    nav_list: {
      constants: [
        {title: "ゴールドコアガチャ", link: "/goldcore", icon: "mdi-circle-outline"},
        {title: "ブラックコアガチャ", link: "/blackcore", icon: "mdi-circle"},
      ],
      spetials: [
        {title: "ゴールドコアガチャ", link: "/about", icon: "mdi-fish"},
        {title: "ブラックコアガチャ", link: "/blackcore", icon: "mdi-fish"},
      ] 
    }
  }),
};
</script>
