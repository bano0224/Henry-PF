import React from 'react';
import useStyles from './styles1';
import {Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { useState } from "react";
import {Grid} from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import './Checkout.css'


 const Checkout = () => {
    // Inicializamos hook
    const classes = useStyles();
    const steps = ['Dirección de envío', 'Detalles de pago', 'Confirmación'];
    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => setActiveStep((prevActivestep)=> prevActivestep + 1);
    const backStep = () => setActiveStep((prevActivestep)=> prevActivestep - 1);

    const Form = () => activeStep === 0 ? <AddressForm nextStep={nextStep}/> : <PaymentForm nextStep={nextStep} backStep={backStep}/>

    return (
      
        <Grid container xs={12}>
          <Grid item xs={12}>
          <NavBar/>
      </Grid>
          <main className={classes.layout}>
              <Paper className={classes.paper}>
              <Typography component='h1' variant='h4' aling='center'>
                Checkout E-market
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
            <Form/>
              </Paper>
              
          </main>  
        </Grid>
        
    )
}
export default Checkout