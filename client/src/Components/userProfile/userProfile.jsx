import React from 'react'
import NavBar from '../NavBar/NavBar'
import {Grid} from '@material-ui/core'
import { useSelector } from 'react-redux'

export default function UserProfile(props) {
    const productReducer = useSelector(state => state.productReducer)
    const {userDetail} = productReducer
    
    return (
        <>
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <NavBar />
                    <br />
                </Grid>
                <Grid item xs={12} justifyContent='center'>
                    <Grid container direction='row' xs={10}>
                        <Grid item xs={2}>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </Grid>
                        <Grid item xs={10}>
                            <h1>{`${userDetail.firstName} ${userDetail.lastName}`}</h1>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}
