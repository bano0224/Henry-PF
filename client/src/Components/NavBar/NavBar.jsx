import React from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
/* import clsx from 'clsx'; */

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
    width: `calc(100% - ${240}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    },
    menuButton: {
      marginRigth: theme.spacing(2),
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
/*   const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
 */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
/*   const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
 */
  return (
    <div className={classes.root}>
    <Grid container xs={12}>
        <CssBaseline />
        <AppBar
            color="secondary"
            position="relative"
/*             className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })} */
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
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/cart'
              >
                  <ShoppingCartOutlinedIcon/>{/* <span className="cartlogo__badge">{getCartCount()}</span> */}
              </Button>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to='/login'>Perfil</MenuItem>
                <MenuItem component={Link} to='/login'>Cerrar sesion</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
    </div>
  );
}

