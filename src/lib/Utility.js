export default {
    TypeToIcon(type){
        switch(type){
        case "ice":
            return "mdi-snowflake"
        case "flame":
            return "mdi-fire"
        case "volt":
            return "mdi-lightning-bolt"
        case "grievous":
            return "mdi-diamond-stone"
        case "altered":
            return "mdi-weather-windy"
        default:
            return "mdi-fish"
        }
    },
    TypeToColor(type){
        switch(type){
            case "ice":
                return "blue-lighten-4"
            case "flame":
                return "red-lighten-4"
            case "volt":
                return "deep-purple-lighten-4"
            case "grievous":
                return "lime-lighten-4"
            case "altered":
                return "green-lighten-4"
            default:
                return "grey-lighten-4"
        }
    }
}