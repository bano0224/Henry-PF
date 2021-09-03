import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import {connect} from 'react-redux';
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
import Cards from "../Cards/Cards";
import getProducts from "../../actions/getProducts";
import Paginado from '../Pagination/Pagination';



export default function Home() {
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


