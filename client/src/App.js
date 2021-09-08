import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import Home from "./Components/Home/Home";
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import DetailProduct from "./Components/DetailProduct/DetailProduct"
import AdminNav from "./Components/AdminDashboard/AdminNav/AdminNav";
import AdminProduct from "./Components/AdminDashboard/AdminProduct/AdminProduct";
import AdminUsers from "./Components/AdminDashboard/AdminUsers/AdminUsers";
import AdminCategories from "./Components/AdminDashboard/AdminCategories/AdminCategories";
import AdminAddProduct from "./Components/AdminDashboard/AdminAddProduct/AdminAddProduct";
import 'bootstrap/dist/css/bootstrap.min.css'
import Cart from "./Components/ShoppingCart/ShoppingCart";
import AdminModifyProduct from "./Components/AdminDashboard/AdminModifyProduct/AdminModifyProduct";
import AdminAddCategory from "./Components/AdminDashboard/AdminAddCategory/AdminAddCategory";
import Reviews from "./Components/Reviews/Reviews";
import Login from "./Components/Login/Login";
=======
import Home from "./components/Home/Home";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import DetailProduct from "./components/DetailProduct/DetailProduct"
import AdminNav from "./components/AdminDashboard/AdminNav/AdminNav";
import AdminProduct from "./components/AdminDashboard/AdminProduct/AdminProduct";
import AdminUsers from "./components/AdminDashboard/AdminUsers/AdminUsers";
import AdminCategories from "./components/AdminDashboard/AdminCategories/AdminCategories";
import AdminAddProduct from "./components/AdminDashboard/AdminAddProduct/AdminAddProduct";
import Cart from "./components/ShoppingCart/ShoppingCart";
import AdminModifyProduct from "./components/AdminDashboard/AdminModifyProduct/AdminModifyProduct";
import AdminAddCategory from "./components/AdminDashboard/AdminAddCategory/AdminAddCategory";
import Reviews from "./components/Reviews/Reviews";
>>>>>>> 8c2870145ad18c417539b72d38c4952817146840

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
        <Route exact path="/admin/products/modify/:id" component={AdminModifyProduct} />
        <Route exact path="/admin/categories" component={AdminCategories} />
        <Route exact path='/admin/categories/add' component={AdminAddCategory} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/detail/:id" render={({ match }) => <DetailProduct id={match.params.id} />}></Route>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/reviews" component={Reviews}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
