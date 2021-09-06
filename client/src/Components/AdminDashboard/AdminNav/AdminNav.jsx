// import React, { useState } from 'react'


// export default function Admindashboard(props) {
//     const [show, setShow] = useState(false); setShow
          
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
        // <nav class="navbar navbar-expand-lg navbar-light bg-light">
        //     <div class="container-fluid">
        //         <a class="navbar-brand" href="#">Admin</a>
        //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span class="navbar-toggler-icon"></span>
        //         </button>
        //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        //             <li class="nav-item">
        //             <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
        //             </li>
        //             <li class="nav-item">
        //             <a class="nav-link" href="#">Link</a>
        //             </li>
        //             <li class="nav-item dropdown">
        //             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        //                 Dropdown
        //             </a>
        //             <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        //                 <li><a class="dropdown-item" href="#">Action</a></li>
        //                 <li><a class="dropdown-item" href="#">Another action</a></li>
        //                 <li><hr class="dropdown-divider"/></li>
        //                 <li><a class="dropdown-item" href="#">Something else here</a></li>
        //             </ul>
        //             </li>
        //             <li class="nav-item">
        //             <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        //             </li>
        //         </ul>
        //         <form class="d-flex">
        //             <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        //             <button class="btn btn-outline-success" type="submit">Search</button>
        //         </form>
        //         </div>
        //     </div>
        // </nav>
        
    //     )
    // }
    
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
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
        <Toolbar>
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
            <Button variant="contained" color="secondary" component={Link} to='/home'>
            <Typography variant="h6" noWrap>
            Home
            </Typography>
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
            <ListItem button key='Products' component={Link} to="/admin/products">
                <ListItemIcon>{<FastfoodIcon />}</ListItemIcon>
                <ListItemText primary='Products' />
            </ListItem>
            <ListItem button key='Categories' component={Link} to="/admin/categories">
                <ListItemIcon>{<CategoryIcon />}</ListItemIcon>
                <ListItemText primary='Categories' />
            </ListItem>
            <ListItem button key='Users' component={Link} to="/admin/users">
                <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
                <ListItemText primary='Users' />
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
        
            
          
 