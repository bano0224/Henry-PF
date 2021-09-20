import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import getProductByQuery from '../../../actions/getProductByQuery'

const useStyles = makeStyles({
    button: {
        marginLeft: 10,
        hover: {
            color:'red'
        }
    }
  });

export default function Search() {
    const classes = useStyles();
    const [state, setState] = useState('')
    
    const dispatch = useDispatch()

    const handleChange =(e) => {
        setState(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getProductByQuery(state))
    }

    return(
        <> 
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <TextField
                    name="search"
                    floatingLabelText="Cerca"
                    floatingLabelFixed
                    value={state}
                    onChange={(e) => {handleChange(e)}}
                    placeholder='Busque un producto...'
                />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    style= {{textDecoration: 'none'}}
                    type='submit'
                    >
                        <SearchIcon/>
                </Button>
            </form>
        </>
       
    )
    
}