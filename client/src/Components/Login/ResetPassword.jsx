import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import resetPassword from "../../actions/resetPassword";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import NavBar from "../NavBar/NavBar";


const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    boxShadow: "none",
    padding: theme.spacing(5),
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

const validationShema = yup.object({
  email: yup
    .string("email")
    .email("El email no es valido")
    .required("Email requerido"),
    
  });
  const validation = yup.object({
    email2: yup
      .string("email")
      .email("El email no es valido")
      .required("Email requerido"),
      
    });

  export default function ResetPassword() {
    const dispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();
    const formik = useFormik({
      initialValues: { email: "",email2:"", token: "", newPassword: "" },
      validationSchema: validationShema,
      onSubmit: (values) => {
        
        
      },
    });

  const [input, setInput] = useState({
    email: ""
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
  
    }
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword(input));
      swal({
        title: "Tu contraseña ha sido reseteada",
        text: "Validamos tu mail, revisa tu correo",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <NavBar />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Restablecer constraseña
        </Typography>
        <Typography className={classes.paper}>
          Por favor ingrese su dirección de correo electrónico(revise la bandeja
          de entrada de su correo)
        </Typography>
        <form className={classes.form} onSubmit={e =>handleSubmit(e)}>
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            type="email"
            required
            fullWidth
            name="email"
            id="txtemail1"
            value={input.email}
            onChange={(e) => handleChange(e)}
            label="Email"
          >
            Email
          </TextField>
          <Button
            variant="contained"
            fullWidth
            className={classes.submit}
            color="primary"
            type="submit"
            /* href="/login/reset/confirm" */
          >
            Enviar
          </Button>

          <br />
          <div>
            <Button
              id="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              href="/"
            >
              Home
            </Button>
          </div>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
