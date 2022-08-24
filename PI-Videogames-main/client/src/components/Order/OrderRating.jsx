import { useDispatch } from "react-redux"
import { orderRating } from "../../redux/actions"

export default function Order(){
    const dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(orderRating(e.target.value))
    }
    return (
        <select name="OrderRating" onChange={onSelectChange}>
            <option value={false}>Orden Rating</option>
            <option value="asc">Menor a Mayor</option>
            <option value="des">Mayor a Menor</option>
        </select>
    )
} 