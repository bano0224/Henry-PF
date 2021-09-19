import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


 const AddressInput = ({ name, label, required }) => {
    //  Initialitation hook
        const { control } = useFormContext();
        const isError = false;
    return (
        <>
            <Grid item xs={12} sm={6 }> 
                <Controller 
                    name={name}
                    control={control} 
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label={label}
                            defaultValue=""
                            required

                        />
                    )}
                />    
            </Grid>
        </>
    )
}
export default AddressInput