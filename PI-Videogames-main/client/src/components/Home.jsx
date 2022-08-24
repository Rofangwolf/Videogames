import NavBar from "./NavBar/NavBar";
import CardSmart from "./Cards/CardSmart"
import FormsButton from "./Buttons/FormsButton"
import "./styless.css"


export default function Home() {

    return (
        <div className="home fondo">
            <NavBar />
            <FormsButton />
            
            <div className="cards">
                <CardSmart />
            </div>

        </div>

    )
}