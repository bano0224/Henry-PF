import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import login from "../../actions/setLogin";
import stateLogin from "../../actions/stateLogin";
import style from './Login.module.css'
import swal from 'sweetalert';


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

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await login({ 
        email, password });
      
      dispatch(stateLogin());

      setTimeout(() => {
        swal({
          title: "Bienvenida/o",
          text: "Chupate esa mandarina!",
          icon: "success",
        });
      }, 2000)
      

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
      <div className={style.container}>
      <label for="exampleFormControlInput1" className={style.label} class="form-label">
      Por favor, ingresá tu email y contraseña
      </label>
      <form onSubmit={(e) => handleLogin(e)}>
        <div class="mb-2">
          <label for="exampleFormControlInput1" className={style.label} class="form-label">
            Email
          </label>
          <input
            required
            placeholder="email"
            value={email}
            type="text"
            class="form-control"
            onChange={({ target }) => setEmail(target.value)}
            id="exampleFormControlInput1"
            name="email"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" className={style.label} class="form-label">
            Password
          </label>
          <input
            required
            placeholder="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></input>
        </div>
        <Container>
          <Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
        </Container>
      </form>
      </div>
    </div>
  );
}
