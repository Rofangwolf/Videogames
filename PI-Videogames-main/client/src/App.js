import { Route, BrowserRouter, Switch } from "react-router-dom"
import CardDetails from "./components/Cards/CardDetails"
import Home from "./components/Home"
import CreateVideogame from "./components/Forms/CreateVideogame"
import LandingPage from './components/LandingPage';
import "./reset.css"


function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route
          exact path="/videogames/:idDetails"
          component={CardDetails} />

        <Route
          exact path="/videogames"
          component={Home} />

        <Route
          exact path="/forms"
          component={CreateVideogame} />

        <Route 
        path="/"
        component={LandingPage}/>

      </Switch>
    </BrowserRouter>

  );
}

export default App;
