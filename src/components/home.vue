<template>
    <div class="text-h4 pa-2">ガチャシミュレーター一覧</div>
    <div class="text-h5 pa-2">恒常ガチャ</div>
    <v-list lines="one">
        <v-list-item>
            <router-link class="text-body-1 text-decoration-none" to="/goldcore">ゴールドコア</router-link>
        </v-list-item>
        <v-list-item>
            <router-link class="text-body-1 text-decoration-none" to="/blackcore">ブラックコア</router-link>
        </v-list-item>
    </v-list>
</template>

<script>
  export default {
    name: 'HomeView'
  }
</script>
