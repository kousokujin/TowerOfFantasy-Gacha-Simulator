import BlackcoreController from "./LIBlackcoreController.js"
import GoldcoreMap from "../maps/goldcore.js";

class GoldCoreController extends BlackcoreController{
    get map(){
        return GoldcoreMap 
    }

    get title(){
        return "ゴールドコアガチャ"
    }

    get item_name(){
        return "ゴールドコア"
    }

    OneDraw(write_history = true){
        if((this.draw_count + 1) % 80 == 0){
            return this.DrawOnlyOneReality("SSR",write_history);
        }

        let drop = super.OneDraw(false);
        if(drop.reality == "SR" && (this.draw_count + 1) % 10 == 0){
            drop.ceiling = true;
        }

        if(drop.reality != "SR" && drop.reality != "SSR" && (this.draw_count + 1) % 10 == 0){
            return this.DrawOnlyOneReality("SR",write_history);
        }

        if(write_history == true){
            this.WriteHistory(drop)
        }
        return drop;

    }

    DrawOnlyOneReality(reality,write_history = true){
        let r = Math.floor(Math.random() * this.m_item_map[reality].items.length);
        let drop = {
            reality: reality,
            name: this.m_item_map[reality].items[r],
            rate: this.m_item_map[reality].rate,
            ceiling: true
        }

        if(write_history == true){
            this.WriteHistory(drop)
        }

        return drop;
    }
}

export default GoldCoreController