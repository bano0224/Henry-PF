import React, { useState } from 'react';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import swal from 'sweetalert';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import NavBar from '../NavBar/NavBar';
import {URL_UPDATE_USER} from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: 'center',
      boxShadow: "none",
      padding: theme.spacing(5),
    },
    paper: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    }));

    function validate(input) {
      return input.password == input.password2
    }
    

export default function Confirm(){

  const {token} = useParams();
    const classes = useStyles();
    let history = useHistory();
    
    const [input, setInput] = useState({
      password: "",
      password2: ""
    });

    const handleChange = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      if(validate(input)){
      axios.patch(`${URL_UPDATE_USER}${token}`, input);
      swal({
        title: "Su contraseña fue actualizada",
        text: "Recuerda cuidar tus credenciales",
        icon: "success",
        buttons: false,
        timer: 2500,
        
      });

      history.push('/login')
      } else {
        swal({
          title: "La contraseña no coincide",
          text: "Revisa los caracteres y vuelve a intentarlo",
          icon: "error",
          buttons: false,
          timer: 2500,
          
        });
      }
    }

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          <NavBar />
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Confirmar contraseña</Typography>
            <Typography className={classes.paper}>Por favor ingrese su nueva constraseña(revise la bandeja de entrada de su correo)</Typography>
          <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                  
            <TextField color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                value={input.password}
                onChange={(e) => handleChange(e)}
                label="Nueva contraseña">
                  Nueva contraseña
                </TextField>
                <TextField color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                type="password"
                value={input.password2}
                onChange={(e) => handleChange(e)}
                label="Confirmar contraseña"
                >
                  Confirmar contraseña
                </TextField>
            <Button variant="contained"
             fullWidth className={classes.submit}
              color="primary" 
              type='submit'
              href="" >

             Enviar
            </Button>
            <br/>
            <div>
            <Button
          id="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          href="/">
          Home
        </Button>
            </div>
            </form>  
          </div>
          <Box mt={8}>
          </Box>
        </Container>
      );
    }