import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import AdminNav from '../AdminNav/AdminNav'
import { useDispatch, useSelector } from 'react-redux'
import getProductById from '../../../actions/getProductById'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import { DropzoneArea } from 'material-ui-dropzone';
import modifyProduct from '../../../actions/modifyProduct'

export default function AdminModifyProduct({ match }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        imageUrl: [],
        category: [],
        featured: 0,
        discount: '' || 0
    })
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProductById(match.params.id))
    }, [])

    const detail = useSelector( state => state.productDetail)
    
    const categories = useSelector( state => state.categories)

    

    // setTimeout(() => {
    //     setProduct({
    //         ...product,
    //         category: detail.category[0]?.name
    //     }) 
    // }, 3000)

    // useEffect(() =>{
    //     console.log(detail?.category[0])
    //     // console.log('ESTE ES EL DETaIL', detail)
    //     // const cat = detail.category[0]?.name
        
    // }, [detail])

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
        dispatch(modifyProduct(product));
        alert(`${product.name} created`)
        setProduct({
            name: '',
            description: '',
            price: 0,
            countInStock: 0,
            imageUrl: [],
            category: '',
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
                        <input onChange={(e) => handleChange(e)} value={product.name} type="text" class="form-control" id="exampleFormControlInput1" name='name' placeholder={detail.name}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea onChange={(e) => handleChange(e)} value={product.description} name='description' class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder={detail.description}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Price</label>
                        <input onChange={(e) => handleChange(e)} value={product.price} name='price' type="number" class="form-control" id="price" placeholder={detail.price}/>
                        <label for="stock" class="form-label">Stock</label>
                        <input onChange={(e) => handleChange(e)} value={product.countInStock} name='countInStock' type="number" class="form-control" id="stock" placeholder={detail.countInStock}/>
                        <label for="exampleFormControlInput1" class="form-label">Discount</label>
                        <input onChange={(e) => handleChange(e)} value={product.discount} name='discount' type="number" class="form-control" id="exampleFormControlInput1" placeholder={detail.discount}/>
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
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleCategory(e)}>
                            {
                                categories?.map(el => <option value={el.id}>{el.name}</option>)
                            }
                        </select>
                            <ul>
                                {
                                    detail.category[0]?.name.length
                                    ? detail.category[0]?.name.map(el => <li>{el}</li>)
                                    : <li>{detail.category[0]?.name}</li>
                                }
                            </ul>
                    </div>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Image</label>
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
