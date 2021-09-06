import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import s from "./Detail.module.css";
import Navbar from "../NavBar/NavBar";
import getProductById from "../../actions/getProductById";
import productReset from "../../actions/productReset";
import Footer from "../Footer/Footer";

export default function DetailProduct(props) {
  const dispatch = useDispatch();
  const productId = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(getProductById(props.id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(productReset());
    };
  }, []);

  return (
    <div className={s.body4}>
      <Navbar />
      {productId.length !== 0 ? (
        <div className={s.card}>
          <div className={s.title}>
          <p>Name:</p>
          <p>{productId?.name}</p>
          </div>
          <img className={s.image}src={productId.imageUrl} width="100%" height="100%" alt="" />
          <div className={s.info}>
            <p>Price</p>
            <p>{productId?.price}</p>
            <p>Description:</p>
            <p>{productId?.description}</p>
          </div>
        </div>
      ) : ( 
        <div>
          <img
            src=""
            width="300"
            height="200"
            alt="LoadingGif"
            className="loadingGif"
          />
        </div>
      )}
      <div>
        <Link to="/home">
          <button className={s.buttonback}>Home</button>
        </Link>
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}
