import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import filterByCategory from '../../../actions/filterByCategory';

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

export default function FilterByCategory() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('')
  const dispatch = useDispatch();
  const classes = useStyles();

  const allCategories = useSelector(state => state.productReducer)
  const { categories } = allCategories


  const handleChange = (event) => {
    setCategory(event.target.value)
  };

  useEffect(() => {
    dispatch(filterByCategory(category));
  }, [category])

  console.log(category)

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Filtro</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          value={category}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          <MenuItem value="all">
            <em>Todas</em>
          </MenuItem>
          {
            categories?.map(c => <MenuItem value={c.name}>{c.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
  );
}