import React from "react";
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import Footer from '../Footer/Footer'

export default function Home() {
  return (
    <div className={s.body3}>
      <div className={s.navBar}>
        <NavBar />
      </div>
      <div className={s.bodyCards}>
        <Cards />
      </div>
      <div>
        <Pagination />
      </div>
      <Footer/>
    </div>
  );
}
