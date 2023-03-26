<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>幻塔ガチャシミュレーターについて</v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>開発者</v-list-item-title>
                        <v-list-item-text>
                            <a href="https://twitter.com/highsokujin">高速人</a>
                        </v-list-item-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>バージョン</v-list-item-title>
                        <v-list-item-text>1.0.0</v-list-item-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>アップデート履歴</v-list-item-title>
                        <v-list-item-text v-for="item in updates" :key="item.key">
                            {{item.date}} {{item.content}}
                        </v-list-item-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>ソースコード</v-list-item-title>
                        <v-list-item-text><a href="https://github.com/kousokujin/TowerOfFantasy-Gacha-Simulator">こちら</a></v-list-item-text>
                    </v-list-item>
                </v-list>
                <!--
                <v-col cols="auto">
                    <div class="text-h4">開発者</div>
                    <div class="text-h5">
                        <a href="https://twitter.com/highsokujin">高速人</a>
                    </div>
                </v-col>
                <v-col cols="auto">
                    <div class="text-h4">バージョン</div>
                    <div class="text-h5">1.0.0</div>
                </v-col>
                <v-col cols="auto">
                    <div class="text-h4">アップデート履歴</div>
                    <div class="text-h5" v-for="item in updates" :key="item.key">
                        {{item.date}} {{item.content}}
                    </div>
                </v-col>
                -->
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<script>
    export default {
        data(){
            return {
                updates: [
                    {
                        date: "2023/03/27",
                        content: "初回リリース",
                        key: "1"
                    }
                ]
            }
        }
    }
</script>