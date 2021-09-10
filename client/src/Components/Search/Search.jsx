import React, { useState } from "react";
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
    <div>
      <Grid container direction='row'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="mb-2">
            <input
              required
              placeholder="Search product..."
              onChange={(e) => handleChange(e)}
              value={input.name}
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              name="name"
            />
          </div>
          <Container>
            <Button variant="contained" color="secondary" type="submit">
              Search
            </Button>
          </Container>
        </form>
      </Grid>
    </div>
  );
}
