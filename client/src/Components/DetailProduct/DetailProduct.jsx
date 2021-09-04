import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import s from "./Detail.module.css";
import Navbar from "../NavBar/NavBar";
import getProductDetail from "../../actions/getProductDetail";

function DetailProduct(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetail(id)); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={s.body4}>
      <Navbar />
      <div className={s.containerdetail}>
        {props.productDetail.length !== 0 ? (
          <div>
            <img
              clasName={s.image}
              src={props.productDetail.imageUrl}
              width="480"
              height="250"
              alt=""
            />
            <div>
              <div>
                <p>Name:</p>
                <p>{props.productDetail.name}</p>
              </div>
              <div></div>
              <div>
                <p>Price</p>
                <p>
                  {props.productDetail.price
                    ? props.productDetail.price
                    : props.productDetail.price
                        .map((price) => price.name)
                        .join(", ")}
                </p>
              </div>
              <div>
                <p>countInStock:</p>
                <p>{props.productDetail.countInStock}</p>
              </div>
              <p>Description:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.productDetail.description,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div>
            <img
              src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif"
              width="300"
              height="200"
              alt="LoadingGif"
              className="loadingGif"
            />
          </div>
        )}
        <div>
          <Link to="home">
            <button className={s.buttonback}>Buy market</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    productDetail: state.productDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProductDetail: (Details) => dispatch(getProductDetail(Details)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
