import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getProducts from "../../actions/getProducts";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from "../Card/Card";
/* import style from "./Cards.module.css"; */

const useStyles = makeStyles((theme) => ({
  gridContainer: {
      paddingLeft: '30px',
      paddingRight: '30px'
  }
}));


export default function Cards({currentProducts}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  
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

    <Grid container spacing={4} className={classes.gridContainer} justify="center">
      {currentProducts?.map((product, index) => (
        
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <div key={index}>
                      <Card
                        name={product.name}
                        image={product.imageUrl}
                        id={product._id}
                        description={product.description}
                        price= {product.price}
                      />
                </div>
              </Grid>
      ))}
    </Grid>
  );
}
{/* <div className={style.cardsContainer}>
{currentProducts?.map((product, index) => (
    <div key={index}>
      {
        <Card
          name={product.name}
          image={product.imageUrl}
          id={product._id}
          description={product.description}
          price= {product.price}
        />
      }       
    </div>
          
))}
</div> */}