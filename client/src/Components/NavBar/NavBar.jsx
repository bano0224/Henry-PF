import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
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
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import InfoIcon from '@material-ui/icons/Info';
import stateLogout from '../../actions/stateLogout'
import swal from 'sweetalert';


/* const StyledBadge = withStyles((theme) => ({
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

})); */
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: 'Kalam',
    fontSize: '2em',
      position: 'relative',
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    marginRight: theme.spacing(4),
    marginLeft: 4,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      width: 'auto',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
  },
}));
const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -1,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }))(Badge);
export default function NavBar() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const [abrir, setAbrir] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(true);
  const login = localStorage.getItem('login');
  const a = useSelector(state => state.cartReducer)
  const { cartItems } = a
  const handleLogout = () => {
    dispatch(stateLogout())
    swal({
      title: "Cerraste sesión!",
      text: "Te esperamos!!",
      buttons: false,
      timer: 2000
    });
  }


  const handleDrawerOpen = () => {
      setAbrir(true);
  };

  const handleDrawerClose = () => {
      setAbrir(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
        <MenuItem>
            <IconButton 
              aria-label="Crear una cuenta" 
              color="inherit"
              id='button'
              component={Link}
              to='/login'
            >
                <StyledBadge color="secondary">
                    <ArrowForwardIcon />
                </StyledBadge>
            </IconButton>
            <p>Entrar</p>
        </MenuItem>
        <MenuItem>
            <IconButton aria-label="Crear una cuenta" color="inherit">
                <StyledBadge color="secondary">
                    <CreateIcon />
                </StyledBadge>
            </IconButton>
            <p>Crear una cuenta</p>
        </MenuItem>
        </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (

    <Toolbar>
    <Typography 
      className={clsx(classes.title)} 
      variant="h6" >
        E-Market
    </Typography>
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    <MenuItem>
        <IconButton aria-label="Crear una cuenta" color="inherit">
            <StyledBadge color="secondary">
                <ArrowForwardIcon />
            </StyledBadge>
        </IconButton>
        <p>Entrar</p>
    </MenuItem>
    <MenuItem>
        <IconButton aria-label="Crear una cuenta" color="inherit">
            <StyledBadge color="secondary">
                <CreateIcon />
            </StyledBadge>
        </IconButton>
        <p>Crear una cuenta</p>
    </MenuItem>

    </Menu>
    </Toolbar>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: abrir,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, abrir && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
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
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Button
                color="inherit"
                aria-label="open drawer"
                className={classes.button}
                id='button'
                component={Link}
                to='/cart'
            >
            <IconButton aria-label="cart" color="inherit">
                <StyledBadge badgeContent={cartItems.length} color="secondary" max={99}>
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
          </Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={abrir}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Administrador', 'Promociones'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Button
                                                  color="inherit"
                                                  className={classes.button}
                                                  id='button'
                                                  component={Link}
                                                  to='/admin/products'
              ><SettingsIcon/></Button> : <Button
                                                  color="inherit"
                                                  className={classes.button}
                                                  id='button'
                                                  component={Link}
                                                  to='/cart'
              ><CardGiftcardIcon/></Button>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Contact', 'Quienes somos?'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Button
                                                  color="inherit"
                                                  className={classes.button}
                                                  id='button'
                                                  component={Link}
                                                  to='/admin/products'
              ><ContactMailIcon /></Button> : <Button
                                                  color="inherit"
                                                  className={classes.button}
                                                  id='button'
                                                  component={Link}
                                                  to='/admin/products'
              ><InfoIcon /></Button>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

/* 
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
              <MenuItem component={Link} to='/'>Perfil</MenuItem>
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
); */