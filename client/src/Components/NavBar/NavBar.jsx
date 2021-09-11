import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import {Grid, Badge} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
    display: 'flex'
    },
    appBar: {
      [theme.breakpoints.up('sm')]:{
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    }
    },
    appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    },
    menuButton: {
      marginRigth: theme.spacing(2),
      [theme.breakpoints.up('sm')]:{
        display: 'none',
      },
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    dashboard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    drawerPaper: {
    width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    container: {
        justifyContent: 'space-between'
    },
    containerT: {
      justifyContent: 'flex-end'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
  },

}));

export default function NavBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const productReducer = useSelector(state => state.productReducer)
  const {login} = productReducer

  const a = useSelector(state => state.cartReducer)
  const { cartItems } = a

  console.log(cartItems)

  return (
    <Grid container xs={12}>
        <CssBaseline />
        <AppBar
            color="secondary"
            position="relative"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
        <Toolbar className={classes.container}>
          <Button
                color="inherit"
                aria-label="open drawer"
                className={classes.button}
                id='button'
                component={Link}
                to='/'
          >
          <Typography variant="h6" className={classes.title}>
          E-Market
          </Typography>                
            </Button>

          <div className={classes.dashboard}>
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/admin/products'
              >
                  Administrador
              </Button>
          </div>
          <div className={classes.dashboard}>
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/cart'
              >
                  Promociones
              </Button>
          </div>
  
           
          <div className={classes.dashboard}>
            {login ?
            <div>
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/cart'
              >
                <StyledBadge badgeContent={cartItems.length} color="secondary" overlap="circular" max={99} anchorOrigin={{vertical: 'top',horizontal: 'right',}}>
                  <ShoppingCartIcon />
                </StyledBadge>
              </Button>
              <Button
                    color="inherit"
                    aria-label="open drawer"
                    className={classes.button}
                    id='button'
                    component={Link}
                    to='/login'
              >
                <AccountCircle />
              </Button>
              </div>
:
              <div>
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/cart'
              >
                <StyledBadge badgeContent={cartItems.length} color="secondary" overlap="circular" max={99} anchorOrigin={{vertical: 'top',horizontal: 'right',}}>
                  <ShoppingCartIcon />
                </StyledBadge>
              </Button>
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/login'
              >
                  Ingresar
              </Button>
            </div>
            }
            </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

