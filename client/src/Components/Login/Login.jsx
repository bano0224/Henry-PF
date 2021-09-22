import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import style from "./Login.module.css";
import GoogleLogin from "react-google-login";
import swal from "sweetalert";
import checkLogin from "../../actions/checkLogin";
import login from "../../actions/users/login";
import resetError from "../../actions/users/resetError";
import loginGoogle from "../../actions/users/loginGoogle";

export default function Login() {

  const history = useHistory();
  const dispatch = useDispatch();
  const [userLogin, setUserlogin] = useState({
    email: '',
    password: ''
  })
  const productReducer = useSelector(state => state.productReducer)
  const { error } = productReducer

  useEffect(() => {
    dispatch(resetError())
  }, [])

  //GOOGLE
  function responseGoogle(respuesta) {
    if (respuesta.profileObj) {
      console.log(respuesta)
      const user = respuesta.
      dispatch(loginGoogle({}))

      swal({
        title: "Bienvenida/o",
        text: "Disfrutá de las mejores ofertas!",
        icon: "success",
        buttons: false,
        timer: 2000,
      });

      setTimeout(() => {
        history.push("/");
      }, 2500);
    }
  }

  /* function responseFacebook(respuesta) {
    console.log('ESTA ES LA RESPUESTA',respuesta)
    if (respuesta.accesToken) {
      dispatch(dispatch(stateLogin()));

      swal({
        title: "Bienvenida/o",
        text: "Disfrutá de las mejores ofertas!",
        icon: "success",
        buttons: false,
        timer: 2000,
      });

      setTimeout(() => {
        history.push("/");
      }, 2500);
    }
  } */

  //LOGIN
  const handleChange = (e) => {
    setUserlogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  // console.log(sessionStorage.getItem('token'));

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login(userLogin))

    setUserlogin({
      email: '',
      password: ''
    })
      
    setTimeout(() => {
      if(sessionStorage.getItem('token')){
      history.push("/");}
    }, 2500);
  }

  return (
    <div className={style.body}>
      <NavBar />
      <div className={style.container}>
        <label
          for="exampleFormControlInput1"
          className={style.label}
          class="form-label"
        >
          Por favor, ingresá tu email y contraseña
        </label>
        <form onSubmit={(e) => handleLogin(e)}>
          <div class="mb-2">
            <label
              for="email"
              className={style.label}
              class="form-label"
            >
              Email
            </label>
            <input
              required
              placeholder="ejemplo@ejemplo.com"
              value={userLogin.email}
              type="text"
              class="form-control inputFrom"
              onChange={(e) => {handleChange(e)}}
              id="email"
              name="email"
            />
          </div>
          <div class="mb-3">
            <label
              for="password"
              className={style.label}
              class="form-label"
            >
              Password
            </label>
            <input
              required
              placeholder="password"
              type="password"
              value={userLogin.password}
              name="password"
              onChange={(e) => {handleChange(e)}}
              class="form-control inputFrom"
              id="password"
              rows="3"
            ></input>
          </div>
          <Container className={style.buttonLogup}>
            {
              typeof error !== 'object'
              ? <span>{error}</span>
              : <p></p>
            }
            <Button variant="contained" color="secondary" type="submit">
              Login
            </Button>
            <div className={style.link}>
            <Link to="/login/reset">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className={style.link}>
            <Button
            id='button'
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
                    to='/logup'
          >
            Si no posees una cuenta hacé click aquí
          </Button>
            </div>
            <div className={style.google}>
              <br />
              <br />
              <GoogleLogin className={style.googleButton}
                clientId="167695785983-a0bj8k1t6bi2c3pqlb18g68834srcng0.apps.googleusercontent.com"
                buttonText="Iniciar sesión"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className={style.containerFB}>
              <br />
              <br />
            </div>
          </Container>
        </form>
      </div>
    </div>
  );
}
