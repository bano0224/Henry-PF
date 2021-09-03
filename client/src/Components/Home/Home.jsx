import React from "react";
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
<<<<<<< HEAD
import Cards from "../Cards/Cards";
// import Pagination from '../pagination/Pagination';



=======
import ProductCard from "../Card/Card";
>>>>>>> Dev
function Home() {
  return (
    <div className={s.body3}>
      <NavBar />
<<<<<<< HEAD
      <Cards />
=======
      <ProductCard />
>>>>>>> Dev
      <div>
        <h1> Hello Home InProgress</h1>
      </div>
      <p>Aca van los productos</p>
    </div>
  );
}

export default Home;
