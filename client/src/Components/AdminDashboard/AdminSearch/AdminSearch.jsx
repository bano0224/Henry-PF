import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { TextField } from '@material-ui/core'


export default function Search() {
    const [state, setState] = useState('')

    return(
        <TextField
        name="search"
        floatingLabelText="Cerca"
        floatingLabelFixed
    />
    )
    
}