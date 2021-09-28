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
    };

  return (
    <Grid container xs={12}>
        <Grid item xs={12}>
            <NavBar />
        </Grid>
        <Grid item xs={12}>  
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
                <Typography variant="h3" className={classes.h1}>Detalles del carrito</Typography>
                <br />
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs={8}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="cart"
                            >
                                <Typography className={classes.heading} id="cart">Carrito</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
                                                handlerRemove={handlerRemove}
                                                />
                                                <Divider />
                                            </>
                                        ))
                                    )
                                } 
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.total}>
                            <Grid container direction='column' justifyContent='space-between' alignItems='flex-start' className={classes.total}>
                                <Grid item>
                                    <h6>Detalle de compra</h6>
                                </Grid>
                                <Grid item>
                                    <Divider />
                                    <span className={classes.topay}> TOTAL A PAGAR: </span><span>{accounting.formatMoney(getSubtotal())}</span>
                                </Grid>
                                <div style={{display: "flex-end", justifyContent:"space-between", marginTop:"1rem", }} >
                                    {
                                        cartItems?.length
                                        ? (
                                            <div>
                                                <Button type="submit" variant="contained" color="secondary" component={Link} to="/cart/checkout" id='button'>Ir a pagar!</Button>
                                                <Button onClick={handleClickMP} variant='contained' color='primary'>Mercadopago</Button>
                                            </div>
                                        )
                                        : <Button type="submit" disabled variant="contained" color="secondary" component={Link} to="/cart/checkout" id='button'>Ir a pagar!</Button>
                                    }
                                </div>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grid>


    </Grid>

);
}
