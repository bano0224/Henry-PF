import React, { useState, useEffect } from "react";
/* import bootstrap from 'bootstrap' */
import 'bootstrap/dist/css/bootstrap.min.css'
/* import style from './Pagination.module.css' */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
      paddingLeft: '55px',
      paddingRight: '55px'
  }
}));

export default function Pagination({
  productsPerPage,
  products,
  paginate,
  currentPage,
}) {
  const classes = useStyles();
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(products / productsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <Grid container spacing={1} className={classes.gridContainer} justify="center">
        {pageNumber &&
          pageNumber.map((nro) => (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <button onClick={() => paginate(nro)} href='#search' id="myBtn" type="button" className="btn btn-outline-danger">{nro}</button>
            </Grid>
          ))}
    </Grid>
  );
}


{/* <div className={style.map}>
{pageNumber &&
  pageNumber.map((nro) => (
    <div className={style.buttonContainer}>
      <button onClick={() => paginate(nro)} href='#search' id="myBtn" type="button" className="btn btn-outline-danger">{nro}</button>
    </div>
  ))}
</div> */}