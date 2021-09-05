import React from 'react'
import AdminNav from '../AdminNav/AdminNav'
import Container from '@material-ui/core/Container/Container'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button/Button'
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid'

export default function AdminAddProduct(props) {
    

    return (
        <>
            <AdminNav/>
            <hr />
            <Container>
                <h1>Add product</h1>
            </Container>
            <Container maxWidth='xs'>
                <div class="mb-2">
                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1"/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Price</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1"/>
                    <label for="exampleFormControlInput1" class="form-label">Stock</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1"/>
                </div>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Choose the category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </Container>
            
        </>
    )
}
