import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Grid } from '@material-ui/core'

export default function Landing() {
    

    return (
        <Grid container xs={12}>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <br />
            <Grid item xs={12}>
                <h1>carrousel</h1>
            </Grid>
        </Grid>
    )
}
