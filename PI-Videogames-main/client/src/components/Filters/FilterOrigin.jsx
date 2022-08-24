import { useDispatch } from "react-redux";
import { filterOrigins } from "../../redux/actions"

export default function FilterOrigins(){
    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(filterOrigins(e.target.value))
    }
return (
    <select name="origin" onChange={onSelectChange}>
        <option value="All">Todos los Videojuegos</option>
        <option value="API">Solo API</option>
        <option value="Created">Solo Creados</option>
    </select>
)
}