import GoldcoreController from "./LIGoldcoreController.js"
import special_items from "../maps/redcore_specials.js"

class RedCoreController extends GoldcoreController{
    constructor(special){
        super()
        this.m_special = special_items[special]
        this.m_result_history[this.m_special.name] = {
            reality: "SSR",
            count: 0,
            ceiling_count: 0
        }
    }

    get title(){
        return this.m_special.title
    }

    get item_name(){
        return "レッドコア"
    }

    OneDraw(write_history = true){
        let drop = super.OneDraw(false)
        
        if(drop.reality == "SSR"){
            let r = Math.random();
            if(r > 0.5){
                drop.name = this.m_special.name;
            }
        }

        if(write_history == true){
            this.WriteHistory(drop)
        }
    }
}

export default RedCoreController