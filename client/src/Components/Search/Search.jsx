import React, { useState } from "react";
// import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import getProductByQuery from "../../actions/getProductByQuery";
import { Container, Button, Grid } from "@material-ui/core";
// import style from "./Search.module.css";

export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductByQuery(input));
    setInput({
      
     
    }) 
  }


  return (
    <>
      <Grid container xs={12} direction='row'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container>
            <Grid item>
            <input
              placeholder="Buscar producto..."
              onChange={(e) => handleChange(e)}
              value={input.name}
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              name="name"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" type="submit">
              Buscar
            </Button>
          </Grid>
          </Grid>
          
        </form>
      </Grid>
    </>
  );
}
