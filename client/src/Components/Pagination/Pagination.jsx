import React, { useState } from "react";
/* import bootstrap from 'bootstrap' */
import 'bootstrap/dist/css/bootstrap.min.css'
import style from './Pagination.module.css'


export default function Pagination({
  productsPerPage,
  products,
  paginate,
}) {

  const pageNumber = [];
  for (let i = 0; i < Math.ceil(products / productsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
      <div className={style.map}>
        {pageNumber &&
          pageNumber.map((nro) => (
            <div className={style.buttonContainer}>
              <button onClick={() => paginate(nro)} type="button" className="btn btn-outline-danger">{nro}</button>
            </div>
          ))}
      </div>
  );
}
