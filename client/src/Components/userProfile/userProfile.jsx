import React, { useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import {Grid} from '@material-ui/core'
import { makeStyles, Accordion, AccordionSummary, Typography, AccordionDetails, Divider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import getOrderByUser from '../../actions/order/getOrderByUser'
import jwt from 'jsonwebtoken'
import getUserById from "../../actions/users/getUserById";
import ProductItem from './productItem'

//Style
const useStyles = makeStyles((theme) => ({
    name: {
      textTransform: 'capitalize',
    },

}));


export default function UserProfile(props) {
    const classes = useStyles();
    const productReducer = useSelector(state => state.productReducer)
    const {userDetail, orderByUser} = productReducer
    const dispatch = useDispatch()

    //TOKEN
    const key = JSON.parse(sessionStorage.getItem("token"))?.token
    if(key){
        var decoded = jwt.verify(key, 'secret')
    }
    console.log('DETAIL', userDetail._id);

    useEffect(() => {
        dispatch(getUserById(decoded.id))
    }, [])

    useEffect(() => {
        dispatch(getOrderByUser(userDetail?._id))
    }, [userDetail])

    return (
        <>
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <NavBar />
                    <br />
                </Grid>
                <Grid container xs={12} justifyContent='center' alignItems='center'>
                    <Grid container item direction='column' xs={10}>
                        <Grid item xs={12}>
                            <h1 className={classes.name}>{`${userDetail.firstName} ${userDetail.lastName}`}</h1>
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <h5>Ordenes:</h5>
                            {
                                orderByUser?.map(o => {
                                    return (
                                        <Accordion>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="cart"
                                            >
                                                <Typography className={classes.heading} id="cart">Orden #{o._id}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container direction='column' spacing={2}>
                                                    {o.products?.map(product => (
                                                            <>
                                                                <ProductItem
                                                                product={product}
                                                                />
                                                                <Divider />
                                                            </>
                                                    ))}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            }
                            
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
