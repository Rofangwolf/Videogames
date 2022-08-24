import { useDispatch, useSelector } from "react-redux";
import { filterGenres } from "../../redux/actions";
import { getGenres } from "../../redux/actions"
import { useEffect } from "react"

export default function FilterGenres() {
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getGenres()) }, [])

    const genres = useSelector(state => state.genres)
    function onSelectChange(e) {
        dispatch(filterGenres(e.target.value))
    }

    return (
        <select name="genres" onChange={onSelectChange}>
            <option value="All">Todos los Géneros</option>
            {genres?.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
    )
}








