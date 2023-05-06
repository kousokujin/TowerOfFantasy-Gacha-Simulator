<template>
    <v-container v-if="controller.last10.length > 0">
        <div class="text-h3">10連結果</div>
        <v-row>
            <v-col v-for="(item,index) in controller.last10" :key="index" cols="auto">
                <v-card width="250"
                :class="['d-flex']"
                :color="last10_color(item.reality)"
                >
                    <v-card-item>
                        <v-card-subtitle>
                            <span v-for="pos in get_matrices_arr" :class="get_pos_class(pos,item.pos)" :key="pos">{{convert_pos_to_display(pos)}}  </span>
                        </v-card-subtitle>
                        <v-card-title class="text-h9">{{matrix_name(item)}}</v-card-title>
                        <v-card-subtitle>
                            <span>{{convert_rearity(item.reality)}}</span>
                            <span> 抽選回数: {{get_history(item).count}}</span>
                            <span v-if="item.ceiling"> 天井</span>
                        </v-card-subtitle>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-else>
        <div class="text-h4">「ガチャを引く」ボタンを押してください。</div>
  </v-container>
</template>

<script>
    import utility from "../../lib/Utility.js"

    export default {
        props: ['controller'],
        computed: {
            last10_color(){
                return utility.last10_card_color
            },
            get_history(){
                return (item)=>{
                    return this.controller.history[item.pos][item.name]
                }
            },

            convert_rearity(){
                return (reality)=>{
                    return this.controller.ConvertReality(reality)
                }
            },

            matrix_name(){
                return (item)=>{
                    if(item.chara_name != null){
                        return item.chara_name + "・"+item.name
                    }
                    else{
                        return item.name
                    }
                }
            },

            get_pos_class(){
                return (pos,type)=>{
                    if(pos == type){
                        return "text-body-2"
                    }
                    else{
                        return "text-body-2 text-disabled"
                    }
                }
            },

            get_matrices_arr(){
                return utility.MatricesTypesArr()
            },

            convert_pos_to_display(){
                return (pos)=>utility.MatricesPosToDisplay(pos)
            }
        }
    }
</script>