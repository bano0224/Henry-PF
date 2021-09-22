import React from "react";
import Card from "../Card/Card";
/* import style from "./Cards.module.css"; */

const useStyles = makeStyles((theme) => ({
  gridContainer: {
      paddingLeft: '30px',
      paddingRight: '30px'
  }
}));


export default function Cards({currentProducts}) {
  return (
    <Grid container spacing={4} className={classes.gridContainer} justify="center" >
      {currentProducts?.map((product, index) => (
        
              <Grid item xs={12} sm={6} md={4} lg={4} >
                <div key={index}>
                      <Card
                        name={product.name}
                        image={product.imageUrl}
                        id={product._id}
                        description={product.description}
                        price= {product.price}
                        stock={product.countInStock}
                        discount={product.discount}
                      />
                </div>
              </Grid>
      ))}
    </Grid>
  );
}
