require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");


// Funcion para traer todos los videojuegos
async function getVideogames() {
    let APIAUX = []
     for(let i=1; i<6; i++){
        let apiAux = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        APIAUX = [...APIAUX, ...apiAux.data.results]
} 
    let apiVideogamesInfo = APIAUX?.map(e => {
        return {
            id: e.id,
            name: e.name,
            rating: e.rating,
            image: e.background_image,
            genres: e.genres.map(g => g.name),
            platforms: e.platforms.map(p => p.platform.name),
        }
    })
    return apiVideogamesInfo
}


// Funcion para traer detalles de 1 videjuego
async function getVideogameDetails(id) {
    let apiGameDetails = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    let gameDetails = {
        id: apiGameDetails.data.id,
        name: apiGameDetails.data.name,
        released: apiGameDetails.data.released,
        image: apiGameDetails.data.background_image,
        rating: apiGameDetails.data.rating,
        genres: apiGameDetails.data.genres.map(e => e.name),
        platforms: apiGameDetails.data.platforms.map(e => e.platform.name),
        description: apiGameDetails.data.description_raw
    }
    return gameDetails
}


// Funcion para traer todos los generos
async function getGenres() {
    let apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let apiGenresInfo = apiGenres.data.results.map(e => {
        return {
            id: e.id,
            name: e.name
        }
    })
    return apiGenresInfo
}


async function getPlatforms() {
    let PlatformsAux = []
    let videoGames = await getVideogames()
    videoGames.map(e => {
        e.platforms.map(p => {
            PlatformsAux.push(p)
        })
    })
    let allPlatforms = [...new Set(PlatformsAux)]
    return allPlatforms
}


async function VideoGamesDB(){
    let videojuegosDB = await Videogame.findAll({
        include: {
            model: Genre, 
            attributes: ["name"],
             through: {
                attributes: []
            } 
        }
    })
     let forrmatoVideojuegosDB = videojuegosDB.map( e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            description: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms,
            genres: e.genres.map(g => g.name)
        }
    }) 
    return forrmatoVideojuegosDB  
}




module.exports = { 
    getVideogames, 
    getGenres, 
    getVideogameDetails, 
    getPlatforms,
    VideoGamesDB }

