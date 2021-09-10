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
import style from './Logup.module.css'
import sendLogup from "../../actions/setLogup";


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
  
    const { register, errors, handleSubmit } = useForm();
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const [logup, setLogup] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    })


function handleChange (e) {
  setLogup({
    ...logup,
    [e.target.name]: e.target.value
})
}

function onSubmit (data, e) {
  console.log(data)
    e.preventDefault();
    dispatch(sendLogup(logup));
    alert('¡Su usuario ha sido creado!')
    history.push('/login')

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
                {...register('email', { required: true })}
                error={errors.email}
                helperText={errors.email && 'email required'}
                fullWidth
                onChange={(e) => handleChange(e)}
                value={logup.firstName}
                id="firstName"
                label="First Name"
                autoFocus
              />
              <span className="text-danger text-small d-block mb-2">
              {errors?.firstName && errors?.firstName.message}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={logup.lastName}
                onChange={(e) => handleChange(e)}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) => handleChange(e)}
                value={logup.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={logup.password}
                onChange={(e) => handleChange(e)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
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