import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import DetailProduct from "./Components/DetailProduct/DetailProduct"
<<<<<<< Updated upstream
import { Admindashboard } from "./Components/AdminDashboard/AdminDashboard";
=======
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateProduct} />
        <Route exact path="/detail" component={DetailProduct} />
<<<<<<< Updated upstream
        <Route exact path="/admin" component={Admindashboard} />
=======
        <Route exact path="/admin" component={AdminDashboard} />
>>>>>>> Stashed changes
      </Switch>
    </BrowserRouter>
  );
}

export default App;
