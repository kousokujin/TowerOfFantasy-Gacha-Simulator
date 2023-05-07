<template>
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
                    <td>{{controller.history[item].count}}({{controller.history[item].ceiling_count}})</td>
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
</template>
<script>
    export default {
        props: ['controller'],
        data(){
            return {
                reality_tabs: null
            }
        },
        computed: {
            get_history_reality(){
                return (reality)=>{
                    return this.controller.history_lists(reality)
                }
            },

            get_rate(){
                return (item)=>{
                    return Math.round(this.controller.history[item].count / this.controller.draw_count * 1000) / 10
                }
            }
        },
    }
</script>