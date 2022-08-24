import SearchBar from "./SearchBar";
import OrderName from "../Order/OrderName"
import OrderRating from "../Order/OrderRating"
import Paginado from "../Paginado/Paginado";
import FilterGenres from "../Filters/FilterGenres";
import FilterOrigin from "../Filters/FilterOrigin"
import Exit from "../Buttons/Exit"

export default function NavBar() {
    return (
        <div>
            <div className="SearchBar">
                <SearchBar />
            </div>

            <div className="Exit">
                <Exit />
            </div>

            <div className="filtros">            
                <OrderName />
                <OrderRating />
                <FilterGenres />
                <FilterOrigin />
            </div>


            <div className="paginado">
                <Paginado />
            </div>
        </div>
    )
}