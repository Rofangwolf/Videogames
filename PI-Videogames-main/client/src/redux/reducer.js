const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES"
const GET_VIDEOGAME_DETAILS = "GET_VIDEOGAME_DETAILS"
const GET_GENRES = "GET_GENRES"
const GET_PLATFORMS = "GET_PLATFORMS"
const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME"
const ORDER_NAME = "ORDER_NAME"
const ORDER_RATING = "ORDER_RATING"
const FILTER_GENRES = "FILTER_GENRES"
const FILTER_ORIGINS = "FILTER_ORIGINS"
const CREATE_VIDEOGAME = "CREATE_VIDEOGAME"


const initialState = {
    videogames: [],
    videogamesFilter: [],
    videogamesDetails: [],
    genres: [],
    platforms: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                videogamesFilter: action.payload
            }

        case GET_VIDEOGAME_DETAILS:
            return {
                ...state,
                videogamesDetails: [action.payload]
            }


        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }


        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }


        case SEARCH_VIDEOGAME:
            let searchGame = [...state.videogames]
            searchGame = searchGame.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
            if (searchGame.length === 0) {
                searchGame = [...state.videogames]
                alert("Videojuego no encontrado")
            }
            return {
                ...state,
                videogamesFilter: searchGame
            }

        case ORDER_NAME:
            let orderAuxN = [...state.videogamesFilter]
            let orderGameN = orderAuxN.sort((a, b) => {
                if (a.name <= b.name) {
                    return action.payload === "asc" ? -1 : 1
                }
                if (a.name > b.name) {
                    return action.payload === "des" ? -1 : 1
                }
            })
            return {
                ...state,
                videogamesFilter: orderGameN
            }

        case ORDER_RATING:
            let orderAuxR = [...state.videogamesFilter]
            let orderGameR = orderAuxR.sort((a, b) => {
                if (a.rating <= b.rating) {
                    return action.payload === "asc" ? -1 : 1
                }
                if (a.rating > b.rating) {
                    return action.payload === "des" ? -1 : 1
                }
            })
            return {
                ...state,
                videogamesFilter: orderGameR
            }


        case FILTER_GENRES:
            let filterAuxG = state.videogames
            if (action.payload !== "All") {
                filterAuxG = filterAuxG.filter(e => {
                    return e.genres.includes(action.payload)
                })
            }
            console.log("filterAuxG", filterAuxG)
            return {
                ...state,
                videogamesFilter: filterAuxG
            }

        case FILTER_ORIGINS:
            let filterAuxO = state.videogames
            if (action.payload === "API") {
                filterAuxO = filterAuxO.filter(e => {
                    return typeof (e.id) === "number"
                })
            }
            else if (action.payload === "Created") {
                filterAuxO = filterAuxO.filter(e => {
                    return typeof (e.id) === "string"
                })
            }
            return {
                ...state,
                videogamesFilter: filterAuxO
            }

        default:
            return state

    }
}