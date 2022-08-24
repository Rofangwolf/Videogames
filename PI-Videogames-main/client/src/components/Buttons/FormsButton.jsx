import { Link } from "react-router-dom";

export default function ButtonForms() {
    return (
        <div>
            <Link to="/forms">
                <button className="button buttoncreated">Agregar un Videojuego</button>
            </Link>
        </div>
    )
}