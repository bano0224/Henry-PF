import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import filterByStatus from '../../../actions/order/filterByStatus';
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

export default function FilterByStatus() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('')
  const classes = useStyles();
  const dispatch = useDispatch()


  const handleChange = (event) => {
    setStatus(event.target.value)
  };

  useEffect(() => {
    dispatch(filterByStatus(status));
  }, [status])


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Estado</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          value={status}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          <MenuItem value="all">
            <em>Todas</em>
          </MenuItem>
          <MenuItem value="pendiente">
            <em>Pendiente</em>
          </MenuItem>
          <MenuItem value="completada">
            <em>Completada</em>
          </MenuItem>
          <MenuItem value="cancelada">
            <em>Cancelada</em>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}