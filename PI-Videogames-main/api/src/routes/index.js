const { Router } = require('express');
const { getVideogames, getGenres, getVideogameDetails, getPlatforms, VideoGamesDB } = require("./functions")
const { Op } = require("sequelize")
const axios = require("axios")
const router = Router();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;



router.get("/genres", async (req, res, next) => {
    try {
        let allGenres = await getGenres()
        allGenres.forEach(e => {
            Genre.findOrCreate({
                where: {
                    id: e.id,
                    name: e.name
                }
            })
        })
        let onlyGenres = allGenres.map(e => e.name)
        res.send(onlyGenres)
    } catch (error) {
        next(error)
    }
})


router.get("/videogames", async (req, res, next) => {
    try {
        let { name } = req.query
        let videogameApi = await getVideogames()
        let videogameDB = await VideoGamesDB()
        let allVideogames = [...videogameApi, ...videogameDB]
        if (!!name) {
            let videogameApiAux = allVideogames.filter(e => e.name.toLowerCase() === name.toLowerCase())
            let newID = videogameApiAux[0].id
            allVideogames = allVideogames.filter(e => e.id === newID)
        } 
        res.send(allVideogames)
    } catch (error) {
        next(error)
    }
})


router.get("/videogames/:id", async (req, res, next) => {
    try {
        let { id } = req.params
        let VideogameID
        if (id.length < 7) {
            VideogameID = await getVideogameDetails(id)
        }
        else {
            let allVideogame = await VideoGamesDB()
            VideogameID = allVideogame.find(e => e.id === id)
        }
        res.send(VideogameID)
    } catch (error) {
        next(error)
    }
})


router.get("/platforms", async (req, res, next) => {
    try {
        let platforms = await getPlatforms()
        res.send(platforms)
    } catch (error) {
        next(error)
    }
})


router.post("/videogames", async (req, res, next) => {
    try {
        let { name, released, image, rating, genres, platforms, description } = req.body
        let videogameApi = await getVideogames()
        let videogameDB = await VideoGamesDB()
        let allVideogames = [...videogameApi, ...videogameDB]
        let videogameExisted = allVideogames.filter(e => e.name === name)
        if (!videogameExisted.length) {
            let videogameCreated = await Videogame.findOrCreate({
                where: {
                    name,
                    released,
                    image,
                    rating,
                    platforms,
                    description
                }
            })
            let genresDB = await Genre.findAll({
                where: { name: genres }
            })
            videogameCreated[0].addGenre(genresDB)
            res.send(videogameCreated[0])
        }
        else {
            res.send("El videojuego ya existe")
        }
    } catch (error) {
        next(error)
    }
})


router.delete("/videogames/:id", async (req, res, next) => {
    let { id } = req.params
    try {
        await Videogame.destroy({
            where: { id: id }
        })
        res.send("Se ha eliminado el videojuego")
    } catch (error) {
        next(error)
    }
})


router.get("/testeo", async (req, res, next) => {
    try {
        let aux = await VideoGamesDB()
        res.send(aux)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
