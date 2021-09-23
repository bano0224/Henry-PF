import React from 'react';
import Search from '../Search/Search.jsx';
import FilterO from '../Filter/ChangeOrder/ChangeOrder.jsx';
import FilterC from '../Filter/FilterByCategory/FilterByCategory.jsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingLeft: '4px',
        paddingRight: '4px'
    }
  }));

export default function AllFilters() {
    const classes = useStyles();

  return (
  
      <Grid container spacing={1} className={classes.gridContainer} justify="center">
          <br />
          <Grid item xs={9} sm={7} md={5} lg={4}>
          <br />
          
                  <Search/>
        </Grid>
        <Grid item xs={10} sm={6} md={3}lg={4}>
                  <FilterO/>
        </Grid>
        <Grid item xs={10} sm={6}md={4}lg={4}>
                  <FilterC/>
        </Grid>
      </Grid>

  );
}