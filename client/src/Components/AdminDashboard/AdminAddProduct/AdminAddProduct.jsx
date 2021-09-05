import React, { useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import Container from '@material-ui/core/Container/Container'

export default function AdminAddProduct(props) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        countInStock: '',
        imageUrl: '',
        category: '',
        featured: '',
        discount: ''
    })

const handleChange = (e) => {
    setProduct({
        ...product,
        [e.target.name]: e.target.value
    })
}


// const handleSubmmit = () => {
//     onSubmit={(e) => handleSubmit(e)}
// }
console.log(product)

    return (
        <>
            <AdminNav/>
            <hr />
            <Container>
                <h1>Add product</h1>
            </Container>
            <Container maxWidth='xs'>
                <form >
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input onChange={(e) => handleChange(e)} value={product.name} type="text" class="form-control" id="exampleFormControlInput1" name='name'/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea onChange={(e) => handleChange(e)} value={product.description} name='description' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Price</label>
                        <input onChange={(e) => handleChange(e)} value={product.price} name='price' type="number" class="form-control" id="exampleFormControlInput1"/>
                        <label for="exampleFormControlInput1" class="form-label">Stock</label>
                        <input onChange={(e) => handleChange(e)} value={product.countInStock} name='countInStock' type="number" class="form-control" id="exampleFormControlInput1"/>
                    </div>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Choose the category</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Image</label>
                        <input onChange={(e) => handleChange(e)} value={product.image} name='Image' type="text" class="form-control" id="exampleFormControlInput1"/>
                    </div>
                </form>
                
            </Container>
            
        </>
    )
}
