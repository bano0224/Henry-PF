import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import style from "./Logup.module.css";
import setLogup from "../../actions/setLogup";
import AdminLogin from "./AdminLogin/AdminLogin";


function validate(input) {
	let errors = {};
  if (!input.firstName) {
    errors.firstName = "Se require un nombre";
  } else if (input.firstName.length < 3) {
    errors.firstName = "El nombre debe tener al menos 3 letras";
  }
  if (!input.lastName) {
    errors.lastName = "LastName is required";
  } else if (input.lastName.length < 3) {
    errors.lastName = "El apellido debe tener al menos 3 letras";
  }
	if (!input.email) {
		errors.email = "Se require Email";
	} else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/(input.email)) {
		errors.email = "Invalid Email";
	}
	if (!input.password) {
		errors.password = "Se require Password";
	} else if (
		!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/(input.password)) {
		errors.password = "La contraseña debe contener almenos una letra mayúscula, una minúscula y un número";
	}
	return errors;
}
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
   const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
   });

  const { register,formState: { errors }} = useForm({});
  // const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  //const [errors, setErrors] = useState({});
  
  //    return (
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <input name="firstname" ref={register} /> {/* register an input */}
  //       <input name="lastname" ref={register({ required: true })} />
  //       {errors.lastname && 'Last name is required.'}
  //       <input name="age" ref={register({ pattern: /\d+/ })} />
  //       {errors.age && 'Please enter number for age.'}
  //       <input type="submit" />
  //     </form>
  //   );
  // }


const handleChange=(e)=>{
    setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		//  setErrors(
		// 	validate({
		// 		...input,
		// 		[e.target.value]: e.target.value,
		// 	})
		// ); 
   }



const handlerSubmit=(e)=>{
  e.preventDefault();
  validate(input)
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  (input.email));

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  (input.password));
  
  } 
  //   const validate = (form) => {
  //     let errors = {};

  //     if (!form.name) {
  //       errors.name = "Nombre requerido";
  //     } else if (form.name.length < 4) {
  //       errors.name = "Se requiere un nombre con mas de 4 caracteres";
  //     }
  //     if (input.password.length === 0 || !input.password) {
  //       errors.password = "La constraseña es incorrecta";
  //     }
  //     if (input.firstName || !input.lastName || !input.email) {
  //       errors.lastName.firstName.email = "Todos los campos son obligatorios";
  //     }
  //     if (input.password.length < 8) {
  //       errors.password =
  //         "La contraseña deberia debe tener al menos 8 caracteres";
  //     }
  //     if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/(input.password)) {
  //       errors.password =
  //         "La contraseña debe contener almenos una letra mayúscula, una minúscula y un número";
  //     }
  //   };
   

const onSubmit=(data, e)=> {
    console.log(data);
    e.preventDefault();
    dispatch(setLogup(input));
    alert("¡Su usuario ha sido creado!");
    /* history.push('/login') */
  }

  return (
    <div className={style.container}>
      <AdminLogin />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={(e) =>handlerSubmit(e)}>
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
                  label="First Name"
                  autoFocus
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.firstName?.type === " " &&
                    "First name is required"}
                </span>
                <span className="text-danger text-small d-block mb-2">
                  {errors.firstName?.type === "minLength" &&
                    "First name is required"}
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
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.lastName?.type === " " &&
                    "Last name is required"}
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
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.email?.type === " " && "Email is required"}
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
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  pattern="required"
                  required="required"
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.password?.type === " " &&
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
              Inscribirse
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
      </Container>
    </div>
  );
}
