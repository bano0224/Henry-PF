import React from "react";
import style from "./NavBar.module.css";
import { Link } from 'react-router-dom'


export default function NavBar() {
  return (
    <>
      <nav className={style.menu}>
        <label className={style.logo}>E-Market</label>
        <ul className={style.menu_items}>
          <li className={style.active}>
            <a href="#"></a>
          </li>
          <li>
            <Link to='/admin/products'>
            <a href="#">Administrador</a>     
            </Link>
          </li>
          <li>
            <a href="#">Promociones</a>
          </li>
          <li>
            <a href="#">Sobre Nosotros</a>
          </li>
          <li>
            <Link to='/login'>
            <a href="#">Login</a>     
            </Link>
          </li>
        </ul>
        
        <span className={style.btn_menu}>
          <i className={style.faBars}></i>
        </span>
      </nav>
    </>
  );
}
