import BlackcoreController from "./LIBlackcoreController.js"
import GoldcoreController from "./LIGoldcoreController.js"
import RedcoreController from "./LIRedcoreController.js"

import special_items from "../maps/redcore_specials.js"
import GoldCoreController from "./LIGoldcoreController.js"

function CreateController(type,special=""){
    switch(type){
        case "blackcore":
            return new BlackcoreController()
        case "goldcore":
            return new GoldcoreController()
        case "redcore":
            if(Object.keys(special_items).includes(special) == true){
                return new RedcoreController(special)
            }
            return new GoldCoreController()
    }
}

export default CreateController