import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import { Grid, Container, Button, Breadcrumbs, Typography} from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import getCategoryById from '../../../actions/categories/getCategoryById'
import modifyCategory from '../../../actions/categories/modifyCategory';
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

//Style
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    h1: {
      fontFamily: 'Raleway'
    },
    icon: {
      color: 'firebrick'
    },
}));

export default function AdminModifyCategory({match}) {
    const classes = useStyles();
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: []
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategoryById(match.params.id))
    }, [])

    const productReducer = useSelector(state => state.productReducer)
    const { categoryDetail } = productReducer

    useEffect(() => {
        setCategory({
            name: categoryDetail.name,
            description: categoryDetail.description,
            image: categoryDetail.image,
        });
    }, [categoryDetail])

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmmit = (e) => {
        e.preventDefault()
        dispatch(modifyCategory({...category, _id:categoryDetail._id}))
        alert(`${category.name} modified`)
        setCategory({
            name: '',
            description: '',
            image: []
        })
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <AdminNav />
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <br />
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="secondary" to="/admin/categories" id='bread'>
                            <HomeIcon className={classes.icon} />
                                Categorías
                            </Link>
                            <Typography color="textPrimary">Modificar categoría</Typography>
                        </Breadcrumbs>
                        <Grid item xs={12}>
                            <br />
                            <h1>Modificación de categoría</h1>
                        </Grid>
                        <Grid container justifyContent='center' direction='column' alignItems='center'>
                            <form onSubmit={(e) => (handleSubmmit(e))}>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                                    <input required onChange={(e) => handleChange(e)} value={category.name} type="text" class="form-control" id="exampleFormControlInput1" name='name'/>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                                    <textarea required onChange={(e) => handleChange(e)} value={category.description} name='description' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div class="mb-2">
                                    <label required for="exampleFormControlInput1" class="form-label">Imagen</label>
                                    <DropzoneArea
                                        acceptedFiles={['image/*']}
                                        dropzoneText={"Drag and drop an image here or click"}
                                        clearOnUnmount={true}
                                        onChange={image => handleChange({ target: { name: 'image', value: image[0] } })}
                                        onDelete={deletedImage => {
                                            setCategory({
                                                ...category,
                                                image: [],
                                            });
                                        }}
                                    />
                                </div>
                                <Container>
                                    <Button variant="contained" color="secondary" type='submit'>
                                        Modificar categoría
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
