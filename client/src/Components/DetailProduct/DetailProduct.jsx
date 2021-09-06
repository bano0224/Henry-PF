import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import s from "./Detail.module.css";
import Navbar from "../NavBar/NavBar";
import getProductById from '../../actions/getProductById'
import productReset from '../../actions/productReset'

export default function DetailProduct(props) {
  console.log(props)
  const dispatch = useDispatch();
  const productId = useSelector(state => state.productDetail)
  const product=productId[0];

  useEffect(() => {
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
              src={product?.imageUrl}
              width="100%"
              height="100%"
              alt=""
            />
            <div>
              <div>
                <p>Name:</p>
                <p>{product?.name}</p>
              </div>
              <div></div>
              <div>
                <p>Price</p>
                <p>
                  {product?.price}
                </p>
              </div>
              <div>
                <p>countInStock:</p>
                <p>{product?.countInStock}</p>
              </div>
              <p>Description:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.description,
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
    </div>
  );
}
