import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import DetailProduct from "./components/DetailProduct/DetailProduct"
import AdminNav from "./components/AdminDashboard/AdminNav/AdminNav";
import AdminProduct from "./components/AdminDashboard/AdminProduct/AdminProduct";
import AdminUsers from "./components/AdminDashboard/AdminUsers/AdminUsers";
import AdminCategories from "./components/AdminDashboard/AdminCategories/AdminCategories";
import AdminAddProduct from "./components/AdminDashboard/AdminAddProduct/AdminAddProduct";
import 'bootstrap/dist/css/bootstrap.min.css'
import Cart from "./components/ShoppingCart/ShoppingCart";
import AdminModifyProduct from "./components/AdminDashboard/AdminModifyProduct/AdminModifyProduct";
import AdminAddCategory from "./components/AdminDashboard/AdminAddCategory/AdminAddCategory";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreateProduct} />
        <Route exact path="/detail" component={DetailProduct} />
        <Route exact path="/admin" component={AdminNav} />
        <Route exact path="/admin/products" component={AdminProduct} />
        <Route exact path="/admin/products/add" component={AdminAddProduct} />
        <Route exact path="/admin/products/:id" component={AdminModifyProduct} />
        <Route exact path="/admin/categories" component={AdminCategories} />
        <Route exact path='/admin/categories/add' component={AdminAddCategory} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/detail/:id" render={({ match }) => <DetailProduct id={match.params.id} />}></Route>
        <Route exact path="/cart" component={Cart}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
