<template>
    <v-col v-if="controller.draw_count > 0" cols="auto">
        <v-card width="500">
            <v-card-title>コスト計算</v-card-title>
            <v-tabs v-model="cost_tabs">
                <v-tab value="cost_view">コスト</v-tab>
                <v-tab value="cost_edit">所有アイテム</v-tab>
            </v-tabs>
            <v-card-item>
                <v-window v-model="cost_tabs">
                    <v-window-item value="cost_view">
                        <div class="text-h7">不足ルチル</div>
                        <div class="text-h5">{{calc_cost.need_tanium.toLocaleString()}}ルチル</div>
                        <v-table>
                        <thead>
                            <tr>
                            <th>ルチル</th>
                            <th>個数</th>
                            <th>価格</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>6480</td>
                            <td>{{calc_cost.tanium_list.t6480}}</td>
                            <td>{{calc_cost.GetOneTaniumYen("t6480").toLocaleString()}}円</td>
                            </tr>
                            <tr>
                            <td>3280</td>
                            <td>{{calc_cost.tanium_list.t3280}}</td>
                            <td>{{calc_cost.GetOneTaniumYen("t3280").toLocaleString()}}円</td>
                            </tr>
                            <tr>
                            <td>1980</td>
                            <td>{{calc_cost.tanium_list.t1980}}</td>
                            <td>{{calc_cost.GetOneTaniumYen("t1980").toLocaleString()}}円</td>
                            </tr>
                            <tr>
                            <td>980</td>
                            <td>{{calc_cost.tanium_list.t980}}</td>
                            <td>{{calc_cost.GetOneTaniumYen("t980").toLocaleString()}}円</td>
                            </tr>
                            <tr>
                            <td>300</td>
                            <td>{{calc_cost.tanium_list.t300}}</td>
                            <td>{{calc_cost.GetOneTaniumYen("t300").toLocaleString()}}円</td>
                            </tr>
                            <tr>
                            <td>60</td>
                            <td>{{calc_cost.tanium_list.t60}}</td>
                            <td>{{calc_cost.GetOneTaniumYen("t60").toLocaleString()}}円</td>
                            </tr>
                        </tbody>
                        </v-table>
                    </v-window-item>
                    <v-window-item value="cost_edit">
                        <v-text-field clearable label="煙水晶" v-model="calc_cost.crystal"></v-text-field>
                        <v-text-field clearable label="所有ルチル" v-model="calc_cost.exist_tanium"></v-text-field>
                        <v-text-field clearable :label="controller.item_name" v-model="calc_cost.core_count"></v-text-field>
                    </v-window-item>
                </v-window>
            </v-card-item>
            <v-card-item>
                <div class="text-h7">必要課金額</div>
                <div class="text-h4">{{calc_cost.yen.toLocaleString()}}円</div>
            </v-card-item>
        </v-card>
    </v-col>
</template>

<script>
    import CostCalclator from "../../lib/LICalcCost.js"
    export default {
        props: ['controller'],
        data() {
            return {
                calc_cost: new CostCalclator(),
                cost_tabs: null
            }
        },
        watch: {
            'controller.draw_count': function(to){
                this.calc_cost.draw_count = to
            }
        }
    }
</script>