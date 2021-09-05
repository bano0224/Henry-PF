import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getProducts from "../../actions/getProducts";
import delFromShoppingCart from '../../actions/deleteFromShoppingCart'
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import style from "./Cards.module.css";



export default function Cards({currentProducts}) {
  const dispatch = useDispatch();
  const lengthProd = currentProducts.length
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function handleDelete () {
    dispatch(delFromShoppingCart())
  }

  return (
    <div className={style.cardsContainer}>
      {currentProducts?.map((product, index) => (
        <Link>
          <div key={index}>
            <button onClick={handleDelete}>X</button>
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
