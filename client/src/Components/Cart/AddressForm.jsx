import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useForm, FormProvider } from 'react-hook-form';
import  AddressInput from './AddressInput';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import cartShipping from '../../actions/cart/cartShipping'


const AddressForm = ({nextStep}) => {
const methods = useForm();
const dispatch = useDispatch()

 
  return (
      
    <>
        <Typography variant="h6" gutterBottom>
            Shipping address
        </Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(data=>{
                dispatch(cartShipping(data)) 
                nextStep()    
                console.log(data)
                        })}>
                <Grid container spacing={3}> 
                    
                    <AddressInput required   name="firstName" label="First Name"/>
                    <AddressInput required   name="lastName" label="Last Name"/>
                    <AddressInput required   name="address1" label="Address"/>
                    <AddressInput required   name="email" label="Email"/>
                    <AddressInput required   name="city" label="City"/>
                    <AddressInput required   name="postCode" label="Post Code"/>
                </Grid>   
                <div style={{display: "flex-end", justifyContent:"space-between", marginTop:"1rem", }} >
                    <Button type="submit" variant="contained" color="primary" component={Link} to="/checkout-page">Back</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>
            </form>
        </FormProvider>

    </>
  );
}
export default AddressForm