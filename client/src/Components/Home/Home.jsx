import React from "react";
import NavBar from "../NavBar/NavBar";
// import { NavLink } from 'react-router-dom';
// import {Link } from 'react-router-dom';
import s from "./Home.module.css";

function Home() { 
    return (
        <div className= {s.body3}>
           <NavBar/>
            <h1> Hello Home InProgress</h1>
           
        </div>
    )
}

export default Home;
