import React, { useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import {Grid} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import getOrderByUser from '../../actions/order/getOrderByUser'
import jwt from 'jsonwebtoken'
import getUserById from "../../actions/users/getUserById";


export default function UserProfile(props) {
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
                <Grid item xs={12} justifyContent='center'>
                    <Grid container direction='row' xs={10}>
                        <Grid item xs={3}>
                            <span>Ordenes:</span>
                            <ul>
                                {
                                    orderByUser?.map(o => <li>{o._id}</li>)
                                }
                            </ul>
                        </Grid>
                        <Grid item xs={9}>
                            <h1>{`${userDetail.firstName} ${userDetail.lastName}`}</h1>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
