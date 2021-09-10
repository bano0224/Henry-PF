import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cart from './Cart';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar/NavBar';
import addToCart from '../../actions/cart/addToCart';
import removeFromCart from '../../actions/cart/removeFromCart';
import { Link } from 'react-router-dom';
import { Grid, Container, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Breadcrumbs } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home'


//Style

const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: 'Raleway',
      },
      h1: {
        fontFamily: 'Raleway'
      }
}));

export default function CartScreen() {
    const classes = useStyles();
    const dispatch= useDispatch()
    const cartReducer = useSelector(state => state.cartReducer)
    const {cartItems} = cartReducer
    
    const handlerQty= (id, qty)=>{
        dispatch(addToCart(id,qty))
    }

    const handlerRemove = (id)=>{
        dispatch(removeFromCart(id))
    }
    const getSubtotal=()=>{
    return  cartItems
            .reduce((price,item)=> price + item.price * item.qty, 0)
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12}>  
                <br />
                <Container>
                    <Breadcrumbs aria-label="breadcrumb" id='bread'>
                        <Link color="secondary" to="/" >
                        <HomeIcon className={classes.icon} />
                            Home
                        </Link>
                        <Typography color="textPrimary">Cart</Typography>
                    </Breadcrumbs>
                    <br />
                    <Typography variant="h3" className={classes.h1}>Shopping Cart</Typography>
                    <br />
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={8}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="cart"
                                >
                                    <Typography className={classes.heading}>1. Cart</Typography>
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
                                               
                                                <Cart
                                                key={item._id}
                                                item={item}
                                                handlerQty= {handlerQty}
                                                handlerRemove={handlerRemove} 
                                                />
                                            ))
                                        )
                                    } 
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>2. Order Address</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                    >
                                    <Typography className={classes.heading}>3. Payment</Typography>
                                </AccordionSummary>
                            </Accordion>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper>
                                <p> Subtotal </p>
                                <p> ${getSubtotal()} </p>
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