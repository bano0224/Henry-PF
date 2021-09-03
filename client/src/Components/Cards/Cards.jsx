import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getProducts from "../../actions/getProducts";
import Card from "../Card/Card";

const allProducts = useSelector((state) => state.products);
const dispatch = useDispatch();

export default function Cards() {
  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  return (
    <div className={style.cardsContainer}>
      {allProducts?.map((product, index) => (
        <Link>
          <div key={index}>
            {
              <Card
                name={product.name}
                image={product.imageUrl}
                description={product.description}
                price={product.price}
              />
            }
          </div>
        </Link>
      ))}
    </div>
  );
}
