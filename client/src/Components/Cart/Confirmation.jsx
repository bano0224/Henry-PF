import React from "react";
import s from "./Confirmation.module.css";
import NavBar from "../NavBar/NavBar";
import { Button } from "@material-ui/core";

const Confirmation = () => {
  return (

    <div className={s.body4}>
        <NavBar />
        <div className={s.title}>
          <div className="">
            <div>
              </div>
          </div>
          <br/>
          <br/>
          <div className={s.title2}>
              Su orden fue confirmada ! ✅
              </div>
              <br/>
              ▪ Gracias por su compra
              <br/>
              ▪ Recibiras tu pedido en las proximas horas, enviamos la factura de la compra a tu correo
              <br/>
              ▪ Mientras esperas tu pedido puedes ver nuestras ofertas y productos destacados

          <div>
            <div>
              <img
                class="image"
                src="https://www.cotodigital3.com.ar/sitios/cdigi/static/content/images/company/nosotros_gracias.gif"
                alt="Compra confirmada"
                width="750"
                height="300"
              />
            </div>
          </div>
        </div>
           <Button
              type="submit"
              variant="contained"
              color="secondary"
              href="/"
              id="button"
            >
              Volver a comprar🏠
            </Button>
      </div>

  );
};

export default Confirmation;
