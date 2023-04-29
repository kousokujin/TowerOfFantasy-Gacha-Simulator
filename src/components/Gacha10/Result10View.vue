<template>
    <div class="text-h3">10連結果</div>
    <v-row>
        <v-col v-for="(item,index) in controller.last10" :key="index" cols="auto">
        <v-card width="250"
        :class="['d-flex']"
        :color="last10_color(item.reality)"
        >
            <v-card-item>
            <v-card-subtitle>
                <span>{{convert_rearity(item.reality)}}</span>
                <span v-if="item.ceiling"> 天井</span>
            </v-card-subtitle>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>抽選回数: {{get_history(item.name).count}}</v-card-subtitle>
            </v-card-item>
        </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: ['controller'],
        setup(props){
            console.log(props.controller)
        },
        computed: {
            last10_color(){
                return (reality)=>{
                    switch(reality){
                        case "SSR":
                            return "yellow-lighten-2"
                        case "SR":
                            return "purple-lighten-4"
                        case "R":
                            return "light-green-lighten-4"
                        default:
                            return "white"
                    }
                }
            },
            get_history(){
                return (item)=>{
                    return this.controller.history[item]
                }
            },
            convert_rearity(){
                return (reality)=>{
                    return this.controller.ConvertReality(reality)
                }
            },
        }
    }
</script>