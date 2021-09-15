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
          <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Search/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}lg={2}>
                  <FilterO/>
        </Grid>
        <Grid item xs={12} sm={6}md={4}lg={2}>
                  <FilterC/>
        </Grid>
      </Grid>

  );
}