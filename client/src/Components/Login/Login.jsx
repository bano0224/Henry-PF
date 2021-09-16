import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import login from "../../actions/setLogin";
import stateLogin from "../../actions/stateLogin";
import style from "./Login.module.css";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import swal from "sweetalert";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [erroMessage, setErrorMessage] = useState("");

  function responseGoogle(respuesta) {
    if (respuesta.profileObj) {
      dispatch(stateLogin());

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

  function responseFacebook(respuesta) {
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
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await login({
        email,
        password,
      });
      

      dispatch(stateLogin());

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

      console.log(user);
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (err) {
      setErrorMessage("Error en el usuario y/o contraseña");

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
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
              for="exampleFormControlInput1"
              className={style.label}
              class="form-label"
            >
              Email
            </label>
            <input
              required
              placeholder="email"
              value={email}
              type="text"
              class="form-control inputFrom"
              onChange={({ target }) => setEmail(target.value)}
              id="exampleFormControlInput1"
              name="email"
            />
          </div>
          <div class="mb-3">
            <label
              for="exampleFormControlTextarea1"
              className={style.label}
              class="form-label"
            >
              Password
            </label>
            <input
              required
              placeholder="password"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
              class="form-control inputFrom"
              id="exampleFormControlTextarea1"
              rows="3"
            ></input>
          </div>
          <Container className={style.buttonLogup}>
            <Button variant="contained" color="secondary" type="submit">
              Ingresar
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
            Crear cuenta nueva
          </Button>
            </div>
            <div className={style.google}>
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
              {/* <FacebookLogin className={style.facebookButton}
                appId="906354623292808"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton='Iniciar sesión'
                icon="fa-facebook"
                className={style.FBbutton}
              /> */}
            </div>
          </Container>
        </form>
      </div>
    </div>
  );
}
