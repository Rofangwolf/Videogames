import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchVideogame } from "../../redux/actions"

export default function SearchBar() {
    const [search, setSearch] = useState("")
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()
        dispatch(searchVideogame(search))
        setSearch("")
    }

    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    onChange={onInputChange}
                    value={search}
                    placeholder="Videojuego..." />


                <input className="button"
                type="submit"
                value="Buscar"/>

            </form>
        </div>
    )
}

