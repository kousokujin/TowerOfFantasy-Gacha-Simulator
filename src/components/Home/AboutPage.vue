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
                        <v-list-item-text>{{updates[updates.length - 1].version}}</v-list-item-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>アップデート履歴</v-list-item-title>
                        <v-list-item-text v-for="item in updates" :key="item.key">
                            <p>{{item.date}}({{item.version}}){{item.content}}</p>
                        </v-list-item-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>ソースコード</v-list-item-title>
                        <v-list-item-text><a href="https://github.com/kousokujin/TowerOfFantasy-Gacha-Simulator">こちら</a></v-list-item-text>
                    </v-list-item>
                </v-list>
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
                        version: "1.0.1"
                    },
                    {
                        date: "2023/03/29",
                        content: "凛夜実装",
                        version: "1.0.2"
                    },
                    {
                        date: "2023/04/02",
                        content: "嵐実装",
                        version: "1.0.3"
                    },
                    {
                        date: "2023/04/14",
                        content: "イカロス実装",
                        version: "1.0.4"
                    },
                    {
                        date: "2023/04/29",
                        content: "フィオナ実装",
                        version: "1.0.5"
                    },
                    {
                        date: "2023/04/30",
                        content: "不具合修正&少しUI改善",
                        version: "1.1.0"
                    },
                    {
                        date: "2023/05/08",
                        content: "ボリションガチャ実装等",
                        version: "2.0.0"
                    },
                    {
                        date: "2023/05/14",
                        content: "グノノ実装",
                        version: "2.0.1"
                    },
                    {
                        date: "2023/05/21",
                        content: "ゴールドコア恒常落ち対応",
                        version: "2.0.2"
                    },
                    {
                        date: "2023/06/03",
                        content: "レビリア実装",
                        version: "2.0.3"
                    }
                ]
            }
        }
    }
</script>