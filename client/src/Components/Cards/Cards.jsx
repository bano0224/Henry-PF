import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";




export default function Cards({currentProducts}) {
  
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
                discount={product.discount}
              />
            }   
          </div>
                
      ))}
    </div>
  );
}
