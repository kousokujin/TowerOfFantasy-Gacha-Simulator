import BlackCoreController from "./LIBlackcoreController"
import GoldMatrcesMap from "../maps/gold_matrices"

class GoldMatricesController extends BlackCoreController{
    get map(){
        return GoldMatrcesMap
    }

    get type(){
        return "matrices"
    }

    get title(){
        return "検索クーポンガチャ"
    }

    get item_name(){
        return "検索クーポン"
    }

    get pos_arr(){
        return Object.keys(this.m_result_history)
    }

    get draw_count(){
        let sum = 0;
        this.pos_arr.forEach(p=>{
            let keys = Object.keys(this.m_result_history[p])
            keys.forEach(x=>{
                sum += this.m_result_history[p][x].count;
            })
        })

        return sum;
    }

    get history(){
        return this.m_result_history;
    }

    history_lists(reality,pos){
        let reality_fix = this.ConvertReality(reality)
        return Object.keys(this.m_result_history[pos]).filter(x=>{
            return this.m_result_history[pos][x].count > 0 && 
            this.ConvertReality(this.m_result_history[pos][x].reality) == reality_fix
        })
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
                this.pos_arr.forEach(k=>{
                    let display_name
                    if('name' in item_dict){
                        display_name = item_dict.name + "・" + item_dict[k]
                    }
                    else{
                        display_name = item_dict[k]
                    }
                    this.m_result_history[k][item_dict[k]] = {
                        reality: x,
                        count: 0,
                        ceiling_count: 0,
                        display_name: display_name
                    }
                })
            })
        })
    }

    WriteHistory(drop){
        this.m_result_history[drop.pos][drop.name].count += 1
        if(drop.ceiling == true){
            this.m_result_history[drop.pos][drop.name].ceiling_count += 1
        }
        this.SetLast10(drop);
    }

    OneDraw(write_history = true){
        let r = Math.random();
        let drop = null;
        let item_keys = Object.keys(this.m_item_map)

        item_keys.forEach(x=>{
            if(drop == null && r < this.m_item_map[x].thickness){
                let r_item = Math.floor(Math.random() * this.m_item_map[x].items.length);
                let pos = this.pos_arr[Math.floor(Math.random() * this.pos_arr.length)];
                
                let get_item = this.m_item_map[x].items[r_item][pos];
                let chara_name;
                if("name" in this.m_item_map[x].items[r_item]){
                    chara_name = this.m_item_map[x].items[r_item].name
                }
                else {
                    chara_name = null;
                }
                drop = {
                    reality: x,
                    name: get_item,
                    chara_name: chara_name,
                    rate: this.m_item_map[x].rate,
                    pos: pos,
                    ceiling: false
                }
            }
        });

        if(drop == null){
            drop = {value: r}
        }

        if(write_history == true){
            this.WriteHistory(drop)
        }
        return drop;
    }
}

export default GoldMatricesController