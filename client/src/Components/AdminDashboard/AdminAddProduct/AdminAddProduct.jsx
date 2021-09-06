import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import createProduct from '../../../actions/createProduct';
import AdminNav from '../AdminNav/AdminNav'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import { DropzoneArea } from 'material-ui-dropzone';

export default function AdminAddProduct(props) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        imageUrl: [],
        category: [],
        featured: true,
        discount: '' || 0
    })
    const [categories, setCategories] = useState([])
    console.log(categories)

    const dispatch = useDispatch()

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

    const handleCategory = (e) => {
        setProduct({
            ...product,
            category: [...product.category, e.target.value]
        })

        switch(e.target.value){
            case '6132cd9084e09f6626fcae25':
                return setCategories([...categories, 'Almacén'])
            case '6132cef8a6fafa3682b978f9':
                return setCategories([...categories, 'Bebidas'])
            case '6132cf51a6fafa3682b978fc':
                return setCategories([...categories, 'Carnes'])
            case '6132cf71a6fafa3682b978ff':
                return setCategories([...categories, 'Frutas y Verduras'])
            case '6132cf90a6fafa3682b97902':
                return setCategories([...categories, 'Lácteos'])
            case '6132cfa8a6fafa3682b97905':
                return setCategories([...categories, 'Perfumería'])
            case '6132cfc1a6fafa3682b97908':
                return setCategories([...categories, 'Limpieza'])
            case '6132cfd9a6fafa3682b9790b':
                return setCategories([...categories, 'Quesos y fiambres'])
            case '6132d07ca6fafa3682b97911':
                return setCategories([...categories, 'Panadería y repostería'])
            case '6132cff3a6fafa3682b9790e':
                return setCategories([...categories, 'Congelados'])
            case '6132d08ba6fafa3682b97914':
                    return setCategories([...categories, 'Comida preparada'])
            case '6132d0b1a6fafa3682b97917':
                return setCategories([...categories, 'Mascotas'])
        }
        
    }

    const handleSubmmit = (e) => {
        e.preventDefault()
        dispatch(createProduct(product));
        alert(`${product.name} created`)
        setProduct({
            name: '',
            description: '',
            price: 0,
            countInStock: 0,
            imageUrl: [],
            category: [],
            featured: 0,
            discount: '' || 0
        })
    }

    return (
        <>
            <AdminNav/>
            <hr />
            <Container>
                <h1>Add product</h1>
            </Container>
            <Container maxWidth='xs'>
                <form onSubmit={(e) => (handleSubmmit(e))}>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input required onChange={(e) => handleChange(e)} value={product.name} type="text" class="form-control" id="exampleFormControlInput1" name='name'/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea required onChange={(e) => handleChange(e)} value={product.description} name='description' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Price</label>
                        <input required onChange={(e) => handleChange(e)} value={product.price} name='price' type="number" class="form-control" id="price"/>
                        <label for="stock" class="form-label">Stock</label>
                        <input required onChange={(e) => handleChange(e)} value={product.countInStock} name='countInStock' type="number" class="form-control" id="stock"/>
                        <label for="exampleFormControlInput1" class="form-label">Discount</label>
                        <input required onChange={(e) => handleChange(e)} value={product.discount} name='discount' type="number" class="form-control" id="exampleFormControlInput1"/>
                    </div>   
                    <label for="exampleFormControlInput1" class="form-label">Featured</label> 
                    <Switch
                        checked={product.featured}
                        onChange={handleChangeFeatured}
                        name="featured"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Category</label> 
                        <select required class="form-select" aria-label="Default select example" onChange={(e) => handleCategory(e)}>
                            <option selected>-</option>
                            <option value={'6132cd9084e09f6626fcae25'} name='Almacén'>Almacén</option>
                            <option value={'6132cef8a6fafa3682b978f9'} name='Bebidas'>Bebidas</option>
                            <option value={'6132cf51a6fafa3682b978fc'} name='Carnes'>Carnes</option>
                            <option value={'6132cf71a6fafa3682b978ff'} name='Frutas  y verduras'>Frutas y verduras</option>
                            <option value={'6132cf90a6fafa3682b97902'} name='Lácteos'>Lácteos</option>
                            <option value={'6132cfa8a6fafa3682b97905'} name='Perfumería'>Perfumería</option>
                            <option value={'6132cfc1a6fafa3682b97908'} name='Limpieza'>Limpieza</option>
                            <option value={'6132cfd9a6fafa3682b9790b'} name='Quesos y fiambres'>Quesos y fiambres</option>
                            <option value={'6132cff3a6fafa3682b9790e'} name='Congelados'>Congelados</option>
                            <option value={'6132d07ca6fafa3682b97911'} name='Panadería y repostería'>Panadería y repostería</option>
                            <option value={'6132d08ba6fafa3682b97914'} name='Comida preparada'>Comidas preparadas</option>
                            <option value={'6132d0b1a6fafa3682b97917'} name='Mascotas'>Mascotas</option>
                        </select>
                    </div>
                    <ul>
                        {
                            categories.length !== 0
                            ? categories.map(c => <li>{c}</li>)
                            : <li>No categories yet</li>
                        }
                    </ul>
                    <div class="mb-2">
                        <label required for="exampleFormControlInput1" class="form-label">Image</label>
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
                            Create new product
                        </Button>
                    </Container>
                </form>
            </Container>
            
        </>
    )
}
