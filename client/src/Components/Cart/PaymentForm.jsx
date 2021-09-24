import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Review from './Review'
import {Typography, Grid, Divider, Button, CircularProgress, Box} from '@material-ui/core';
import { Elements, CardElement, useStripe,useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import addToCart from '../../actions/cart/addToCart';
import removeFromCart from '../../actions/cart/removeFromCart';
import {useSelector, useDispatch} from 'react-redux';
import accounting from "accounting";
import axios from 'axios';
import swal from "sweetalert";
import createOrder from '../../actions/cart/createOrder';
import jwt from 'jsonwebtoken'
import resetCart from '../../actions/cart/resetCart';
import productStock from '../../actions/productStock'
import sendEmailCheckout from '../../actions/sendEmailCheckout';


const stripePromise =loadStripe("pk_test_51JZ13AKV5aJajepC284bJWxY2ksDWhgQBElxV4COBEA4UFAsqXW8lhpov6Z8SbmhRKmJWM7gtN7UqOtXU2MRZ0Vr00Ea4uoGkh");
const CARD_ELEMENTS_OPTIONS={
    iconStyle: "solid",
    hidePostalCode: true,
    style:{
        base:{
            iconColor:"rgb(240,57,122)",
            color:"#333",
            fontSize: "18px",
            "::placeholder":{
            color:"#ccc",
            },
        },
        invalid:{
            color:"#e5424d",
            ":focus":{
                color:"#303238",
            },
        },
    },
};
const CheckoutForm =({backStep, nextStep})=>{
    const dispatch = useDispatch()
    const history = useHistory();
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const cartReducer = useSelector(state => state.cartReducer)
    const {cartItems} = cartReducer
    


    console.log('ESTOS SON LOS ITEMS DEL CARRITO',cartItems)
    const getSubtotal=()=>{
        return  cartItems
                .reduce((price,item)=> price + item.price * parseInt(item.qty), 0)
        }
        let items = cartItems.map(item=>({
            name: item.name,
            price: item.price,
            qty: item.qty
        }));

    const stripe = useStripe(); 
    const elements = useElements();    
    const {shippingData} = cartReducer
    const key = JSON.parse(sessionStorage.getItem("token"))?.token
    if(key){
    const decoded = jwt.verify(key, 'secret')
    var id = (decoded.id)
    }

    const order = {
        address1: shippingData.address1,
        city: shippingData.city,
        postCode: shippingData.postCode,
        user: id,
        products: cartItems,
        totalPrice: getSubtotal(),
    }

    useEffect(() => {
        return () => dispatch(resetCart())
    },[])

    // let axiosConfig = {
    //     headers: {
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         "Access-Control-Allow-Origin": "*",
    //     }
    //   };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setProcessing(true);
        dispatch(sendEmailCheckout(id))
        dispatch(createOrder(order)) 
        dispatch(productStock(cartItems))


        // devuelve error y paymethod
        const {error, paymentMethod}= await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)  
        } )
    
            if(error){
                setError(`Payment failed ${error.message}`);
                setProcessing(false);
                
            }else {
                const { id } = paymentMethod;
                try{
                const { data } = await axios.post("http://localhost:5000/checkout/create",
                    {  id: id, amount: getSubtotal(),  } );
                    console.log(data)
                
                setError(null);
                setProcessing(false);
                setSucceeded(true);
                
                if(data == 'succeeded') {
                swal({
                    title: "Tu pago fue realizado con éxito",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                  });
            
                  setTimeout(() => {
                    history.push("/cart/confirmation");
                  }, 3500);

                } else {
                    swal({
                        title: "Tu pago fue rechazado",
                        icon: "error",
                        buttons: false,
                        timer: 3000,
                      });
                }
                // elements.getElement(CardElement).clear();
                // nextStep();   
                
                    }catch(error){
                        console.log(error)
                    } 
              }
                // Envio de facutura
                const data2 = await axios.post("http://localhost:5000/checkout/sendMail",
                { firstName: shippingData.firstName,lastName: shippingData.lastName,
                address1: shippingData.address1, email:shippingData.email,
                amount: getSubtotal(), items:items} )

    }    

    
                          

    return( 
        <>  
        <form onSubmit={handleSubmit}>
            <CardElement options={CARD_ELEMENTS_OPTIONS}/>
            <div style={{display: "flex", justifyContent:"space-between", marginTop:"1rem"}}>
            <Button variant='outlined' onClick={backStep}>Back</Button>
            {
                processing
                ? <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : <Button /* component={Link} to="/cart/confirmation" */ disabled={false} variant='contained' color='secondary' type='submit'>{`Pagar ${accounting.formatMoney(getSubtotal())}`}</Button>
            }
            
            </div>
        </form>
        </> 
    )  
}
export default function PaymentForm({backStep, nextStep}) {
  return (
    <React.Fragment>

      <Review/>
      <Divider/> 
      <Typography variant="h6"style={{margin:"20px 0"}} gutterBottom>
        Método de pago      
      </Typography> 
      <Elements stripe={stripePromise}>
        <CheckoutForm nextStep={nextStep} backStep={backStep}/>
      </Elements>
    </React.Fragment>
  );
}



