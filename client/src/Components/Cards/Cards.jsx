import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getProducts from "../../actions/getProducts";

import Card from "../Card/Card";
import style from "./Cards.module.css";




export default function Cards({currentProducts}) {
  const dispatch = useDispatch();
  console.log('CURRENT', currentProducts)
  
  const lengthProd = currentProducts.length
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /* function handleDelete () {
    dispatch(DelFromCart())
  } */
/*   function handleUp () {
    dispatch(AddToCart())
  } */

  return (

    <div className={style.cardsContainer}>
      {currentProducts?.map((product, index) => (
          <div key={index}>
            {
              <Card
                name={product.name}
                image={product.imageUrl}
                stock={product.countInStock}
                id={product._id}
                description={product.description}
                price= {product.price}
              />
            }   
          </div>
                
      ))}
    </div>
  );
}
