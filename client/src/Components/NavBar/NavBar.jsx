import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";
// import Search from "../Search/Search";
//---------NAVBAR--------//

export default function NavBar() {
  return (
    <div className={s.navBar}>
      <ul className={s.ulNav}>
        <li>
          <NavLink className={s.text} exact to="/CATEGORIAS">
            CATEGORIAS
          </NavLink>
          
          <NavLink className={s.text} exact to="/OFERTAS">
            OFERTAS
          </NavLink>
          <NavLink className={s.text} exact to="/LOGIN">
            LOGIN
          </NavLink>
        </li>
        <li>{/* <Search /> */}</li>
      </ul>
    </div>
  );
}
