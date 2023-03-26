import BlackcoreMap from "../maps/blackcore.js";

class BlackCoreController{
    constructor(){
        this.LoadItemMap();
        this.CreateHistory();
        this.m_last10 = [];
    }

    get map(){
        return BlackcoreMap
    }

    get draw_count(){
        let keys = Object.keys(this.m_result_history)

        let sum = 0;
        keys.forEach(x=>{
            sum += this.m_result_history[x].count;
        })

        return sum;
    }

    get history(){
        return this.m_result_history;
    }

    get last10(){
        return this.m_last10;
    }

    get title(){
        return "ブラックコアガチャ"
    }

    get item_name(){
        return "ブラックコア"
    }


    history_lists(reality){
        let reality_fix = this.ConvertReality(reality)
        return Object.keys(this.m_result_history).filter(x=>{
            return this.m_result_history[x].count > 0 && 
            this.ConvertReality(this.m_result_history[x].reality) == reality_fix
        })
    }

    LoadItemMap(){
        this.m_item_map = this.map;
        let keys = Object.keys(this.map)
        let sum_late = 0.0

        keys.forEach(x=>{
            sum_late += this.map[x].rate
        })

        keys.forEach(x=>{
            this.m_item_map[x].rate_norm = this.map[x].rate / sum_late;
        })

        let thickness_sum = 0.0;
        keys.forEach(x=>{
            this.m_item_map[x].thickness = thickness_sum + this.m_item_map[x].rate_norm;
            thickness_sum +=  this.m_item_map[x].rate_norm;
        });
    }

    CreateHistory(){
        let keys = Object.keys(this.m_item_map);
        this.m_result_history = {};
        keys.forEach((x)=>{
            this.m_item_map[x].items.forEach(i=>{
                this.m_result_history[i] = {
                    reality: x,
                    count: 0,
                    ceiling_count: 0
                }
            });
        });
    }

    OneDraw(write_history = true){
        let r = Math.random();
        let drop = null;
        let item_keys = Object.keys(this.m_item_map)

        item_keys.forEach(x=>{
            if(drop == null && r < this.m_item_map[x].thickness){
                let r2 = Math.floor(Math.random() * this.m_item_map[x].items.length);
                let get_item = this.m_item_map[x].items[r2];
                drop = {
                    reality: x,
                    name: get_item,
                    rate: this.m_item_map[x].rate,
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

    WriteHistory(drop){
        this.m_result_history[drop.name].count += 1
        if(drop.ceiling == true){
            this.m_result_history[drop.name].ceiling_count += 1
        }
        this.SetLast10(drop);
    }

    Draw_AnyCount(count){
        let drops = [];

        for(let i=0;i<count;i++){
            drops.push(this.OneDraw());
        }

        return drops;
    }

    SetLast10(item){
        while(this.m_last10.length >= 10){
            this.m_last10.shift()
        }
        this.m_last10.push(item)
    }

    ConvertReality(reality){
        switch (reality) {
            case "N1":
            case "N2":
            case "C1":
            case "C2":
                return "N"
            default:
                return reality;
        }
    }

    Reset(){
        this.m_last10 = []

        Object.keys(this.m_result_history).forEach(x=>{
            this.m_result_history[x].count = 0
            this.m_result_history[x].ceiling_count = 0
        })

    }
}

export default BlackCoreController