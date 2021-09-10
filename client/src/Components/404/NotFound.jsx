import React from "react";
import { Alert } from "@material-ui/lab";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
    marginTop: 30,
  },
  button: {
    boxShadow: 'none',
    marginTop: 10,
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Paper elevation={0}>
          <Alert severity="error">
           <div>
               <img src="https://atrevete.academy/blog/wp-content/uploads/2020/11/404-error-page-found_41910-364.jpg"
               width="750"
               height="500" alt="error404" className='404'
               />
           </div>
          </Alert>
          <Button
          variant="contained" color="secondary" type='submit'
            component={Link}
            to="/">
            Go HOME
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default NotFound;