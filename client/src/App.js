import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./components/Home/Home";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import DetailProduct from "./components/DetailProduct/DetailProduct"
import AdminNav from "./components/AdminDashboard/AdminNav/AdminNav";
import AdminProduct from "./components/AdminDashboard/AdminProduct/AdminProduct";
import AdminUsers from "./components/AdminDashboard/AdminUsers/AdminUsers";
import AdminCategories from "./components/AdminDashboard/AdminCategories/AdminCategories";
import AdminAddProduct from "./components/AdminDashboard/AdminAddProduct/AdminAddProduct";
import AdminModifyProduct from "./components/AdminDashboard/AdminModifyProduct/AdminModifyProduct";
import AdminAddCategory from "./components/AdminDashboard/AdminAddCategory/AdminAddCategory";
import Reviews from "./components/Reviews/Reviews";
import Login from "./components/Login/Login";
import Logup from './components/Login/Logup'
import NotFound from "./components/404/NotFound";
import ScreenCart from './components/Cart/CartScreen'
import AddressForm from './components/Cart/AddressForm'
import Checkout from './components/Cart/Checkout'
import Confirmation from "./components/Cart/Confirmation";
import AdminModifyCategory from "./components/AdminDashboard/AdminModifyCategory/AdminModifyCategory";
import AdminModifyUser from "./components/AdminDashboard/AdminModifyUser/AdminModifyUser";
import ResetPassword from './components/Login/ResetPassword';
import Confirm from './components/Login/Confirm';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivateRouteCheckout from "./components/PrivateRoute/PrivateRouteCheckout";
import UserProfile from "./components/userProfile/userProfile";
import Promotions from "./components/Promotions/Promotions";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreateProduct} />
        <Route exact path="/user/:id" render={({ match }) => <Confirm id={match.params.id}/>}></Route>
        <Route exact path="/detail/:id" render={({ match }) => <DetailProduct id={match.params.id} />}></Route>
        <Route exact path="/reviews/:id" render={({ match }) => <Reviews id={match.params.id}/>}></Route>
        <Route exact path="/login" component={Login}/>
        <Route exact path='/logup' component={Logup} />
        <Route exact path='/login/reset' component={ResetPassword} />
        <Route exact path="/login/resetPassword/:token" render={({ match }) => <Confirm id={match.params.id}/>}></Route>
        <Route exact path='/cart' component={ScreenCart} />
        <Route exact path='/cart/addressform' component={AddressForm} />
        <Route exact path='/cart/confirmation' component={Confirmation} />
        <Route exact path='/promotions' component={Promotions} />
        <PrivateRouteCheckout exact path='/cart/checkout' component={Checkout} /> 
        <PrivateRoute exact path="/admin" component={AdminNav} />
        <PrivateRoute exact path="/admin/products" component={AdminProduct} />
        <PrivateRoute exact path="/admin/products/add" component={AdminAddProduct} />
        <PrivateRoute exact path="/admin/products/modify/:id" component={AdminModifyProduct} />
        <PrivateRoute exact path="/admin/categories" component={AdminCategories} />
        <PrivateRoute exact path="/admin/categories/add" component={AdminAddCategory} />
        <PrivateRoute exact path="/admin/users" component={AdminUsers} />
        <PrivateRoute exact path="/admin/categories/:id" component={AdminModifyCategory} />
        <PrivateRoute exact path="/admin/users/:id" component={AdminModifyUser}/>
        <Route path='/profile' component={UserProfile} />
        <Route exact path='/landing' component={Landing} />
        <Route path='*' component={NotFound} />
        
      </Switch>
    </BrowserRouter>
  );
}
// la ruta NotFound siempre tiene que quedar ultima si creas otras otras
export default App;
