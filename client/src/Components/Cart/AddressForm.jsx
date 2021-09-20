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
            Dirección de envío
        </Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(data=>{
                dispatch(cartShipping(data)) 
                nextStep()    
                console.log(data)
                        })}>
                <Grid container spacing={3}> 
                    
                    <AddressInput required type='text' name="firstName" label="Nombre"/>
                    <AddressInput required type='text' name="lastName" label="Apellido"/>
                    <AddressInput required type='text' name="address1" label="Direccion"/>
                    <AddressInput required type='email' name="email" label="Email"/>
                    <AddressInput required type='text' name="city" label="Ciudad"/>
                    <AddressInput required type='text' name="postCode" label="Código postal"/>
                </Grid>   
                <div style={{display: "flex-end", justifyContent:"space-between", marginTop:"1rem", }} >
                    <Button id='button' type="submit" variant="contained" color="secondary" component={Link} to="/cart">Atras</Button>
                    <Button id='button' type="submit" variant="contained" color="secondary">Siguiente</Button>
                </div>
            </form>
        </FormProvider>

    </>
  );
}
export default AddressForm