import React from "react";
import style from "./NavBar.module.css";


export default function NavBar() {
  return (
    <>
      <nav className={style.menu}>
        <label className={style.logo}>Supermarket Henry</label>
        <ul className={style.menu_items}>
          <li className={style.active}>
            <a href="#"></a>
          </li>
          <li>
            <a href="#">Destacados</a>
          </li>
          <li>
            <a href="#">Promociones</a>
          </li>
          <li>
            <a href="#">Sobre Nosotros</a>
          </li>
        </ul>
        <span className={style.btn_menu}>
          <i className={style.faBars}></i>
        </span>
      </nav>
    </>
  );
}
