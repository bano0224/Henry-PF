import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cart from './Cart';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar/NavBar';
import addToCart from '../../actions/cart/addToCart';
import removeFromCart from '../../actions/cart/removeFromCart';
import { Link } from 'react-router-dom';
import { Grid, Container, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Typography, Breadcrumbs } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button';
import accounting from "accounting";
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//Style
const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
      },
      heading: {
        fontSize: '1.3em',
        fontWeight: '500',
        fontFamily: 'Raleway',
      },
      h1: {
        fontFamily: 'Raleway',
        fontSize: '120%'
      },
      icon: {
        color: 'firebrick'
      },
      total: {
          padding: '5px',
          minHeight: '100px'
      },
      topay: {
          fontWeight: '700'
      }
}));

export default function CartScreen() {
    const classes = useStyles();
    const dispatch= useDispatch()
    const cartReducer = useSelector(state => state.cartReducer)
    const {cartItems} = cartReducer
    const productReducer = useSelector(state => state.productReducer)
    const { login } = productReducer
    
    const handlerQty= (id, qty)=>{
        dispatch(addToCart(id,qty))
    }

    const handlerRemove = (id)=>{
        dispatch(removeFromCart(id))
    }
    const getSubtotal=()=>{
    return  cartItems
            .reduce((price,item)=> price + item.price * parseInt(item.qty), 0)
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
                                        )
                                    } 
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            {/* <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>2. Detalles de envío</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        login
                                        ? <p>Estas logueado bro</p>
                                        : <p> No estas logueado bro </p>
                                    }
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                    >
                                    <Typography className={classes.heading}>3. Detalles de pago</Typography>
                                </AccordionSummary>
                            </Accordion> */}
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Paper className={classes.total}>
                                <Grid container direction='column' justifyContent='space-between' alignItems='flex-start' className={classes.total}>
                                    {/* <Grid item>
                                        <h6>Detalle de compra</h6>
                                    </Grid> */}
                                    <Grid item>
                                        <Divider />
                                        <span className={classes.topay}> TOTAL A PAGAR: </span><span>{accounting.formatMoney(getSubtotal())}</span>

                                    </Grid>
                                    {/* <Grid style={flexDirection:"row-reverse"} >
                                        <Button type="submit" variant="contained" color="secondary" component={Link} to="/cart/checkout" id='button'>Ir a pagar!</Button>
                                    </Grid> */}
                                    <Box
                                        sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        bgcolor: 'background.paper',
                                        }}
                                    >
                                        <Button type="submit" variant="contained" color="secondary" component={Link} to="/cart/checkout" id='button'>Ir a pagar!</Button>
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}


// export default function SimpleAccordion() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography className={classes.heading}>Accordion 1</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2a-content"
//           id="panel2a-header"
//         >
//           <Typography className={classes.heading}>Accordion 2</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion disabled>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3a-content"
//           id="panel3a-header"
//         >
//           <Typography className={classes.heading}>Disabled Accordion</Typography>
//         </AccordionSummary>
//       </Accordion>
//     </div>
//   );
// }