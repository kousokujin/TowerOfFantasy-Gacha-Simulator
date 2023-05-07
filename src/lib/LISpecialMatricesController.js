import GoldMatricesController from "./LIGoldMatricesController"
import specials_maps from "../maps/matrices_specials"
import special_items from "../maps/redcore_specials.js"

class SpecailMatricesController extends GoldMatricesController{
    constructor(special){
        super()
        this.m_special_chara = special_items[special]
        this.m_special_matrix = specials_maps[special]
        this.pos_arr.forEach(x=>{
            let display_name = this.m_special_chara.chara_name + "・" + this.m_special_matrix[x]
            this.m_result_history[x][this.m_special_matrix[x]] = {
                reality: "SSR",
                count: 0,
                ceiling_count: 0,
                display_name: display_name
            }
        });

    }

    get title(){
        return this.m_special_chara.title + "(ボリション)"
    }
    
    get item_name(){
        return "スペシャルクーポン"
    }

    OneDraw(write_history = true){
        let drop = super.OneDraw(false)
        
        if(drop.reality == "SSR"){
            let r = Math.random();
            if(r > 0.5){
                drop.name = this.m_special_matrix[drop.pos]
                drop.chara_name = this.m_special_chara.chara_name
            }
        }

        if(write_history == true){
            this.WriteHistory(drop)
        }

    }
}

export default SpecailMatricesController