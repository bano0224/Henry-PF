import React, { useState } from "react";
import { Container, Button } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import setLogin from '../../actions/setLogin'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formWrapper: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(8)
  },
  input: {
    width: '50%'
  }
}));


export default function Login() {

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const [input, setInput] = useState({
    email: '',
    password: '',
})

function handleChange(e) {
  setInput({
    ...input,
    [e.target.name]: e.target.value,
  });
}

function handleSubmmit (e) {
  e.preventDefault();
  dispatch(setLogin(input));
}

  return (
    <div class='container'>
     
      <form onSubmit={(e) => (handleSubmmit(e))}>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input onChange={(e) => (handleChange(e))} required value={input.email} type="text" class="form-control" id="exampleFormControlInput1" name='email'/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Password</label>
                        <input onChange={(e) => (handleChange(e))} required value={input.password} name='password'  class="form-control" id="exampleFormControlTextarea1" rows="3"></input>
                    </div>
                    <Container>
                        <Button variant="contained" color="secondary" type='submit'>
                            Login
                        </Button>
                    </Container>
                </form>
    </div>
    
  );
}
