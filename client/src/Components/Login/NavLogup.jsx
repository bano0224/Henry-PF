import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar, Button} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    dashboard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
}));

export default function AdminLogin() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    return (
        <Grid container>
            <AppBar
                color="secondary"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.container}>
                    <Grid item className={classes.dashboard}>
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
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}
        
            
          
 