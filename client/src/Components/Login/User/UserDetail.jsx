import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from "../../NavBar/NavBar";
import { Grid, Container, Breadcrumbs, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import getRoles from '../../../actions/users/getRoles';
import getUserById from '../../../actions/users/getUserById';
import modifyUser from '../../../actions/users/modifyUser';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


//Style
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    h1: {
      fontFamily: 'Raleway'
    },
    icon: {
      color: 'firebrick',
      margin: '3px'
    },
}));

export default function UserDetail() {

    const MySwal = withReactContent(Swal)
    const params = useParams();
    console.log('ESTE ES EL PARAMS', params)
    const classes = useStyles();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })
    const dispatch = useDispatch();
    const productReducer = useSelector(state => state.productReducer)
    const { userDetail } = productReducer

    useEffect(() => {
        dispatch(getUserById(params.id))
        setTimeout(() => {
            MySwal.fire({
                title: 'Querés conocer las mejores ofertas?',
                text: "No dejes de suscribirte para recibirlas por mail",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si, por favor!'
              }).then((result) => {
                if (result.isConfirmed) {
                  MySwal.fire(
                    'La tenés adentro, bicho!',
                    'Te vamos a llenar la cocina',
                    'success'
                  )
                }
              })
        }, 5000)
    },[])

    useEffect(() => {
        setUser({
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            email: userDetail.email,
        })
    },[userDetail])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmmit = (e) => {
        e.preventDefault()
        dispatch(modifyUser(user, userDetail._id))
        setUser({
            firstName: '',
            lastName: '',
            email: '',
        })

        MySwal({
            text: "Sus datos fueron modificados con éxito",
            icon: "success",
            buttons: false,
            timer: 1500,
          });
    }
    
    const handleRole = (e) => {
        setUser({
            ...user,
            role: [e.target.value]
        })
    }

    return (
        <>
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <NavBar/>
                </Grid>
                <Grid item xs={12}> 
                    <Container>
                        <br />
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="secondary" to="/admin/users" id='bread'>
                            <PeopleIcon className={classes.icon} />
                                Users
                            </Link>
                            <Typography color="textPrimary">Modificar Usuario</Typography>
                        </Breadcrumbs>
                        <br />
                        <Grid item xs={12}>
                            <br />
                            <h1 className={classes.h1}>Modificar Usuario</h1>
                        </Grid>
                        <Grid container justifyContent='center' direction='column' alignItems='center' xs={12}>
                            <form onSubmit={(e) => (handleSubmmit(e))}>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                                    <input required onChange={(e) => handleChange(e)} value={user.firstName} type="text" class="form-control" id="exampleFormControlInput1" name='firstName'/>
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Apellido</label>
                                    <input required onChange={(e) => handleChange(e)} value={user.lastName} type="text" class="form-control" id="exampleFormControlInput1" name='lastName'/>
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                                    <input required onChange={(e) => handleChange(e)} value={user.email} type="text" class="form-control" id="exampleFormControlInput1" name='email'/>
                                </div>
                                <Container>
                                    <Button variant="contained" color="secondary" type='submit'>
                                        Modificar usuario
                                    </Button>
                                </Container>
                            </form>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}
