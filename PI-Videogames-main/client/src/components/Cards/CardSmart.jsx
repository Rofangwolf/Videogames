import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllVideogames } from "../../redux/actions"
import CardDumb from "./CardDumb"
import Paginado from "../Paginado/Paginado";


export default function CardsVideogames() {
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getAllVideogames()) }, [dispatch])

    const filterGame = useSelector((state => state.videogamesFilter))
    const [currentPage, setCurrentPage] = useState(1)
    const [gamePerPage, setGamePerPage] = useState(15)
    const indexLast = currentPage * gamePerPage
    const indexFirst = indexLast - gamePerPage
    const currentGame = filterGame.slice(indexFirst, indexLast)
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="fondo cardsmart">
            <Paginado gamePerPage={gamePerPage} N_Games={filterGame.length} paginado={paginado}/>
            {currentGame?.map(e => {
                return (
                    <CardDumb
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        image={e.image}
                        genres={e.genres} />
                )
            })}
        </div>
    )
}
