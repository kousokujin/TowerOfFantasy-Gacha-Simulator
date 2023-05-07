<template>
    <v-col v-if="controller.draw_count > 0" cols="auto">
        <v-card width="450">
        <v-card-title>抽選アイテム一覧</v-card-title>
        <v-card-subtitle>{{controller.draw_count}}回</v-card-subtitle>
        <v-tabs v-model="pos_tabs">
            <v-tab v-for="(pos,pos_idx) in get_matrices_arr" :key="pos_idx" :value="pos">
                {{convert_type_word(pos)}}
            </v-tab>
        </v-tabs>
        <v-tabs v-model="reality_tabs">
            <v-tab v-for="(reality,reality_idx) in ['SSR','SR','R']" :key="reality_idx" :value="reality">
                {{reality}}
            </v-tab>
        </v-tabs>
        <v-card-item>
            <v-window v-model="pos_tabs">
                <v-window-item v-for="(pos,pos_idx) in get_matrices_arr" :key="pos_idx" :value="pos">
                    <v-window v-model="reality_tabs">
                        <v-window-item v-for="(reality,reality_idx) in ['SSR','SR','R']" :key="reality_idx" :value="reality">
                            <v-table v-if="get_history_reality(reality,pos).length">
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
                                v-for="(item,index) in get_history_reality(reality,pos)"
                                :key="index"
                                >
                                <td>{{controller.history[pos][item].display_name}}</td>
                                <td>{{controller.history[pos][item].count}}({{controller.history[pos][item].ceiling_count}})</td>
                                <td>{{get_rate(item,pos)}}</td>
                                </tr>
                            </tbody>
                            </v-table>
                            <div v-else class="text-h6">アイテムがありません</div>
                        </v-window-item>
                    </v-window>
                </v-window-item>
            </v-window>
        </v-card-item>
        </v-card>
    </v-col>
</template>
<script>
    import utility from "../../lib/Utility.js"

    export default {
        props: ['controller'],
        data(){
            return {
                reality_tabs: null,
                pos_tabs: null
            }
        },
        computed: {
            get_history_reality(){
                return (reality,pos)=>{
                    return this.controller.history_lists(reality,pos)
                }
            },

            get_rate(){
                return (item,pos)=>{
                    return Math.round(this.controller.history[pos][item].count / this.controller.draw_count * 1000) / 10
                }
            },

            get_matrices_arr(){
                return utility.MatricesTypesArr()
            },

            convert_type_word(){
                return (pos)=>utility.MatricesPosToDisplay(pos)
            }
        },
    }
</script>