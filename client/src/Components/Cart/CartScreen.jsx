import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../NavBar/NavBar";
import addToCart from "../../actions/cart/addToCart";
import removeFromCart from "../../actions/cart/removeFromCart";
import { Link } from "react-router-dom";
import {
  Grid,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import mercadopagoPayment from '../../actions/cart/mercadopagoPayment';
import accounting from "accounting";
import productStock from '../../actions/productStock'


//Style
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "1.3em",
    fontWeight: "500",
    fontFamily: "Raleway",
  },
  h1: {
    fontFamily: "Raleway",
  },
  icon: {
    color: "firebrick",
  },
  total: {
    padding: "5px",
    minHeight: "300px",
  },
  topay: {
    fontWeight: "700",
  },
}));

export default function CartScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartReducer;
  const productReducer = useSelector((state) => state.productReducer);
  const { login } = productReducer;

  const handlerRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const getSubtotal = () => {
    return cartItems.reduce(
      (price, item) => price + item.price * parseInt(item.qty),
      0
    );
  };
  const handleClickMP = () => {
    dispatch(mercadopagoPayment(cartItems))
  }

  const handlerQty= (id, qty)=>{
    dispatch(addToCart(id,qty))
}
    return (
        <Grid container xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>  
                <br />
                <Container>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="secondary" to="/" id='bread'>
                        <HomeIcon className={classes.icon} />
                            Home
                        </Link>
                        <Typography color="textPrimary">Carrito</Typography>
                    </Breadcrumbs>
                    <br />
                    {/* <Typography variant="h3" className={classes.h1}>Detalles del carrito</Typography> */}
                    <br />
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                            <Accordion Expanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="cart"
                                >
                                    <Typography className={classes.heading} id="cart">Detalles del carrito <ShoppingCartIcon/></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Paper className={classes.total}>
                                    <Grid container direction='column' spacing={2}>
                                    {
                                        cartItems.length === 0 
                                        ?(
                                            <span>
                                                Carrito vacío.
                                            </span>
                                        )
                                        :(
                                            cartItems.map(item=>(
                                               
                                                <>
                                                    <Cart
                                                    key={item._id}
                                                    item={item}
                                                    handlerQty= {handlerQty}
                                                    handlerRemove={handlerRemove} 
                                                    />
                                                    <Divider />
                                                </>
                                            ))
                                        )}
                                    </Grid>
                                  </Paper>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid>
                        {cartItems?.length
                                        ? (
                                            <div>
                                                <Button type="submit" variant="contained" color="secondary" component={Link} to="/cart/checkout" id='button'>Ir a pagar!</Button>
                                                <Button onClick={handleClickMP} variant='contained' color='primary'>Mercadopago</Button>
                                            </div>
                                        )
                                        :
                                         <Button type="submit" disabled variant="contained" color="secondary" component={Link} to="/cart/checkout" id='button'>Ir a pagar!</Button>
                                      }
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
    </Grid>

);
}