import React, { useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import { Container, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import createCategory from '../../../actions/createCategory';
import { useDispatch } from 'react-redux';

export default function AdminAddCategory(props) {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: []
    })

    const dispatch = useDispatch()    

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'imageUrl') {
            setCategory({
                ...category,
                imageUrl: [value],
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
            imageUrl: []
        })
    }

    return (
        <>
            <AdminNav /> 
            <hr />
            <Container>
                <h1>Add Category</h1>
            </Container>
            <Container maxWidth='xs'>
                <form onSubmit={(e) => (handleSubmmit(e))}>
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input required onChange={(e) => handleChange(e)} value={category.name} type="text" class="form-control" id="exampleFormControlInput1" name='name'/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea required onChange={(e) => handleChange(e)} value={category.description} name='description' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="mb-2">
                        <label required for="exampleFormControlInput1" class="form-label">Image</label>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            clearOnUnmount={true}
                            onChange={image => handleChange({ target: { name: 'imageUrl', value: image[0] } })}
                            onDelete={deletedImage => {
                                setCategory({
                                    ...category,
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
