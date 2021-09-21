import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    container: {
        fontFamily: 'Raleway',
        /* fontSize: "30%" */
    }
  }));

export default function Cart({item, handlerQty, handlerRemove}) {
    const classes = useStyles();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



    return (
        <>
            <Grid container justifyContent='space-between' alignItems='center' className={classes.container}>
                <Grid item >
                    <Grid container direction='row' justifyContent='center' alignItems='flex-end' spacing={1}>
                        <Grid item>
                            <img src={item.imageUrl} alt={item.name} width='30px' height='30px'/>
                        </Grid>
                        <Grid item>
                            <h6>{item.name}</h6>
                        </Grid>
                    </Grid> 
                </Grid>
                <Grid container xs={12} justifyContent='space-between' alignItems='center' direction='row'>
                    <Grid item>
                        <span>${parseInt(item.price) * item.qty}</span>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
                            <Grid item>
                                <select onChange={e=>handlerQty(item._id, e.target.value)} class="form-select" aria-label="Default select example">
                                {
                                        numbers.map(n => {
                                            if(n == item.qty){
                                                return <option selected value={n}>{n}</option>
                                            } else {
                                                return <option value={n}>{n}</option>
                                            }
                                        })
                                    }
                                </select>
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
