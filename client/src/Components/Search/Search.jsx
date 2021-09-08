import React, { useState } from "react";
<<<<<<< HEAD
// import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
=======
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
>>>>>>> 8c2870145ad18c417539b72d38c4952817146840
import getProductByQuery from "../../actions/getProductByQuery";
import { Container, Button, Grid } from "@material-ui/core";
import style from "./Search.module.css";

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
      
      // if(name){
      //   alert('Este producto no existe')
     
    }) 
  }


  return (
    <div>
      {/* <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Search product..."
            autoComplete="on"
            value={input.name}
            onChange={(e) => handleChange(e)}
          /> */}
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
      {/* <button type="submit">Search</button> */}
      {/* </div>
      </form> */}
    </div>
  );
}
/* function mapStateToProps(state) {
  return {
    product: state.product,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getProductByQuery: (name) => dispatch(getProductByQuery(name)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search); */
