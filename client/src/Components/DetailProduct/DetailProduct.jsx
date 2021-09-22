import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Detail.css";
import Navbar from "../NavBar/NavBar";
import getProductById from "../../actions/getProductById";
import productReset from "../../actions/productReset";
import addToCart from "../../actions/cart/addToCart";
import StarIcon from '@material-ui/icons/Star';
import { yellow } from "@material-ui/core/colors";
import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Typography, Breadcrumbs} from '@material-ui/core';
import { List, ListItem} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home'
import getReviews from "../../actions/getReviews";


export default function DetailProduct({name, image, description, price, id}) {
  
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer);
  const {productDetail, productReviews} = productReducer
  
  const [input, setInput] = React.useState('Controlled');
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getReviews())
  }, []);

  useEffect(() => {
    return () => {
      dispatch(productReset());
    };
  }, []);

  const handleCart = () => {
    dispatch(addToCart(id, qty))
    alert("El producto a sido agregado al carrito");
  }
 
  return (
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
        <div className="productscreen">
      
      {productDetail.length !== 0 ? (
                <>
                <div className="productscreen__left">
                  <div className="left__image">
                    <img src={productDetail.imageUrl} alt={productDetail.name} />
                  </div>
                  <div className="left__info">
                    <p className="left__name">{productDetail.name}</p>
                    <p>Precio: ${productDetail.price}</p>
                    <p>Descripcion: {productDetail.description}</p>
                  
                    <Accordion defaultExpanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="cart"
                                >
                                    <Typography>Ver reseñas</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction='column' spacing={1}>
                                    { 
                                      <List>
                                      {
                                      productReviews.filter(e => e.product[0]?._id === id).map(r => (
                                      <ListItem className="right__info1">
                                        <div className="reseña">{r.name}</div>
                                        <p>
                                        <div>{r.comment} {/* {`${r.rating}`}<StarIcon style={{ color: yellow[500]}}sx={{ fontSize: 40 }}  />*/}</div>
                                        <div className="star">{r.rating}<StarIcon style={{ color: yellow[500]}} /></div>
                                        </p>
                                      </ListItem> 
                                      ))}
                                    </List>
                                    } 
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                  </div>
                </div>
                <div className="productscreen__right">
                  <div className="right__info">
                    <p>
                      Estado:
                      <span>
                        {productDetail.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </p>
                    <p>
                      Cantidad
                      <select value={qty} onChange={(e) => setQty(e.target.value)}>
                        {[...Array(productDetail.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </p>
                    <p>
                      Subtotal:
                      <span>${productDetail.price * qty}</span>
                    </p>
                    <p>
                      <button type="button" onClick={handleCart}>
                        Añadir al Carrito 
                      </button>
                    </p>
                    <p>
                      <Link to={`/reviews/${id}`} className="info__button">
                        Reseña <StarIcon style={{ color: yellow[500]}} />
                      </Link>
                    <br></br>
                      <Link to={`/`} className="info__button">
                        Home <HomeIcon style={{ color: blueGrey[50]}} style={{ borderColor: blueGrey[500] }}/>
                      </Link>
                    </p>
                  </div>
                </div>
              </>
      ) : ( 
        <div>
          <img
            src="https://www.dlcc.com.pe/images/loading.gif"
            width="550"
            height="350"
            alt="LoadingGif"
            className="loadingGif"
          />
        </div>
      )}
    </div>
        </Grid>
      </Grid>
   
    
    
  );
}