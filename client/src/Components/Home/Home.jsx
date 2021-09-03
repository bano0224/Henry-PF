import React from "react";
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
import Cards from "../Cards/Cards";

function Home() {
  return (
    <div className={s.body3}>
      <NavBar />
      <Cards />
      <div>
        <h1> Hello Home InProgress</h1>
      </div>
      <p>Aca van los productos</p>
    </div>
  );
}

export default Home;
