import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import getProductByQuery from "../../actions/getProductByQuery";
import { Button, Grid } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const productReducer = useSelector((state) => state.productReducer)
  const { products } = productReducer
  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductByQuery(input));
    setInput("") 
  }

  const options = products.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

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
                  {/* <Autocomplete
                    id="grouped-demo"
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.name}
                    onChange={(e) => handleChange(e)}
                    value={input.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Buscar producto..." variant="outlined" />}
                  /> */}
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