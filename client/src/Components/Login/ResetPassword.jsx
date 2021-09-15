import React from 'react';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
// import { Formik } from 'formik';

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
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    }));

    const validationShema = yup.object({
        email: yup
        .string("email")
        .email("El email no es valido")
        .required("Email requerido"),
        newPassword: yup
        .string("contraseña")
        .required("la constraseña es requerida"),
        token: yup
        .number()
        .min(5)
        .required("Token requerido")
    });
    

export default function ResetPassword(){
    const classes = useStyles();
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: "",
            token: "",
            newPassword: "",
        },
        validationSchema: validationShema,
        onSubmit: (values) => {
            axios
            // crear nueva ruta
            .post(`/login/reset?token=${values.token}`, {password : values.newPassword})
            .then((res) => {
                
                swal({
                    title: "Felicidades",
                    text: "Se ah restablecido la contraseña",
                    icon: "success",
                    buttons: false,
                    timer: 4000,
                  });
                history.push("/login")
            })
            .catch((error) => {
                
                swal({
                    title: "Upss...",
                    text: "El Token no es correcto",
                    icon: "warning",
                    buttons: false,
                    timer: 4000,
                  });
            });
        },
    });


    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          <NavBar />
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Restablecer constraseña</Typography>
            <Typography className={classes.paper}>"Por favor ingrese su dirección de correo electrónico(revise la bandeja de entrada de su correo) y luego su nueva contraseña"</Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="Email">Email</TextField>
            <TextField color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="token"
                value={formik.values.token}
                onChange={formik.handleChange}
                label="Token">Token</TextField>
            <TextField color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                label="New Password">New Password</TextField>
            <Button variant="contained" fullWidth className={classes.submit} color="primary" type='submit' >
                    Enviar
            </Button>
            <div>
            <Button
          id="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          href="/login">
          Ingresar
        </Button>
            </div>
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