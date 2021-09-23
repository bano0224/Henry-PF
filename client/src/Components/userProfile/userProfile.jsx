import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { Grid } from "@material-ui/core";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import getOrderByUser from "../../actions/order/getOrderByUser";
import jwt from "jsonwebtoken";
import getUserById from "../../actions/users/getUserById";
import OrderItem from "./OrderItem";
import Swal from "sweetalert2";
import setSubscription from "../../actions/users/setSubscription";

//Style
const useStyles = makeStyles((theme) => ({
  name: {
    textTransform: "capitalize",
  },
}));

export default function UserProfile(props) {
  const classes = useStyles();
  const productReducer = useSelector((state) => state.productReducer);
  const { userDetail, orderByUser } = productReducer;
  const dispatch = useDispatch();

  //TOKEN
  const key = JSON.parse(sessionStorage.getItem("token"))?.token;
  if (key) {
    var decoded = jwt.verify(key, "secret");
  }

  useEffect(() => {
    dispatch(getUserById(decoded.id));
  }, []);

  useEffect(() => {
    dispatch(getOrderByUser(userDetail?._id));
  }, [userDetail]);

if(userDetail.subscription === false) {
    Swal.fire({
        title: "Hey! No te cuelgues!",
        text: "¿Querés recibir las últimas ofertas y promociones?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero subscribirme!",
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch(setSubscription(decoded.id))
          Swal.fire("Te vamos a estar informando las últimas novedades");
        }
      })
}

  return (
    <>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <NavBar />
          <br />
        </Grid>
        <Grid container xs={12} justifyContent="center" alignItems="center">
          <Grid container item direction="column" xs={10}>
            <Grid item xs={12}>
              <h1
                className={classes.name}
              >{`${userDetail.firstName} ${userDetail.lastName}`}</h1>
            </Grid>
            <hr />
            <Grid item xs={12}>
              <h5>Ordenes:</h5>
              {orderByUser?.map((o) => {
                return (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="cart"
                    >
                      <Typography className={classes.heading} id="cart">
                        Orden #{o._id}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container direction="column" spacing={2}>
                        {o.products?.map((product) => (
                          <>
                            <OrderItem product={product} />
                          </>
                        ))}
                        <Divider />
                        <Grid
                          container
                          justifyContent="flex-end"
                          alignItems="center"
                          className={classes.container}
                        >
                          <Grid
                            container
                            xs={3}
                            justifyContent="space-around"
                            alignItems="center"
                            direction="row"
                          >
                            <Grid item>
                              <span>Total</span>
                            </Grid>
                            <Grid item>
                              <span>{`$${o.products
                                ?.map((p) => p.price)
                                .reduce((a, b) => a + b)}`}</span>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
