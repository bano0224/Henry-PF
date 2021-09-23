import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles, useTheme, alpha, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Menu, MenuItem, Typography, Toolbar,} from '@mui/material';
import { 
        IconButton,
        Button,
        Grid, 
        Badge,
        Drawer,
        List,
        Divider,
        CssBaseline,
        AppBar
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { blueGrey } from "@material-ui/core/colors";
import Label from '@mui/icons-material/Label';
/* import stateLogout from '../../actions/stateLogout' */
import swal from 'sweetalert';
import jwt from 'jsonwebtoken'
import logo from '../../media/logo.png'


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
    title: {
      fontFamily: 'Kalam',
      fontSize: '2.5em',
      marginLeft: '5px'
      
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
  },
  drawerD:{
    color: 'black',
    justifyContent: 'center',
    marginLeft: '10px',
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
  const [auth, setAuth] = React.useState(true);
  const login = localStorage.getItem('login');
  const open = Boolean(anchorEl);
  const history = useHistory()



//TOKEN
  const key = JSON.parse(sessionStorage.getItem("token"))?.token
  if(key){
    var decoded = jwt.verify(key, 'secret')
    var userRole = (decoded.role[0]?.name)
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


  return (
    <Grid className={classes.grow}>
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: abrir,
        })}>
        <Toolbar>
          <Grid xs={6} sm={6} md={10} lg={9}>
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
        </Grid>
          <div className={classes.grow} />
          <Grid xs={6} sm={6} md={4} lg={3} className={classes.sectionDesktop}>
          {
            userRole === 'admin'
            ? <Grid className={classes.dashboard}>
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
            </Grid>
            : null
          }
          <Grid className={classes.dashboard}>
              <Button
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  component={Link}
                  to='/promotions'
              >
              <IconButton
              style={{ color: blueGrey[900] }}
              aria-label="show more"
              className={classes.button}
            >
              <StyledBadge 
                 badgeContent={
                    `%`
                  }
                  color="secondary">
                  <Label/>
              </StyledBadge>
            </IconButton>
              </Button>
          </Grid>
          <Grid className={classes.dashboard}>
            {(key) 
            ? <Grid>
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
                <AccountCircleIcon />
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
            </Grid>
            : 
            <Grid >
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
                <LoginIcon/>
              </Button>
            </Grid>
              
            }
            </Grid>
            </Grid>
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
        {
            userRole === 'admin'
            ?
              <List>
            <ListItem button>
              <ListItemIcon>
                <Button
                    className={classes.link}
                    id='button'
                    component={Link}
                    to='/admin/products'
                >
                  <SettingsIcon className={classes.link}/><Typography className={classes.drawerD}>Administrador</Typography>
                </Button>
              </ListItemIcon>
            </ListItem>
        </List>
        : null
        }
        <List>
            <ListItem>
              <ListItemIcon>
                <Button
                      className={classes.link}
                      id='button'
                      component={Link}
                      to='/promotions'
                >
                  <CardGiftcardIcon className={classes.link}/><Typography className={classes.drawerD}>Promociones</Typography>
                </Button>
              </ListItemIcon>
              <ListItemText  />
            </ListItem>
        </List>
        <Divider />
        <List className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Button
                    className={classes.link}
                    id='button'
                    component={Link}
                    to='/admin/products'
                >
                  <ContactMailIcon className={classes.link}/><Typography className={classes.drawerD}>Contacto</Typography>
                </Button>
              </ListItemIcon>
            </ListItem>
        </List>
        <List>
            <ListItem>
              <ListItemIcon>
                <Button
                      className={classes.link}
                      id='button'
                      component={Link}
                      to='/cart'
                >
                  <InfoIcon className={classes.link}/><Typography className={classes.drawerD}> Sobre Nosotros</Typography>
                </Button>
              </ListItemIcon>
              <ListItemText  />
            </ListItem>
        </List>
      </Drawer>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </Grid>
  );
};