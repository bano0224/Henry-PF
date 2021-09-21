import React from 'react'
import './Confirmation.css'
import NavBar from '../../Components/NavBar/NavBar'
import {Grid} from '@material-ui/core'

const Confirmation = () => {
    return (
        <Grid container xs={12}>
        <NavBar/>
        <div class='body'>
            <div class="card">
    <div class="title">Su orden fue confirmada!</div>
    <div class="info">
        <div class="imageContainer">
            <img class='image' src='https://images.vexels.com/media/users/3/157931/isolated/lists/604a0cadf94914c7ee6c6e552e9b4487-icono-de-circulo-de-marca-de-verificacion-curvo.png' alt='Compra confirmada' />
        </div>
    </div>
    <div class="tracking">
        <div class="title">Seguimiento del pedido</div>
    </div>
    <div class="progress-track">
        <ul id="progressbar">
            <li class="step0 active " id="step1">Carrito</li>
            <li class="step0 active text-center" id="step2">Enviado</li>
            <li class="step0 active text-right" id="step3">En camino</li>
            <li class="step0 text-right" id="step4">Entregado</li>
        </ul>
    </div>
    <div class="footer">
    </div>
</div>
        </div>
        </Grid>
    )
}

export default Confirmation
