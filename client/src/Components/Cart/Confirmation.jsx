import React from "react";
import s from "./Confirmation.module.css";
import NavBar from "../NavBar/NavBar";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";

const Confirmation = () => {
  return (
    <Grid container xs={12}>
      <NavBar />
      <div className={s.body4}>
        <div className={s.title}>
          <div className={s.title}>
            Su orden fue confirmada
            <img
              class="image"
              src="https://i.gifer.com/7efs.gif"
              alt="Compra"
              width="450"
              height="300"
            />
          </div>
          <img
              class="image"
              src="https://media3.giphy.com/media/d96nYrQsxeufEGZ6pi/giphy.gif?cid=790b7611a15a4d02fc900c7e9243795b702046306cc22f6a&rid=giphy.gif&ct=g"
              alt="envio"
              width="550"
              height="170"

            />
          <div className={s.info}>
            <div class="imageContainer">
              <img
                class="image"
                src="https://www.cotodigital3.com.ar/sitios/cdigi/static/content/images/company/nosotros_gracias.gif"
                alt="Compra confirmada"
                width="750"
                height="300"
              />
           <Button
              type="submit"
              variant="contained"
              color="secondary"
              href="/"
              id="button"
            >
              Volver a comprar 🏠
            </Button>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Confirmation;