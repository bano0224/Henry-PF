import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwt from 'jsonwebtoken'
import getWishlist from '../../actions/users/getWishlist'
import NavBar from '../NavBar/NavBar'
import {Grid,Button} from '@material-ui/core'
import { Link } from 'react-router-dom'
import deleteWishItem from '../../actions/users/deleteWishItem'

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

    const handleClick = (itemId, usuarioId) => {
        dispatch(deleteWishItem(itemId, usuarioId))
        dispatch(getWishlist(userId))
    }

    return (
        <Grid container xs={12} justifyContent='center' direction='column'>
            <Grid item xs={12}>
                <NavBar />
                <br />
            </Grid>
            <Grid container xs={12} justifyContent='center' direction='column' alignItems='center'>
                <Grid item xs={10}>
                    <h1 id='title'>Favoritos</h1>
                </Grid>
                <Grid item xs={10}>
                    <ul>
                        {
                            wishlist?.map(p => <li><Link to={`/detail/${p._id}`} id='link'>{p.name}</Link><Button onClick={() => {handleClick(p._id, userId)}}>x</Button></li>)
                        }
                    </ul>
                </Grid>
            </Grid>
        </Grid>
    )
}