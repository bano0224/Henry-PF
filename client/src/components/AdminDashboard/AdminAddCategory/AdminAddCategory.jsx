import React, { useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import { Container, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import createCategory from '../../../actions/createCategory';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8)
    }
}));

export default function AdminAddCategory(props) {
    const classes = useStyles();
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: []
    })

    const dispatch = useDispatch()    

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'image') {
            setCategory({
                ...category,
                image: [value],
            });
        } else {
            setCategory({
                ...category,
                [name]: value,
            })
        }
    }
    
    const handleSubmmit = (e) => {
        e.preventDefault()
        dispatch(createCategory(category));
        alert(`${category.name} created`)
        setCategory({
            name: '',
            description: '',
            image: []
        })
    }

    return (
        <>
            <AdminNav /> 
            <br />
            <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ArrowBackIcon />}
                    component={Link} 
                    to='/admin/categories'
                    style= {{textDecoration: 'none'}}
                    id='button'
                >
                    Volver
                </Button>
            <Container>
                <h1>Agregar Categoría</h1>
            </Container>
            <Container maxWidth='xs'>
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
                            Crar nueva categoría
                        </Button>
                    </Container>
                </form>
            </Container>
        </>
    )
}
