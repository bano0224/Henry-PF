import React from "react";
import {
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  Grid,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import accounting from "accounting";
import Cart from "./Cart";
import addToCart from "../../actions/cart/addToCart";
import removeFromCart from "../../actions/cart/removeFromCart";

const Review = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartReducer;
  const getSubtotal = () => {
    return cartItems.reduce(
      (price, item) => price + item.price * parseInt(item.qty),
      0
    );
  };
  const handlerQty = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const handlerRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartItems.length === 0 ? (
          <span>Carrito vacío.</span>
        ) : (
          cartItems.map((item) => (
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-end"
                  spacing={1}
                >
                  <Grid item>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      width="30px"
                      height="30px"
                    />
                  </Grid>
                  <Grid item>
                    <h6>{item.name}</h6>
                  </Grid>
                  <Grid
                    container
                    xs={3}
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                  >
                    <Grid item>
                      <span>${item.price}</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid></Grid>
            </Grid>
          ))
        )}

        <ListItem>
          <ListItemText primary="Total" variant="h6" />
          <Typography variant="h6">
            {accounting.formatMoney(getSubtotal())}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
