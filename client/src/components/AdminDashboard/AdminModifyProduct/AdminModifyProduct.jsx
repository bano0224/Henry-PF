import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import AdminNav from '../AdminNav/AdminNav'
import { useDispatch, useSelector } from 'react-redux'
import getProductById from '../../../actions/getProductById'
import {Button, Breadcrumbs, Typography} from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import { DropzoneArea } from 'material-ui-dropzone'
import { Link } from 'react-router-dom'
import modifyProduct from '../../../actions/modifyProduct'
import getCategories from '../../../actions/getCategories'
import { makeStyles } from '@material-ui/core/styles';
import CategoryIcon from '@material-ui/icons/Category'
import getUsers from '../../../actions/getUsers'
import sendEmail from '../../../actions/sendEmail'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: '1.3em',
      fontWeight: '500',
      fontFamily: 'Raleway',
    },
    h1: {
      fontFamily: 'Raleway'
    },
    icon: {
      color: 'firebrick'
    },
    total: {
        padding: '5px',
        minHeight: '300px'
    },
    topay: {
        fontWeight: '700'
    }
}));

export default function AdminModifyProduct({ match }) {
    const classes = useStyles();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        imageUrl: [],
        featured: 0,
        discount: '' || 0
    });
    const [categoriesToShow, setCategoriesToShow] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProductById(match.params.id))
        dispatch(getCategories());
        dispatch(getUsers());
    }, [])

    const detail = useSelector( state => state.productReducer)
    const {productDetail, categories} = detail
    const productReducer = useSelector((state) => state.productReducer)
    const { users } = productReducer

    const userSubscription = users.filter(user => user.subscription === true)
    

    useEffect(() => {
        if (productDetail.category && categories) {
            const categoriesInProduct = productDetail.category.reduce((acc, el) => {
                acc[el] = true
                return acc;
            }, {});
            setCategoriesToShow(categories.filter(category => categoriesInProduct[category._id]))
        }
        setProduct({
            name: productDetail.name,
            description: productDetail.description,
            price: productDetail.price,
            countInStock: productDetail.countInStock,
            imageUrl: productDetail.imageUrl,
            featured: productDetail.featured,
            discount: productDetail.discount,
        });
    }, [productDetail, categories])

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

    const handleCategory = (e, toDo, id) => {
        if (toDo === 'delete') {
            setCategoriesToShow(categoriesToShow.filter(category => category._id !== id));
        } else {
            setCategoriesToShow([...categoriesToShow, JSON.parse(e.target.value)])
        }
    }

    const handleSubmmit = (e) => {
        e.preventDefault()
        dispatch(sendEmail(userSubscription))
        dispatch(modifyProduct({...product, category: categoriesToShow.map(cat => cat._id), _id: productDetail._id}));
        alert(`${product.name} modified`)
        setProduct({
            name: '',
            description: '',
            price: 0,
            countInStock: 0,
            imageUrl: [],
            featured: 0,
            discount: '' || 0
        })


    }

    return (
        <>
            <AdminNav/>
            <br />
            <Container maxWidth='md'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="secondary" to="/admin/products" id='bread'>
                    <CategoryIcon className={classes.icon} />
                        Productos
                    </Link>
                    <Typography color="textPrimary">Modificar Producto</Typography>
                </Breadcrumbs>
                <br />
                <form onSubmit={(e) => (handleSubmmit(e))}>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                        <input onChange={(e) => handleChange(e)} value={product.name} type="text" class="form-control inputFrom"  id="exampleFormControlInput1" name='name' placeholder={detail.name}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                        <textarea onChange={(e) => handleChange(e)} value={product.description} name='description' class="form-control inputFrom" id="exampleFormControlTextarea1" rows="3" placeholder={detail.description}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Precio</label>
                        <input onChange={(e) => handleChange(e)} value={product.price} name='price' type="number" class="form-control inputFrom" id="price" placeholder={detail.price}/>
                        <label for="stock" class="form-label">Stock</label>
                        <input onChange={(e) => handleChange(e)} value={product.countInStock} min ='0' name='countInStock' type="number" class="form-control inputFrom" id="stock" placeholder={detail.countInStock}/>
                        <label for="exampleFormControlInput1" class="form-label">Descuento</label>
                        <input onChange={(e) => handleChange(e)} value={product.discount} min ='0'name='discount' type="number" class="form-control inputFrom" id="exampleFormControlInput1" placeholder={detail.discount}/>
                    </div>   
                    <label for="exampleFormControlInput1" class="form-label">Destacado</label> 
                    <Switch
                        checked={product.featured}
                        onChange={handleChangeFeatured}
                        name="featured"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Categoría</label> 
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleCategory(e)}>
                            <option value={''}>-</option>
                            {
                                categories.map(el => <option value={JSON.stringify(el)}>{el.name}</option>)
                            }
                        </select>
                            <ul>
                                {
                                    categoriesToShow?.map(el => (
                                        <div>
                                            
                                            <li>
                                                {el.name}
                                                <Button onClick={e => handleCategory(e, 'delete', el._id)} >X</Button>
                                            </li>
                                        </div>
                                    ))
                                }
                            </ul>
                    </div>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Imagen</label>
                        {/* <input type="file" accept="image/*" onChange={(e) => handleChange(e)} name='imageUrl' class="form-control" id="exampleFormControlInput1"/> */}
                        {/* <input type="file" accept='image/*' onChange={handleChange} />
                         */}
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
                    </div>
                    <Container>
                        <Button variant="contained" color="secondary" type='submit'>
                            Modificar producto
                        </Button>
                    </Container>
                </form>
            </Container>
        </>
    )
}
