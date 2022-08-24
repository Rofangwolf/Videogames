import axios from "axios"
const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES"
const GET_VIDEOGAME_DETAILS = "GET_VIDEOGAME_DETAILS"
const GET_GENRES = "GET_GENRES"
const GET_PLATFORMS = "GET_PLATFORMS"
const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME"
const ORDER_NAME = "ORDER_NAME"
const ORDER_RATING = "ORDER_RATING"
const FILTER_GENRES = "FILTER_GENRES"
const FILTER_ORIGINS = "FILTER_ORIGINS"



export function getAllVideogames() {
    return async (dispatch) => {
        let res = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: res.data
        })
    }
}


export function getVideogameDetails(id) {
    return async (dispatch) => {
        let res = await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispatch({
            type: GET_VIDEOGAME_DETAILS,
            payload: res.data
        })
    }
}


export function getGenres() {
    return async (dispatch) => {
        let res = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: GET_GENRES,
            payload: res.data
        })
    }
}


export function getPlatforms() {
    return async (dispatch) => {
        let res = await axios.get("http://localhost:3001/platforms")
        return dispatch({
            type: GET_PLATFORMS,
            payload: res.data
        })
    }
}


export function searchVideogame(game) {
    return {
        type: SEARCH_VIDEOGAME,
        payload: game
    }
}

export function orderName(order) {
    return {
        type: ORDER_NAME,
        payload: order
    }
}


export function orderRating(order) {
    return {
        type: ORDER_RATING,
        payload: order
    }
}


export function filterGenres(genre) {
    return {
        type: FILTER_GENRES,
        payload: genre
    }
}


export function filterOrigins(origin) {
    return {
        type: FILTER_ORIGINS,
        payload: origin
    }
}


export function createVideogame(body) {
    return async (dispatch) => {
        let res = await axios.post("http://localhost:3001/videogames", body)
        return res.data
    }
}


export function deleteVideogame(id) {
    return async (dispatch) => {
        let res = await axios.delete(`http://localhost:3001/videogames/${id}`)
        return res.data
    }
}



/* 
export function createVideogame(body){
    return async (dispatch) => {
        let res = await axios.post("http://localhost:3001/videogames", body)
        console.log(res)
        return dispatch({
            type: CREATE_VIDEOGAME,
            payload: res.data
        })
    }
}
*/

