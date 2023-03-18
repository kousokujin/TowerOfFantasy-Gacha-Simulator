import BlackcoreController from "./LIBlackcoreController.js"
import GoldcoreController from "./LIGoldcoreController.js"

function CreateController(type){
    switch(type){
        case "blackcore":
            return new BlackcoreController()
        case "goldcore":
            return new GoldcoreController()
    }
}

export default CreateController