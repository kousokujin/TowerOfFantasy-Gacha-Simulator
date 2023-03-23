import BlackcoreController from "./LIBlackcoreController.js"
import GoldcoreController from "./LIGoldcoreController.js"
import RedcoreController from "./LIRedcoreController.js"

function CreateController(type,special=""){
    console.log("type:"+type)
    console.log("special:"+special)
    switch(type){
        case "blackcore":
            return new BlackcoreController()
        case "goldcore":
            return new GoldcoreController()
        case "redcore":
            return new RedcoreController(special)
    }
}

export default CreateController