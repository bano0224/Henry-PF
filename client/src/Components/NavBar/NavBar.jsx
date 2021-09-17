import React, { useParams } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import {Grid, Badge} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import stateLogout from '../../actions/stateLogout'
import swal from 'sweetalert';


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
    offset: theme.mixins.toolbar,
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
    title: {
      fontFamily: 'Kalam',
      fontSize: '2.5em'
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

  const dispatch = useDispatch();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const login = localStorage.getItem('login')
 

  const a = useSelector(state => state.cartReducer)
  const { cartItems } = a

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(stateLogout())
    swal({
      title: "Cerraste sesión!",
      text: "Te esperamos!!",
      buttons: false,
      timer: 2000
    });
  }

  return (
    <Grid container xs={12}>
        <AppBar
          className={classes.positionFixed}
          color="secondary"
          position="fixed"
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
            {(login === 'true') ?
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
                <MenuItem component={Link} to={`/user/` }>Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesion</MenuItem>
              </Menu>
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
      <div className={classes.offset}></div>
    </Grid>
  );
}

