import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import getProductByQuery from "../../actions/getProductByQuery";
import { Button, Grid } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductByQuery(input));
    setInput("") 
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
                class="form-control inputFrom"
                id="exampleFormControlInput1"
                name="name"
              />
            </Grid>
            <Grid item style={{marginLeft: '5px'}}>
              <Button variant="contained" color="secondary" type="submit">
                <SearchIcon/>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
}