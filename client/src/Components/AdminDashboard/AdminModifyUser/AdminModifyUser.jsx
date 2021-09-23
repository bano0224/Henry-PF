import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNav from '../AdminNav/AdminNav'
import { Grid, Container, Breadcrumbs, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import getRoles from '../../../actions/users/getRoles';
import getUserById from '../../../actions/users/getUserById';
import modifyUser from '../../../actions/users/modifyUser';
import swal from "sweetalert";

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

export default function AdminModifyUser({match}) {
    const history = useHistory();
    const classes = useStyles();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: []
    })
    const dispatch = useDispatch();
    const productReducer = useSelector(state => state.productReducer)
    const { roles, userDetail } = productReducer

    useEffect(() => {
        dispatch(getRoles())
        dispatch(getUserById(match.params.id))
    },[])

    useEffect(() => {
        setUser({
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            email: userDetail.email,
            role: userDetail.role
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
            role: []
        })

        swal({
            title: "Cambio de usuario realizado",
            text: "La modificación ha sido exitosa!",
            icon: "success",
            buttons: false,
            timer: 2000,
          });

          setTimeout(() => {
            history.push("/admin/users");
          }, 2500);
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
                    <AdminNav/>
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
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Rol</label>
                                    
                                        
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleRole(e)}>
                                            <option>-</option>
                                            { 
                                                roles?.map(r => {
                                                    // if(r.name === userDetail?.role[0].name){
                                                    //     return <option selected value={r.name}>{r.name}</option>
                                                    // } else {
                                                    //     return <option value={r.name}>{r.name}</option>
                                                    // }
                                                    return <option value={r._id}>{r.name}</option>
                                                })
                                            }
                                        </select>
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
