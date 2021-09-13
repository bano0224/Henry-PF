import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import setReviews from "../../actions/setReviews";
import { Container, Button, styled } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import style from "./Reviews.module.css";
import NavBar from "../NavBar/NavBar";

export default function Reviews() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  /* const [value, setValue] = useState(2); */
  const [input, setInput] = useState({
    name: "",
    comment: "",
    rating:""
  });
  
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    
    setInput({
      name: "",
      comment: "",
      rating: ""
    })
    /* setValue(value)
    console.log('ESTE ES EL VALUE', value) */
    dispatch(setReviews(input));
    alert('¡Gracias por tu review!')
    history.push('/')
  }

  return (
    <div>
      <NavBar/>
      <div className={style.container}>
        <div>
        <div className={style.reviews}>
          <Container maxWidth="xs">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div class="mb-2">
                <label className={style.label} for="exampleFormControlInput1" /* class="form-label" */>
                  Name
                </label>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  value={input.name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="name"
                />
              </div>
              <div class="mb-3">
                <label className={style.label} for="exampleFormControlTextarea1" /* class="form-label" */>
                  Comentarios
                </label>
                <textarea
                  required
                  onChange={(e) => handleChange(e)}
                  value={input.comment}
                  name="comment"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography className={style.title} component="legend">
                Queremos saber tu opinión...
              </Typography>
              <div className={style.raiting}>
                <Rating
                  name="rating"
                  value={input.rating}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </Box>
            </form>
          </Container>
          <div>
            <Container>
                <Button variant="contained" color="secondary" type="submit" onClick={(e) => handleSubmit(e)}>
                  Enviar comentarios
                </Button>
            </Container>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
