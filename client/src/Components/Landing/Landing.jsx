import React, {useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import { Grid } from '@material-ui/core'
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
import banner from '../../media/banner.png'
import trio from '../../media/banner-trio.png'
import patagonia from '../../media/banner-patagonia.png'
import doritos from '../../media/banner-doritos.png'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'
import getProducts from '../../actions/getProducts'
import { useDispatch } from 'react-redux'


export default function Landing() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    

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
                        <img src={patagonia} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src={trio} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src={doritos} className="d-block w-100" alt="..."/>
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
                        <Grid container direction='column' alignItems='center' >
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Limpieza'}}>
                                <img width="40%" src={limpieza} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}} id='categories'>Limpieza</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Panaderia'}}>
                                <img width="40%" src={panaderia} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Panadería</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Perfumeria'}}>
                                <img width="40%" src={perfumeria} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Perfumería</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Bebidas' }}>
                                <img width="40%" src={bebidas} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Bebidas</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Carnes'}}>
                                <img width="40%" src={carnes} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Carnes</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Congelados'}}>
                                <img width="40%" src={congelados} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Congelados</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Fiambre'}}>
                                <img width="40%" src={fiambre} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Fiambres y Quesos</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Frutas'}}>
                                <img width="40%" src={frutas} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Frutas y Verduras</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Lacteos'}}>
                                <img width="40%" src={lacteos} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Lácteos</h6>
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container justifyContent='center' component={Link} to={{pathname: "/", data: 'Mascotas'}}>
                                <img width="40%" src={mascotas} />
                            </Grid>
                            <h6 style={{marginTop: '5px'}}>Mascotas</h6>
                        </Grid>
                    </Carousel.Item>
                </Carousel>
            </Grid>
            <Grid container xs={11} justifyContent='center' alignItems='center'>
                <Grid item>
                    <br />
                    <br />
                    <img src={banner} style={{width: '100%'}}/>
                </Grid>
            </Grid>
            <Grid item justifyContent='center' alignItems='center' >
                <br />
                <br />
                <h1 id='title'>Ofertas del mes</h1>
            </Grid>
            <Grid item xs={10}>
                <br />
                <Carousel cols={4} rows={1} gap={10} loop style={{marginTop: '20px'}}>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Grid container direction='column' alignItems='center'>
                            <Card />
                        </Grid>
                    </Carousel.Item>
                </Carousel>
                <br />
            </Grid>
        </Grid>
    )
}