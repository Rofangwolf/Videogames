import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeButton from "../Buttons/HomeButton";
import { getGenres, getPlatforms, createVideogame } from "../../redux/actions"
import { useHistory } from "react-router-dom"


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Es obligatorio ingresar el nombre del videojuego"
    }
    else if (!input.image) {
        errors.image = "Es obligatorio ingresar el link de la imagen del videojuego"
    }
    else if (!input.released) {
        errors.released = "Es obligatorio ingresar la fecha de lanzamiento"
    }
    else if (!input.rating) {
        errors.rating = "Es obligatorio marcar un valor de rating"
    }
    else if (!input.description) {
        errors.description = "Es obligatorio ingresar una descripción"
    }
    else if (input.genres.length === 0) {
        errors.genres = "Es obligatorio seleccionar al menos un género de videojuegos"
    }
    else if (input.platforms.length === 0) {
        errors.platforms = "Es obligatorio seleccionar al menos una plataforma de videojuegos"
    }
    return errors
}


export default function Form() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allGenres = useSelector(state => state.genres)
    const allPlatforms = useSelector(state => state.platforms)
    let [loading, setLoading] = useState(false)
    let [errors, setErrors] = useState({
        name: "Es obligatorio ingresar el nombre del videojuego"
    })
    let [input, setInput] = useState({
        name: "",
        image: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
        description: ""
    })

    useEffect(() => { dispatch(getPlatforms()) }, [])
    useEffect(() => { dispatch(getGenres()) }, [])

    function handleInputChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleInputCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleSelectChangePlatform(e) {

        if (!input.platforms.includes(e.target.value))
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.platforms],
        }))
    }


    function handleSelectChangeGenres(e) {
        if (!input.genres.includes(e.target.value))
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
            setErrors(validate({
                    ...input,
                    genres: [...input.platforms, e.target.platforms],
                })
            )
    }


    function handleDelete(del) {
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !== del),
            genres: input.genres.filter(g => g !== del)
        })
    }


    async function onSubmit(e) {
        e.preventDefault()
        setLoading(true)
        let creado = await dispatch(createVideogame(input))
        if (creado === "El videojuego ya existe") {
            alert("El videojuego ya existe")
        }
        else {
            alert("Videojuego creado exitosamente")
        }
        //console.log("Juego Creado:", input)
        //alert("Videojuego creado exitosamente")
        setInput({
            name: "",
            image: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
            description: ""
        })
        setLoading(false)
        history.push("/")
    }

    return (
        <div className="fondo">
            <HomeButton />
            <form>

                <h2 className="tittlescript">Creación de Videojuego</h2>
                {
                    loading ? (<h2 className="loading">LOADING...</h2>) : (<div>
                        <div>
                            {allPlatforms.length > 0 ? (<div className="details formulario">

                                <h3 className="itemform">Nombre del Videojuego: </h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={handleInputChange}>
                                </input>
                                {errors.name && (<p className="errors">{errors.name}</p>)}

                                <h3 className="itemform">Link de la imagen:</h3>
                                <input
                                    type="text"
                                    name="image"
                                    value={input.image}
                                    onChange={handleInputChange}>
                                </input>
                                {errors.image && (<p className="errors">{errors.image}</p>)}



                                <h3 className="itemform">Fecha de lanzamiento: </h3>
                                <input
                                    name="released"
                                    type="date"
                                    value={input.date}
                                    onChange={handleInputChange}>
                                </input>
                                {errors.released && (<p className="errors">{errors.released}</p>)}

                                <h3 className="itemform">Califique el juego:</h3>
                                <div className="rating">
                                    <label className="option">
                                        <input type="radio" value="1" name="rating" onChange={e => handleInputCheck(e)}></input >
                                        1
                                    </label>
                                    <label className="option">
                                        <input type="radio" value="2" name="rating" onChange={e => handleInputCheck(e)}></input >
                                        2
                                    </label>
                                    <label className="option">
                                        <input type="radio" value="3" name="rating" onChange={e => handleInputCheck(e)}></input >
                                        3
                                    </label>
                                    <label className="option">
                                        <input type="radio" value="4" name="rating" onChange={e => handleInputCheck(e)}></input >
                                        4
                                    </label>
                                    <label className="option">
                                        <input type="radio" value="5" name="rating" onChange={e => handleInputCheck(e)}></input >
                                        5
                                    </label>
                                </div>

                                {errors.rating && (<p className="errors">{errors.rating}</p>)}




                                <h3 className="itemform">Seleccione sus géneros</h3>
                                <div className="genres">
                                    <select id="genres" value={input.genres} multiple={true} size={allGenres.length} onChange={handleSelectChangeGenres}>
                                        {allGenres?.map(g => <option value={g} key={g}>{g}</option>)}
                                    </select>
                                    <div>
                                        {input.genres?.map(g =>
                                            <div key={g}>
                                                <button className="button" onClick={() => handleDelete(g)}>x</button>
                                                <label> {g}</label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {errors.genres && (<p className="errors">{errors.genres}</p>)}



                                <h3 className="itemform">Seleccione sus plataformas</h3>
                                <div className="genres">
                                    <select id="platforms" value={input.platforms} multiple={true} size={allPlatforms.length} onChange={handleSelectChangePlatform}>
                                        {allPlatforms?.map(p => <option value={p} key={p}>{p}</option>)}
                                    </select>
                                    <div>
                                        {input.platforms?.map(p =>
                                            <div key={p}>
                                                <button className="button" onClick={() => handleDelete(p)}>x</button>
                                                <label> {p}</label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {errors.platforms && (<p className="errors">{errors.platforms}</p>)}


                                <h3 className="itemform">Agregue una descripción del Videojuego</h3>
                                <textarea
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    cols="100"
                                    rows="10"
                                    onChange={handleInputChange}>
                                </textarea>
                                {errors.description && (<p className="errors">{errors.description}</p>)}

                                <div>
                                    <input type="submit" value="Crear Videojuego" className="button itemform" disabled={!!Object.keys(errors).length} onClick={onSubmit} />
                                </div>

                            </div>) : (<h2 className="loading">LOADING...</h2>)}
                        </div>
                    </div>)
                }
            </form>
        </div>
    )
}


/* 
    return (
        <div className="fondo">
            <HomeButton />
            <form>

                <h2 className="tittlescript">Creación de Videojuego</h2>
                {
                    loading ? (<h2>CARGANDO.... ESPERE POR FAVOR</h2>) : (<div>

                        <h3>Nombre del Videojuego: </h3>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={handleInputChange}>
                        </input>
                        {errors.name && (<p className="errors">{errors.name}</p>)}



                        <h3>Link de la imagen:</h3>
                        <input
                            type="text"
                            name="image"
                            value={input.image}
                            onChange={handleInputChange}>
                        </input>
                        {errors.image && (<p className="errors">{errors.image}</p>)}



                        <h3>Fecha de lanzamiento: </h3>
                        <input
                            name="released"
                            type="date"
                            value={input.date}
                            onChange={handleInputChange}>
                        </input>
                        {errors.released && (<p className="errors">{errors.released}</p>)}



                        <h3>Califique el juego:</h3>
                        <label>
                            <input type="radio" value="1" name="rating" onChange={e => handleInputCheck(e)}></input >
                            1
                        </label>
                        <label>
                            <input type="radio" value="2" name="rating" onChange={e => handleInputCheck(e)}></input >
                            2
                        </label>
                        <label>
                            <input type="radio" value="3" name="rating" onChange={e => handleInputCheck(e)}></input >
                            3
                        </label>
                        <label>
                            <input type="radio" value="4" name="rating" onChange={e => handleInputCheck(e)}></input >
                            4
                        </label>
                        <label>
                            <input type="radio" value="5" name="rating" onChange={e => handleInputCheck(e)}></input >
                            5
                        </label>
                        {errors.rating && (<p className="errors">{errors.rating}</p>)}



                        <h3>Seleccione sus géneros</h3>
                        <select id="genres" value={input.genres} multiple={true} size={allGenres.length} onChange={handleSelectChangeGenres}>
                            {allGenres?.map(g => <option value={g} key={g}>{g}</option>)}
                        </select>
                        <div>
                            {input.genres?.map(g =>
                                <div key={g}>
                                    <button className="button" onClick={() => handleDelete(g)}>x</button>
                                    <label> {g}</label>
                                </div>
                            )}
                        </div>
                        {errors.genres && (<p className="errors">{errors.genres}</p>)}



                        <h3>Seleccione sus plataformas</h3>
                        <select id="platforms" value={input.platforms} multiple={true} size={allPlatforms.length} onChange={handleSelectChangePlatform}>
                            {allPlatforms?.map(p => <option value={p} key={p}>{p}</option>)}
                        </select>
                        <div>
                            {input.platforms?.map(p =>
                                <div key={p}>
                                    <button className="button" onClick={() => handleDelete(p)}>x</button>
                                    <label> {p}</label>
                                </div>
                            )}
                        </div>
                        {errors.platforms && (<p className="errors">{errors.platforms}</p>)}



                        <h3>Agregue una descripción del Videojuego</h3>
                        <textarea
                            type="text"
                            name="description"
                            value={input.description}
                            cols="100"
                            rows="10"
                            onChange={handleInputChange}>
                        </textarea>
                        {errors.description && (<p className="errors">{errors.description}</p>)}


                        <div>
                            <input type="submit" value="Crear Videojuego" className="button" disabled={!!Object.keys(errors).length} onClick={onSubmit} />
                        </div>

                    </div>)
                }
            </form>
        </div>
    )
} */
