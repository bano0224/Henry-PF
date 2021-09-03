import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Pagination({ productsPerPage, theProducts, paginate }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(theProducts.length / productsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <div>
        <ul>
          {pageNumber &&
            pageNumber.map((nro) => (
              <li key={nro}>
                <a onClick={() => paginate(nro)}> {nro} </a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
