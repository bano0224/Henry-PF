import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import CreateProduct from "./Components/CreateProduct/CreateProduct";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateProduct} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
