import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Avatar, Button, TextField, Grid, Typography, Container, Paper }from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import style from "./Logup.module.css";
import setLogup from "../../actions/setLogup";
import NavLogup from "./NavLogup";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Logup() {
  const { register,formState: { errors },handleSubmit,} = useForm({});
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState({});
  
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
   }

  function onSubmit(data, e) {
    console.log(data);
    e.preventDefault();
    dispatch(setLogup(input));

    swal({
      title: "Tu cuenta fue creada con éxito",
      icon: "success",
      buttons: false,
      timer: 2000,
    });

    setTimeout(() => {
      history.push("/login");
    }, 2500);
  }

  return (
    <div className={style.container}>
      <NavLogup/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  {...register("firstName", { required: true })}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={input.firstName}
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.firstName?.type === "required" &&
                    "Se requiere un nombre"}
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  {...register("lastName", { required: true })}
                  fullWidth
                  value={input.lastName}
                  onChange={(e) => handleChange(e)}
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.lastName?.type === "required" &&
                    "Se requiere un apellido"}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  {...register("email", { required: true })}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={input.email}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.email?.type === "required" && "Se requiere un email"}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  {...register("password", { required: true })}
                  fullWidth
                  value={input.password}
                  onChange={(e) => handleChange(e)}
                  name="password"
                  label="contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  pattern="required"
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.password?.type === "required" &&
                    "La contraseña debe tener al menos 8 dígitos"}
                </span>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
        <Button
          id="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          href="/login"
        >
          Ya tenés una cuenta? Login...
        </Button> 
        <p class="warnings" id="warnings"></p>
      </Container>
    </div>
  );
}

