import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Grid, Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
      padding: '1%',
      color: 'white',
      display: 'flex',
      fontSize: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'white',
      boxSizing: 'content-box',
  },
  box:{
    color: 'black',
    '&:hover': {
      color: "gray",
    },
    fontSize: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '10%',
    
  }
}));

export default function Pagination({
  productsPerPage,
  products,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const classes = useStyles();

  const numberOfPages = []
  for (let i = 1; i <= Math.ceil(products / productsPerPage); i++) {
    numberOfPages.push(i)
  }
  const [currentButton, setCurrentButton] = useState(1)
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }


    else if (currentButton === 1) {
      const sliced = numberOfPages.slice(0, 3)
      console.log(sliced)
      tempNumberOfPages = [...sliced]
    }

    else if (currentButton > 1 && currentButton < numberOfPages.length) {               // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = ([ ...sliced1, ...sliced2]) // [1, '...', 4, 5, 6, '...', 10]
    }
    
    else if (currentButton > numberOfPages.length - 2) {                 // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 3)       // slice(10-4) 
      tempNumberOfPages = ([ ...sliced])                        
    }
    
    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
  }, [currentButton])

  return (
            <Grid variant="contained" xs={12} sm={12} md={12} lg={12} className={classes.gridContainer} aria-label="contained primary button group">
              <Button
                href="#"
                className={`${currentButton === 1 ? 'disabled' : ''}`,classes.box}
                onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
              >
                Prev
              </Button>
              {arrOfCurrButtons.map(((nro, index) => {
                  return <Button
                    
                    href="#"
                    key={index}
                    className={classes.box}
                    onClick={() => setCurrentButton(nro)}
                  >
                    {nro}
                  </Button>
                }))}
              <Button
                    href="#"
                    className={classes.box}
                    onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
              >
                Next
              </Button>
             </Grid>
  );
}
