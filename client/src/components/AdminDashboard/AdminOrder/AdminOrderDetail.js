import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import { Breadcrumbs, Typography, IconButton, Button, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderItem from '../../UserProfile/OrderItem'
import getOrderById from '../../../actions/order/getOrderById'
import ModifyStatus from './ModifyStatus'
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    icon: { 
      color: 'firebrick'
    },
    paper: {
        padding: '10px',
    },
    capitalize: {
        textTransform: 'capitalize'
    }
}));

export default function AdminOrderDetail({match}) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [editStatus, setEditStatus] = useState(false)

    useEffect(() => {
        dispatch(getOrderById(match.params.id))
        setEditStatus(false)
    }, [dispatch])

    const productReducer = useSelector(state => state.productReducer)
    const { orderDetail } = productReducer
    
    const handleClick = () => {
        setEditStatus(true)
    }

    return (
        <>
            <AdminNav/>
            <br />
            <br />
            <Container maxWidth='md'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="secondary" to="/admin/orders" id='bread'>
                    <ShoppingBasketIcon className={classes.icon} />
                        Ordenes
                    </Link>
                    <Typography color="textPrimary">Detalle de Orden</Typography>
                </Breadcrumbs>
                <br />
                {
                    orderDetail._id
                    ? <>
                        <Paper className={classes.paper}>
                            <Grid container xs={12} direction='column'>
                                <Grid item>
                                    <h3>{`Orden ID: #${orderDetail._id}`}</h3>
                                    <hr />
                                </Grid>
                                <Grid item >
                                    <Grid container direction='row' justifyContent='space-around'>
                                        <Grid item xs={6}>
                                            {
                                                editStatus
                                                ? <Grid container direction='row' xs={12} alignItems='center'>
                                                    <Grid item>
                                                        <h5>{`Estado: `}</h5>
                                                    </Grid> 
                                                    <Grid item>
                                                        <ModifyStatus id={orderDetail._id}/>
                                                    </Grid>
                                                </Grid>
                                                : <Grid container direction='row' alignItems='center'  xs={12}>
                                                    <Grid item>
                                                        <h5>{`Estado: ${orderDetail.status}`}</h5> 
                                                    </Grid> 
                                                    <Grid item>
                                                        <Button onClick={()=>{handleClick()}}>
                                                            <EditIcon/>
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            }
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h5>{`Fecha: ${orderDetail.dateOrdered}`}</h5>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container justifyContent='space-around' alignItems='center' direction='row' xs={12}>
                                        <Grid item xs={6}>
                                            <h6 className={classes.capitalize}>{`Usuario: ${orderDetail.user.firstName} ${orderDetail.user.lastName}`}</h6>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h6>{`Usuario ID: #${orderDetail?.user._id}`}</h6>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container justifyContent='space-around' alignItems='center' direction='row' xs={12}>
                                        <Grid item xs={6}>
                                            <h6>{`Email: ${orderDetail.user.email}`}</h6>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h6>{`Dirección: ${orderDetail.address1}`}</h6>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container justifyContent='space-around' alignItems='center' direction='row' xs={12}>
                                        <Grid item xs={6}>
                                            <h6>{`Ciudad: ${orderDetail.city}`}</h6>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h6>{`Código postal: ${orderDetail.postCode}`}</h6>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        <br />
                        <Grid item>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="cart"
                                >
                                    <Typography variant="h6" id="cart">Carrito</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction='column' spacing={2}>
                                        {orderDetail.products?.map(product => (
                                                <>
                                                    <OrderItem
                                                    product={product}
                                                    />
                                                </>
                                        ))}
                                        <Divider />
                                        <Grid container justifyContent='flex-end' alignItems='center' className={classes.container}>
                                            <Grid container xs={3} justifyContent='space-around' alignItems='center' direction='row'>
                                                <Grid item>
                                                    <span>Total</span>
                                                </Grid>
                                                <Grid item>
                                                    <span>{`$${orderDetail.products?.map(p => p.price).reduce((a,b) => a+b)}`}</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <br />
                    </>
                    : <span>Cargando...</span>
                }
            </Container>
        </>
    )
}