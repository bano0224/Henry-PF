import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getProducts from "../../actions/getProducts";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards({currentProducts}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={style.cardsContainer}>
      {currentProducts?.map((product, index) => (
        <Link>
          <div key={index}>
            {
              <Card
                name={product.name}
                image={product.imageUrl}
                description={product.description}
                price= {product.price}
              />
            }
          </div>
        </Link>
      ))}
    </div>
  );
}
