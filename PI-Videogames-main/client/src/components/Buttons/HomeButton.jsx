import { Link } from "react-router-dom";

export default function ButtonHome() {
    return (
        <div>
            <Link to="/videogames">
                <button className="button buttonform">Volver a Home</button>
            </Link>
        </div>
    )
}