import React from "react";
import { NavLink as Link } from "react-router-dom";
import s from "./NavBar.module.css";
// import Search from "../Search/Search";
//---------NAVBAR--------//

export default function NavBar() {
  return (
    <nav className={s.topnav}>
      <Link to="/">Login</Link>
      <Link to="/ofertas">Ofertas</Link>
      <Link to="/home">Categorias</Link>
      <Link to="/create">Create Product</Link>
    </nav>
  );
}
