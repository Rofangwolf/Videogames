import { Link } from "react-router-dom";

export default function ButtonExit() {
    return (
        <div>
            <Link to="/">
                <button className="button buttondetails">EXIT</button>
            </Link>
        </div>
    )
}