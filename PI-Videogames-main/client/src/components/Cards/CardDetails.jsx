import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, Link } from "react-router-dom"
import { getVideogameDetails, deleteVideogame } from "../../redux/actions"


export default function VideogameDetails() {
    let { idDetails } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getVideogameDetails(idDetails)) }, [])
    const gameDetails = useSelector(state => state.videogamesDetails)


    async function handleDelete() {
        let mensaje = await dispatch(deleteVideogame(idDetails))
        if (mensaje === "Se ha eliminado el videojuego") {
            alert("Se ha eliminado el videojuego")
        }
        history.push("/")
    }

    async function handleHome() {
        await dispatch(getVideogameDetails())
    }

    return (
        <div className="carddetails fondo">
            <div>
                <Link to="/videogames">
                    <button onClick={handleHome} className="button buttondetails">Volver a Home</button>
                </Link>
            </div>
            {
                gameDetails.length > 0 ? (
                    <div>
                        <h2 className="tittlescript">{gameDetails[0].name}</h2>
                        <div>{typeof (gameDetails[0].id) === "string" ? (
                            <div>
                                <h2 className="tittle">Videojuego Creado</h2>
                                <button onClick={handleDelete} className="button buttoncreated">Eliminar</button>
                            </div>
                        ) :
                            <h2 className="tittle">Videojuego de la API</h2>}</div>


                        <div className="carddetails">
                            <div className="details">
                                <img src={gameDetails[0].image} className="" alt="IMAGE NOT FOUND" width='900px' height='600px' />
                                <h4>Nombre: {gameDetails[0].name}</h4>
                                <h4>Lanzamiento: {gameDetails[0].released}</h4>
                                <h4>Géneros: {gameDetails[0].genres?.join(", ")}</h4>
                                <h4>Plataformas: {gameDetails[0].platforms?.join(", ")}</h4>
                                <h4>Rating: {gameDetails[0].rating}</h4>
                            </div>

                            <p className="description">{gameDetails[0].description}</p>
                        </div>
                    </div>
                ) : (<div className="loading">
                    <h2>LOADING...</h2>
                </div>)

            }
        </div>

    )
}

