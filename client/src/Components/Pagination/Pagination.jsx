import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Pagination({productsPerPage, theProducts, paginate}) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(theProducts / productsPerPage); i++) {
    pageNumber.push(i+1);
  }

  return (
    <nav>
      <div>
          {pageNumber &&
            pageNumber.map((nro) => (
              <button key={nro}>
                <a onClick={() => paginate(nro)}> {nro} </a>
              </button>
            ))}
      </div>
    </nav>
  );
}
