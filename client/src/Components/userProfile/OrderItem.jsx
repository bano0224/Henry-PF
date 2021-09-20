import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    container: {
        fontFamily: 'Raleway'
    }
  }));

export default function OrderItem({product}) {
    const classes = useStyles();

    return (
        <>
            <Grid container justifyContent='space-between' alignItems='center' className={classes.container}>
                <Grid item>
                    <Grid container direction='row' justifyContent='center' alignItems='flex-end' spacing={1}>
                        <Grid item>
                            <img src={product.imageUrl} width='30px' height='30px'/>
                        </Grid>
                        <Grid item>
                            <h6>{product.name}</h6>
                        </Grid>
                    </Grid> 
                </Grid>
                <Grid container xs={3} justifyContent='space-around' alignItems='center' direction='row'>
                    <Grid item>
                        <span>{`x${product.qty}`}</span>
                    </Grid>
                    <Grid item>
                        <span>${parseInt(product.price) * product.qty}</span>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
