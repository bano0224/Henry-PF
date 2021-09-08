import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import createProduct from '../../../actions/createProduct';
import AdminNav from '../AdminNav/AdminNav'
import { Container, Grid, Button, Switch }from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import getCategories from '../../../actions/getCategories'; 
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8)
    }
}));


export default function AdminAddProduct() {
    const classes = useStyles();
    const { register, handleSubmit } = useForm()
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        countInStock: '',
        imageUrl: [],
        featured: true,
        discount: '' 
    })
    const [categoriesToShow, setcategoriesToShow] = useState([])

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(getCategories())
    }, [])


    const handleChange = ({ target: { name, value } }) => {
        if (name === 'imageUrl') {
            setProduct({
                ...product,
                imageUrl: [value],
            });
        } else {
            setProduct({
                ...product,
                [name]: value,
            })
        }
    }

    const handleChangeFeatured = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.checked
        })
    }

    const handleCategory = (e, action, id) => {
        if(action === 'delete'){
            setcategoriesToShow(categoriesToShow.filter(category => category._id !== id))
        } else {
            setcategoriesToShow([...categoriesToShow, JSON.parse(e.target.value)])
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    // const handleSubmmit = (e) => {
    //     e.preventDefault()
    //     dispatch(createProduct(product));
    //     alert(`${product.name} created`)
    //     setProduct({
    //         name: '',
    //         description: '',
    //         price: 0,
    //         countInStock: 0,
    //         imageUrl: [],
    //         category: [],
    //         featured: 0,
    //         discount: '' || 0
    //     })
    // }

    return (
        <>
            <Grid conteiner >
                <Grid item xs={12}>
                    <AdminNav />
                </Grid>
                <Grid item xs={12}>  
                <br />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ArrowBackIcon />}
                    component={Link} 
                    to='/admin/products'
                    style= {{textDecoration: 'none'}}
                    id='button'
                >
                    Back
                </Button>
                    <Container maxWidth='md'>
                        <div className={classes.formWrapper} >
                            <h1>Create new product</h1>
                            <br />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <label for="name" class="form-label">Name*</label>
                                        <input 
                                            class="form-control" 
                                            id="name" 
                                            name='name'
                                            ref={
                                                register({
                                                    required: {value: true}
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label for="form_message">Description *</label> 
                                        <textarea id="form_message" name="description" class="form-control" rows="4">
                                        </textarea>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label for="price" class="form-label">Price*</label>
                                        <input required onChange={(e) => handleChange(e)} value={product.price} name='price' type="number" class="form-control" id="price" placeholder={0} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label for="stock" class="form-label">Stock*</label>
                                        <input required onChange={(e) => handleChange(e)} value={product.countInStock} name='countInStock' type="number" class="form-control" id="stock" placeholder={0} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label for="exampleFormControlInput1" class="form-label">Discount</label>
                                        <input required onChange={(e) => handleChange(e)} value={product.discount} name='discount' type="number" class="form-control" id="exampleFormControlInput1" placeholder={0} />
                                    </Grid>
                                    <Grid item md={6}>
                                        <label for="exampleFormControlInput1" class="form-label">Featured</label> 
                                        <Switch
                                            checked={product.featured}
                                            onChange={handleChangeFeatured}
                                            name="featured"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <label for="exampleFormControlInput1" class="form-label">Category*</label> 
                                        <select required class="form-select" aria-label="Default select example" onChange={(e) => {handleCategory(e)}}>
                                            <option selected>-</option>
                                            {
                                                categories.map(category => <option value={JSON.stringify(category)}>{category.name}</option>)
                                            }
                                        </select>
                                        <br />
                                        <ul>
                                            {
                                                categoriesToShow.length !== 0
                                                ? categoriesToShow.map(c => 
                                                    <div>
                                                        <li>
                                                            {c.name}
                                                            <button onClick={e => handleCategory(e, 'delete', c._id)}>X</button>
                                                        </li>
                                                    </div>)
                                                : <li>No categories yet</li>
                                            }
                                        </ul>
                                    </Grid>
                                    <Grid item md={6}>
                                        <label required for="exampleFormControlInput1" class="form-label">Image*</label>
                                        <DropzoneArea
                                            acceptedFiles={['image/*']}
                                            dropzoneText={"Drag and drop an image here or click"}
                                            clearOnUnmount={true}
                                            onChange={image => handleChange({ target: { name: 'imageUrl', value: image[0] } })}
                                            onDelete={deletedImage => {
                                                setProduct({
                                                    ...product,
                                                    imageUrl: [],
                                                });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <Grid 
                                    container md={12}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center" 
                                >
                                    <Button variant="contained" color="secondary" type='submit'>
                                        Create new product
                                    </Button>
                                </Grid>
                            </form>
                        </div>
                    </Container>
                </Grid>
            </Grid>
            <br />
        </>
    )
}
