import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getProducts from "../../actions/getProducts";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import style from "./Cards.module.css";




export default function Cards({currentProducts}) {
  const dispatch = useDispatch();
  
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
         <Link to={`/detail/${product._id}`} className={style.link}>
          <div key={index}>
            {/* <button onClick={handleDelete}>X</button> */}
            {
              <Card
                name={product.name}
                image={product.imageUrl}
                id={product._id}
                description={product.description}
                price= {product.price}/* en la card => ${price}.00 x {quantity} = ${price * quantity}.00 */
              />
            }
{/*             {<button onClick={AddToCart}>Agregar</button>}
 */}          </div>
        </Link>
                
      ))}
    </div>
  );
}
