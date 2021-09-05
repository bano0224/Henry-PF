import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import DetailProduct from "./Components/DetailProduct/DetailProduct"
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Cart from "./Components/ShoppingCart/ShoppingCart";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateProduct} />
        <Route exact path="/detail" component={DetailProduct} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/cart" component={Cart}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
