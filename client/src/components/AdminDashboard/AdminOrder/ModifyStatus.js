import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {InputLabel, Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import modifyStatus from '../../../actions/order/modifyStatus';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FilterByStatus({id}) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('')
  const classes = useStyles();
  const dispatch = useDispatch()


  const handleChange = (event) => {
    setStatus(event.target.value)
  };

  useEffect(() => {
    dispatch(modifyStatus(status, id));
  }, [status])


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid item container alignItems='center' style={{margin: '0'}}>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          value={status}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          <MenuItem value="Pendiente">
            <em>Pendiente</em>
          </MenuItem>
          <MenuItem selected value="Completada">
            <em>Completada</em>
          </MenuItem>
          <MenuItem value="Cancelada">
            <em>Cancelada</em>
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}