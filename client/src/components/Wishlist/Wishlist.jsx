import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwt from 'jsonwebtoken'
import getWishlist from '../../actions/users/getWishlist'
import NavBar from '../NavBar/NavBar'
import {Grid} from '@material-ui/core'

export default function Wishlist(props) {

    //TOKEN
    const key = JSON.parse(sessionStorage.getItem("token"))?.token
        if(key){
            var decoded = jwt.verify(key, 'secret')
            var userId = (decoded.id)
        }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWishlist(userId))
    }, [])
    
    const productReducer = useSelector(state => state.productReducer)
    const {wishlist} = productReducer

    return (
        <Grid container xs={12} justifyContent='center' direction='column'>
            <Grid item xs={12}>
                <NavBar />
                <br />
            </Grid>
            <Grid item container xs={12} justifyContent='center'>
                <h1 id='title'>Favoritos</h1>
                {
                    wishlist?.map(p => <h1>{p.name}</h1>)
                }
            </Grid>
            
        </Grid>
    )
}