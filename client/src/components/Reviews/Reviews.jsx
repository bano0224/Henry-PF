import React, { useState } from "react";
import { useDispatch } from "react-redux";
import setReviews from "../../actions/setReviews";
import { Container, Button, styled } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import style from "./Reviews.module.css";

export default function Reviews() {
  const [value, setValue] = useState(2);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    comment: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeComments(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setReviews(input));
    setInput({
      name: "",
      comment: "",
    })
  }
  return (
    <div className={style.container}>
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
            <Container>
              <Button variant="contained" color="secondary" type="submit">
                Enviar comentarios
              </Button>
            </Container>
          </form>
        </Container>
        <div>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography className={style.title} component="legend">
              Queremos saber tu opinión...
            </Typography>
            <div className={style.raiting}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
