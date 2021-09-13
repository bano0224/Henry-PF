import React, { useState, useEffect } from "react";
/* import bootstrap from 'bootstrap' */
import 'bootstrap/dist/css/bootstrap.min.css'
import style from './Pagination.module.css'


export default function Pagination({
  productsPerPage,
  products,
  paginate,
  currentPage,
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
              <button onClick={() => paginate(nro)} href='#search' id="myBtn" type="button" className="btn btn-outline-danger">{nro}</button>
            </div>
          ))}
      </div>
  );
}
