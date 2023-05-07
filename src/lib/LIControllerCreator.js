import BlackcoreController from "./LIBlackcoreController.js"
import GoldcoreController from "./LIGoldcoreController.js"
import RedcoreController from "./LIRedcoreController.js"
import GoldMatricesController from "./LIGoldMatricesController.js"
import SpecialMatricesController from "./LISpecialMatricesController.js"

import special_items from "../maps/redcore_specials.js"
import special_matrices from "../maps/redcore_specials.js"

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
            return new GoldcoreController()
        case "goldmatrices":
            return new GoldMatricesController()
        case "specialmatrices":
            if(Object.keys(special_items).includes(special) == true && Object.keys(special_matrices).includes(special) == true){
                return new SpecialMatricesController(special)
            }
            return new GoldMatricesController()
        default:
            return false
    }
}

export default CreateController