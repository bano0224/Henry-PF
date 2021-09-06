import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import s from "./Detail.module.css";
import Navbar from "../NavBar/NavBar";
import getProductById from "../../actions/getProductById";
import productReset from "../../actions/productReset";
import Footer from "../Footer/Footer";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export default function DetailProduct(props) {
  
  const dispatch = useDispatch();
  const productId = useSelector((state) => state.productDetail);
  const [input, setInput] = React.useState('Controlled');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

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
      <div className={s.navbar}>
      <Navbar />
      </div>
      {productId.length !== 0 ? (
        <div className={s.card}>
          <div className={s.title}>
          <h3>{productId?.name}</h3>
          </div>
          <img className={s.image}src={productId.imageUrl} width="100%" height="100%" alt="" />
          <div className={s.info}>
            <h4>{'$' + productId?.price}</h4>
            <h5>{productId?.description}</h5>
          </div>
          <div className={s.valoration}>
      <div>
      </div>
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
        <Link to="/">
        <Button variant="contained" color="primary" style= {{textDecoration: 'none'}} component={Link} to='/'>
        Home
      </Button>
        </Link>
        <Link to="/reviews">
        <Button variant="contained" color="primary" style= {{textDecoration: 'none'}} component={Link} to='/reviews'>
        Review
      </Button>
      </Link>
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}
