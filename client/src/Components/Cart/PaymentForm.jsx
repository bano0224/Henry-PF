import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import swal from "sweetalert";
import productStock from '../../actions/productStock';

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
    const history = useHistory();
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const cartReducer = useSelector(state => state.cartReducer)
    const {cartItems} = cartReducer
    console.log('ESTE ES EL CARRITO', cartItems)
    const getSubtotal=()=>{
        return  cartItems
                .reduce((price,item)=> price + item.price * parseInt(item.qty), 0)
        }
    const stripe = useStripe(); 
    const elements = useElements();    
    
    /* const filterIdQty = [] */
    
    const filterIdQty = cartItems.map(p => ({
            productId:p._id,
            productQty: p.qty
        })
    )

    console.log('A VER SI FUNCIONA',filterIdQty)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setProcessing(true);
        // devuelve error y paymethod
        const {error, paymentMethod}= await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)  
        })
    
            if(error){
                setError(`Payment failed ${error.message}`);
                setProcessing(false);
                
            }else {
                const { id } = paymentMethod;
                try{
                const { data } = await axios.post("http://localhost:5000/checkout/create",
                    {  id: id, amount: getSubtotal(),  } );
                
                setError(null);
                setProcessing(false);
                setSucceeded(true);
                dispatch(productStock(filterIdQty))
                /* if(data == 'succeeded') {
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
                } */
                // elements.getElement(CardElement).clear();
                // nextStep();   
                
                    }catch(error){
                        console.log(error)
                    } 
              }
    }    

    /* const handleStock = (e) => {
        console.log('ESTE ES EL EVENTO',e)
        e.preventDefault()
        dispatch(productStock(e))
    } */
        
      

    return( 
        <>  
        <form onSubmit={handleSubmit}>
            <CardElement options={CARD_ELEMENTS_OPTIONS}/>
            <div style={{display: "flex", justifyContent:"space-between", marginTop:"1rem"}}>
            <Button variant='outlined' onClick={backStep}>Back</Button>
            <Button /* onClick={(e) => handleStock(e)} */ disabled={false} variant='contained' color='secondary' type='submit'>{`Pay ${accounting.formatMoney(getSubtotal())}`}</Button>
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

