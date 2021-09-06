import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import s from "./Detail.module.css";
import Navbar from "../NavBar/NavBar";
import getProductById from '../../actions/getProductById'
import productReset from '../../actions/productReset'
import Footer from '../Footer/Footer';

export default function DetailProduct(props) {
  
  const dispatch = useDispatch();
  const productId = useSelector(state => state.productDetail)

  useEffect(() => {
    console.log('EFFECT')
    dispatch(getProductById(props.id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(productReset())
    }
  },[])

  return (
    <div className={s.body4}>
      <Navbar />
      <div className={s.containerdetail}>
        {productId.length !== 0 ? (
          <div>
            <img
              clasName={s.image}
              src={productId.imageUrl}
              width="100%"
              height="100%"
              alt=""
            />
            <div>
              <div>
                <p>Name:</p>
                <p>{productId?.name}</p>
              </div>
              <div></div>
              <div>
                <p>Price</p>
                <p>
                  {productId?.price}
                </p>
              </div>
              <div>
                <p>countInStock:</p>
                <p>{productId?.countInStock}</p>
              </div>
              <p>Description:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: productId?.description,
                }}
              ></div>
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
      </div>
      <div classNme={s.footer}>
      <Footer />
      </div>
    </div>
  );
}
