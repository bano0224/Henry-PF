import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import { Grid, Container, Breadcrumbs, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

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

export default function AdminModifyuser(props) {
    const classes = useStyles();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: []
    })
    const dispatch = useDispatch();
    const productReducer = useSelector(state => state.productReducer)
    const { users } = productReducer

    useEffect(() => {
        setUser({
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            role: users.role
        })
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmmit = (e) => {
        e.preventDefault()
        // dispatch(modifyCategory({...category, _id:categoryDetail._id}))
        alert(`Usuario modificado`)
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            role: []
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
                                    <input required onChange={(e) => handleChange(e)} value={user.firstName} type="text" class="form-control" id="exampleFormControlInput1" name='name'/>
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Apellido</label>
                                    <input required onChange={(e) => handleChange(e)} value={user.lastName} type="text" class="form-control" id="exampleFormControlInput1" name='name'/>
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                                    <input required onChange={(e) => handleChange(e)} value={user.email} type="text" class="form-control" id="exampleFormControlInput1" name='name'/>
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
