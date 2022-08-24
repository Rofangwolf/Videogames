import { Link } from "react-router-dom"


export default function LandingPage() {
    return (
        <div className="LandingPage">
            {/*  <img src="https://www.trecebits.com/wp-content/uploads/2019/04/11854.jpg" height="100vh" /> */}
            <Link to="/videogames">
                <button className="button ladingButton">
                    PRESS START
                </button>
            </Link>

        </div>
    )
}