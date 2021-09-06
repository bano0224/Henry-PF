import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import AdminNav from '../AdminNav/AdminNav'
import { useDispatch, useSelector } from 'react-redux'
import getProductById from '../../../actions/getProductById'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import { DropzoneArea } from 'material-ui-dropzone';

export default function AdminModifyProduct({ match }) {
    const [product, setProduct] = useState('')
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProductById(match.params.id))
    }, [])

    const detail = useSelector( state => state.productDetail)

    setProduct({
        name: detail.name
    })

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
    }

    const handleSubmmit = (e) => {
        e.preventDefault()
        // dispatch(createProduct(product));
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
            <Container maxWidth='xs'>
                <form onSubmit={(e) => (handleSubmmit(e))}>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        {/* <input required onChange={(e) => handleChange(e)} value={product.name} type="text" class="form-control" id="exampleFormControlInput1" name='name'/> */}
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
                            <option value="6131166772d513f4eb58c18d">Lacteos</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Limpieza">Limpieza</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label required for="exampleFormControlInput1" class="form-label">Image</label>
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
                            Create new product
                        </Button>
                    </Container>
                </form>
            </Container>
        </>
    )
}
