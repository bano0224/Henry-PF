import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Detail.css";
import Navbar from "../NavBar/NavBar";
import getProductById from "../../actions/getProductById";
import getUserById from "../../actions/users/getUserById";
import getOrderByUser from "../../actions/order/getOrderByUser";
import productReset from "../../actions/productReset";
import addToCart from "../../actions/cart/addToCart";
import StarIcon from '@material-ui/icons/Star';
import { yellow } from "@material-ui/core/colors";
import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Typography, Breadcrumbs } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import getReviews from "../../actions/getReviews";
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';
import { List, ListItem} from '@mui/material';

export default function DetailProduct({name, image, description, price, id}) {
  
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer);
  const {productDetail, productReviews, userDetail, orderByUser} = productReducer

  const prod = orderByUser.map(o => o.products.map(p => p._id)).flat()
  
  const rev = productReviews?.filter(r => r.product[0]._id === productDetail._id)
  


  
  const inc = prod?.includes(productDetail._id)
 

  const [input, setInput] = React.useState('Controlled');
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const key = JSON.parse(sessionStorage.getItem("token"))?.token
  if(key){
      var decoded = jwt.verify(key, 'secret')
  }
  const inc2 = rev.map(r => r.user[0]?.includes(decoded?.id))
  console.log("REEEEVVV",rev)
  console.log("INCCCC2", inc2)


  useEffect(() => {
    dispatch(getReviews())
}, [])

  useEffect(() => {
      dispatch(getUserById(decoded?.id))
  }, [])

  useEffect(() => {
      dispatch(getOrderByUser(userDetail?._id))
  }, [])

  useEffect(() => {
    dispatch(getProductById(id));
    
  }, []);

  useEffect(() => {
    return () => {
      dispatch(productReset());
    };
  }, []);

 /*  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getReviews())
  }, []);

  useEffect(() => {
    dispatch(getOrderByUser(userDetail?._id))
}, [])

useEffect(() => {
  dispatch(getProductById(id));
  
}, []);

  useEffect(() => {
    return () => {
      dispatch(productReset());
    };
  }, []);
 */
  const handleCart = () => {
    dispatch(addToCart(id, qty))
    
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'El producto ha sido añadido al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }
 
  return (
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
        <div className="productscreen">
      
      {productDetail.length !== 0 && rev.length !== 0 || rev!== undefined? (
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
                                    <Typography /* className={classes.heading} */>Ver reseñas</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Grid container direction='column' spacing={1}>
                                    {
                                      <List>
                                      {
                                      productReviews.filter(e => e.product[0]?._id === id).map(r => (
                                      <ListItem className="right__info1">
                                        <div className="reseña">{r.name}</div>
                                        <div className="reseña1">
                                        <div>{r.comment} </div>
                                        <div className="star">{r.rating}<StarIcon style={{ color: yellow[500]}} /></div>
                                        </div>
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
                    {decoded && inc && inc2[0] !== true ?
                    <p>
                      <Link to={`/reviews/${id}`} className="info__button">
                        Reseña <StarIcon style={{ color: yellow[500]}} />
                      </Link>
                    </p>:null
                      }
                     <p> 
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
{/*           <div>
                  <Link to="/">
                  <Button variant="contained" color="secondary" style= {{textDecoration: 'none'}} component={Link} to='/'>
                  Home
                </Button>
                  </Link>
          </div> */}
        </div>
      )}

      {/* <div className={s.footer}>
        <Footer />
      </div> */}
    </div>
        </Grid>
      </Grid>
   
    
    
  );
}