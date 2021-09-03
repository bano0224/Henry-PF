import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
// Page Welcome go to home
export default function LandingPage() {
  return (
    <div className={style.s}>
      <NavBar />
      <h2 className={style.text}>Welcome the Supermarket Henry</h2>
      <div className={style.setdirection}>
        <Link to="/home">
          <button className={style.button}>GO SHOPPING</button>
        </Link>
      </div>
    </div>
  );
}
