import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Review from './Review'
import {Typography, Grid, Divider, Button} from '@material-ui/core';
import { Elements, CardElement, useStripe,useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import addToCart from '../../actions/cart/addToCart';
import removeFromCart from '../../actions/cart/removeFromCart';
import {useSelector, useDispatch} from 'react-redux';
import accounting from "accounting";
import axios from 'axios';

const stripePromise =loadStripe("pk_test_51JYn4nDpSNCyvuRiS1bLRUqB7fT8XFxMovwZoNYQM1xVN9jyp3slDkoNGXhcupYkbr3Ph3oPNZHqHK4CaiR8tO4k00o7uKPlg7");
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
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const cartReducer = useSelector(state => state.cartReducer)
    const {cartItems} = cartReducer
    const getSubtotal=()=>{
        return  cartItems
                .reduce((price,item)=> price + item.price * parseInt(item.qty), 0)
        }
    const stripe = useStripe(); 
    const elements = useElements();    
    
    // let axiosConfig = {
    //     headers: {
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         "Access-Control-Allow-Origin": "*",
    //     }
    //   };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setProcessing(true);
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
                // elements.getElement(CardElement).clear();
                // nextStep();   
                
                    }catch(error){
                        console.log(error)
                    } 
              }

            

        
    }    
    return( 
        <>  
        <form onSubmit={handleSubmit}>
            <CardElement options={CARD_ELEMENTS_OPTIONS}/>
            <div style={{display: "flex", justifyContent:"space-between", marginTop:"1rem"}}>
            <Button variant='outlined' onClick={backStep}>Back</Button>
            <Button disabled={false} variant='contained' color='primary' type='submit'>`Pay ${accounting.formatMoney(getSubtotal())}`</Button>
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
        Payment method      
      </Typography> 
      <Elements stripe={stripePromise}>
        <CheckoutForm nextStep={nextStep} backStep={backStep}/>
      </Elements>
    </React.Fragment>
  );
}

