import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PeopleIcon from '@material-ui/icons/People';
import Container from '@material-ui/core/Container'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
    display: 'flex'
    },
    appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
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
        justifyContent: 'flex-end'
    },
    drawerPaper: {
    width: drawerWidth,
    },
    container: {
        justifyContent: 'space-between'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    },
    contentShift: {
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    },
}));

export default function AdminNav() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
    setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };

    return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar
            color="secondary"
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
        <Toolbar className={classes.container}>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
            Admin Dashboard
            </Typography>
            <div className={classes.dashboard}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    id='button'
                    startIcon={<HomeRoundedIcon />}
                    component={Link}
                    to='/'
                >
                    Home
                </Button>
            </div>
        </Toolbar>
        <Container>
        </Container>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
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
                    <ListItem button key='Products' component={Link} id='side' to="/admin/products">
                        <ListItemIcon>{<FastfoodIcon />}</ListItemIcon>
                        <ListItemText primary='Productos' />
                    </ListItem>
                    <ListItem button key='Categories' component={Link} id='side' to="/admin/categories">
                        <ListItemIcon>{<CategoryIcon />}</ListItemIcon>
                        <ListItemText primary='Categorías' />
                    </ListItem>
                    <ListItem button key='Users' component={Link} id='side' to="/admin/users">
                        <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
                        <ListItemText primary='Usuarios' />
                    </ListItem>
                    <ListItem button key='Orders' component={Link} id='side' to="/admin/orders">
                        <ListItemIcon>{<ShoppingBasketIcon />}</ListItemIcon>
                        <ListItemText primary='Orders' />
                    </ListItem>
                </List>
            <Divider />
        </Drawer>
        <main
        className={clsx(classes.content, {
            [classes.contentShift]: open,
        })}
        >
    
        </main>
    </div>
    );
}
        
            
          
 