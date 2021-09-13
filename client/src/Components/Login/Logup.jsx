import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Style } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import style from './Logup.module.css';
import setLogup from '../../actions/setLogup';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Logup() {
  
    const { register, formState: { errors }, handleSubmit } = useForm();
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    })


function handleChange (e) {
  setInput({
    ...input,
    [e.target.name]: e.target.value
})
}

function onSubmit (data, e) {
  console.log(data)
    e.preventDefault();
    dispatch(setLogup(input))
    alert('¡Su usuario ha sido creado!')
    /* history.push('/login') */

}

  return (
      <div className={style.container}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                {...register("firstName", { required: true}, )}
                fullWidth
                onChange={(e) => handleChange(e)}
                value={input.firstName}
                id="firstName"
                label="First Name"
                autoFocus
              />
              <span className="text-danger text-small d-block mb-2">
              {errors.firstName?.type === 'required' && "First name is required"}
              </span>
              <span className="text-danger text-small d-block mb-2">
              {errors.firstName?.type === 'minLength' && "First name is required"}
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
              {errors.lastName?.type === 'required' && "Last name is required"}
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
              />
              <span className="text-danger text-small d-block mb-2">
              {errors.email?.type === 'required' && "Email is required"}
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
              />
              <span className="text-danger text-small d-block mb-2">
              {errors.password?.type === 'required' && "Password is required"}
              </span>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Ya tenés una cuenta? Login...
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        
      </Box>
    </Container>
    </div>
  );
}