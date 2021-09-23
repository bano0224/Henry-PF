import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Grid } from '@material-ui/core'
import prueba from '../../media/prueba.png'
import prueba2 from '../../media/prueba2.png'
import prueba3 from '../../media/prueba3.png'
import Carousel from 'react-grid-carousel'
import limpieza from '../../media/categories/limpieza.png'
import panaderia from '../../media/categories/panaderia.png'
import perfumeria from '../../media/categories/perfumeria.png'
import bebidas from '../../media/categories/bebidas.png'
import carnes from '../../media/categories/carnes.png'
import congelados from '../../media/categories/congelados.png'
import fiambre from '../../media/categories/fiambre.png'
import frutas from '../../media/categories/frutas.png'
import lacteos from '../../media/categories/lacteos.png'
import mascotas from '../../media/categories/mascotas.png'

export default function Landing() {
    

    return (
        <Grid container xs={12} justifyContent='center'>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <br />
            <Grid item xs={12}>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={prueba} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src={prueba2} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src={prueba3} className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <br />
            </Grid>
            <Grid item container justifyContent='center' alignItems='center' >
                <h1 id='title'>Categorías</h1>
            </Grid>
            <Grid item xs={10}>
            <br />
                <br />
                <Carousel cols={5} rows={1} gap={10} loop style={{marginTop: '20px'}}>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={limpieza} />
                            <h6 style={{marginTop: '5px'}}>Limpieza</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={panaderia} />
                            <h6 style={{marginTop: '5px'}}>Panadería</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={perfumeria} />
                            <h6 style={{marginTop: '5px'}}>Perfumería</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={bebidas} />
                            <h6 style={{marginTop: '5px'}}>Bebidas</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={carnes} />
                            <h6 style={{marginTop: '5px'}}>Carnes</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={congelados} />
                            <h6 style={{marginTop: '5px'}}>Congelados</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={fiambre} />
                            <h6 style={{marginTop: '5px'}}>Fiambres y Quesos</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={frutas} />
                            <h6 style={{marginTop: '5px'}}>Frutas y Verduras</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={lacteos} />
                            <h6 style={{marginTop: '5px'}}>Lácteos</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <img width="40%" src={mascotas} />
                            <h6 style={{marginTop: '5px'}}>Mascotas</h6>
                        </Grid>
                    </Carousel.Item>
                </Carousel>
            </Grid>
            <Grid item id='title' justifyContent='center' alignItems='center' >
                <br />
                <br />
                <h1>Ofertas del mes</h1>
            </Grid>
        </Grid>
    )
}
