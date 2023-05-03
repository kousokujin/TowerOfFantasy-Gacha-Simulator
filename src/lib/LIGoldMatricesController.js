import BlackCoreController from "./LIBlackcoreController"
import GoldMatrcesMap from "../maps/gold_matrices"

class GoldMatricesController extends BlackCoreController{
    get map(){
        return GoldMatrcesMap
    }

    get title(){
        return "検索クーポンガチャ"
    }

    get item_name(){
        return "検索クーポン"
    }

    CreateHistory(){
        this.m_result_history = {
            mind: {},
            memory: {},
            faith: {},
            emotion: {}
        }

        Object.keys(this.m_item_map).forEach(x=>{
            this.m_item_map[x].items.forEach(item_dict=>{
                Object.keys(this.m_result_history).forEach(k=>{
                    let key_name
                    if("name" in item_dict){
                        key_name = item_dict.name + "・" + item_dict[k]
                    }
                    else{
                        key_name = item_dict[k]
                    }
    
                    this.m_result_history[k][key_name] = {
                        reality: x,
                        count: 0,
                        ceiling_count: 0
                    }
                })
            })
        })
    }
}

export default GoldMatricesController