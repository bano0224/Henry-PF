import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import addToCart from "../../actions/cart/addToCart";

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

export default function Cart({item, handlerRemove}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = useState(1);

    
  const handlerQty = (id, qty) => {
    setValue(qty)
    dispatch(addToCart(id, qty));
  };

  useEffect(() => {
    setValue(item.qty);
  }, [item.qty]);

    return (
        <>
            <Grid container justifyContent='space-between' alignItems='center' className={classes.container}>
                <Grid item>
                    <Grid container direction='row' justifyContent='center' alignItems='flex-end' spacing={1}>
                        <Grid item>
                            <img src={item.imageUrl} alt={item.name} width='30px' height='30px'/>
                        </Grid>
                        <Grid item>
                            <h6>{item.name}</h6>
                        </Grid>
                    </Grid> 
                </Grid>
                <Grid container xs={3} justifyContent='space-between' alignItems='center' direction='row'>
                    <Grid item>
                        <span>${parseInt(item.price) * item.qty}</span>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
                            <Grid item>
                                <input type='number' value={value} min='1' max={`${item.countInStock}`} onChange={e=>handlerQty(item._id, e.target.value)} />
                            </Grid>
                            <Grid>
                                <IconButton aria-label="delete" className={classes.margin} onClick={()=>{handlerRemove(item._id)}}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}