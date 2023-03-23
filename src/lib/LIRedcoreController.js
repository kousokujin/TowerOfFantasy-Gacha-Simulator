import GoldcoreController from "./LIGoldcoreController.js"
import special_items from "../maps/redcore_specials.js"

class RedCoreController extends GoldcoreController{
    constructor(spetial){
        super()
        this.spetial = special_items[spetial]
        this.m_result_history[this.spetial.name] = {
            reality: "SSR",
            count: 0,
            ceiling_count: 0
        }
    }

    get title(){
        return this.spetial.title
    }

    OneDraw(write_history = true){
        let drop = super.OneDraw(false)
        
        if(drop.reality == "SSR"){
            let r = Math.random();
            if(r > 0.5){
                drop.name = this.spetial.name;
            }
        }

        if(write_history == true){
            this.WriteHistory(drop)
        }
    }
}

export default RedCoreController