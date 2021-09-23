import React, { useParams } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { makeStyles, useTheme, alpha, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { 
        Menu,
        Typography,
        Toolbar,
        IconButton,
        MenuItem,
        Button,
        Grid, 
        Badge,
        Drawer,
        List,
        Divider,
        ListItem,
        ListItemIcon,
        ListItemText,
        CssBaseline
      } from '@material-ui/core';
import { 
  AccountCircle,
  ShoppingCartIcon,
  CreateIcon,
  ArrowForwardIcon,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SettingsIcon,
  CardGiftcardIcon,
  ContactMailIcon,
  InfoIcon
} from '@material-ui/icons/AccountCircle';

import stateLogout from '../../actions/stateLogout'
import swal from 'sweetalert';
import jwt from 'jsonwebtoken'


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
  link: {
    color: 'black',
    '&:hover': {
      color: "black",
    },
  }
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
  
  const dispatch = useDispatch();
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
  const open = Boolean(anchorEl);
  const history = useHistory()



//TOKEN
  const key = JSON.parse(sessionStorage.getItem("token"))?.token
  if(key){
    var decoded = jwt.verify(key, 'secret')
    console.log('ESTE ES EL DECODED',decoded)
    var userRole = (decoded.role[0].name)
  }
  

//CART BADGE
  const a = useSelector(state => state.cartReducer)
  const { cartItems } = a


//HANDLERS
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    swal({
      title: "Sesión finalizada",
      text: "Volvé pronto!",
      buttons: false,
      timer: 2000
    });
    history.push('/')
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
    <Toolbar>
    {(login === 'true') ?
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
        <MenuItem 
              className={classes.link}
              component={Link}
              to='/login'>
            <IconButton 
              aria-label="Crear una cuenta" 
              color="inherit">
                <StyledBadge color="secondary">
                    <ArrowForwardIcon />
                </StyledBadge>
            </IconButton> 
            <p>Perfil</p>
        </MenuItem >
        <MenuItem onClick={handleLogout} className={classes.link}>
            <IconButton aria-label="Crear una cuenta" color="inherit" >
                <StyledBadge color="secondary">
                    <CreateIcon />
                </StyledBadge>
            </IconButton>
            <p>Cerrar Sesion</p>
        </MenuItem>
        </Menu>
    :
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
        <MenuItem 
              className={classes.link}
              component={Link}
              to='/login'>
            <IconButton 
              aria-label="Crear una cuenta" 
              color="inherit"  
            >
                <StyledBadge color="secondary">
                    <ArrowForwardIcon />
                </StyledBadge>
            </IconButton>
            <p>Ingresar</p>
        </MenuItem>
        <MenuItem
            className={classes.link}
            component={Link}
            to='/logup'>
            <IconButton aria-label="Crear una cuenta" color="inherit">
                <StyledBadge color="secondary">
                    <CreateIcon />
                </StyledBadge>
            </IconButton>
            <p>Crear Cuenta</p>
        </MenuItem>
        </Menu>
      }
      </Toolbar>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    
        <Toolbar>
        <Typography 
          className={clsx(classes.title)} 
          variant="h6" >
            E-Market
        </Typography>
        {(login === 'true') ?
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
            <p>Perfil</p>
        </MenuItem>
        <MenuItem>
            <IconButton aria-label="Crear una cuenta" color="inherit">
                <StyledBadge color="secondary">
                    <CreateIcon />
                </StyledBadge>
            </IconButton>
            <p>Cerrar sesion</p>
        </MenuItem>
        </Menu>
    :
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
        }
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
                    <ShoppingCartIcon/>
                </StyledBadge>
            </IconButton>
          </Button>
          {
            userRole === 'admin'
            ? <div className={classes.dashboard}>
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
            : null
          }
          <div className={classes.dashboard}>
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/promotions'
              >
                  Promociones
              </Button>
          </div>
          <div className={classes.dashboard}>
            {(key) 
            ? <div>
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
                <MenuItem component={Link} to='/profile'>Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesion</MenuItem>
              </Menu>
            </div>
            : <div>
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
                                                  className={classes.link}
                                                  id='button'
                                                  component={Link}
                                                  to='/admin/products'
              ><SettingsIcon className={classes.link}/></Button> : <Button
                                                  className={classes.link}
                                                  id='button'
                                                  component={Link}
                                                  to='/cart'
              ><CardGiftcardIcon className={classes.link}/></Button>}</ListItemIcon>
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
                                                  className={classes.link}
                                                  id='button'
                                                  component={Link}
                                                  to='/admin/products'
              ><ContactMailIcon className={classes.link}/></Button> : <Button
                                                  color="inherit"
                                                  className={classes.link}
                                                  id='button'
                                                  component={Link}
                                                  to='/admin/products'
              ><InfoIcon className={classes.link}/></Button>}</ListItemIcon>
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
