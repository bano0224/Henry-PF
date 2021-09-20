
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav'
import { Container, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Box, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide }from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FilterByCategory from '../AdminFilter/FilterByCategory';
import AdminSearch from '../AdminSearch/AdminSearch';
import AddIcon from '@material-ui/icons/Add';
import getProducts from '../../../actions/getProducts';
import getCategories from '../../../actions/getCategories';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import deleteProduct from '../../../actions/deleteProduct';

const columns = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "category", label: "Categoría", minWidth: 170, align: "center" },
  {
    id: "price",
    label: "Precio",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "stock",
    label: "Stock",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "featured",
    label: "Destacado",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "edit",
    label: "Editar",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "delete",
    label: "Eliminar",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    margin: 10,
  },
});

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AdminProduct() {

    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);


  const productReducer = useSelector((state) => state.productReducer);
  const { products } = productReducer;

 /*  products.length === 0
    ? "Este producto no se encuentra en stock"
    :  */
    useEffect(() => {
      setRows(products.map(p => {
          return {
            name: p.name,
            category: p.category.map(c => c.name).join(', '),
            price: p.price,
            stock: p.countInStock,
            featured: p.featured ? 'true' : 'false',
            id: p._id
          }
      }))
    }, [products])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    const handleClickOpen = (e) => {
      setOpen(true);
      setDeleteId(e.currentTarget.value)
    }

    const handleClose = (e) => {
      if(e.currentTarget.value === 'delete'){
        dispatch(deleteProduct(deleteId))
      }
      setOpen(false);
    }

  const handleDelete = (e) => {
    dispatch(deleteProduct(e.currentTarget.value));
  };

  return (
    <>
      <AdminNav />
      <br />
      <Container>
          <h1>Productos</h1>
          <Box display="flex" justifyContent='space-around' alignItems='center'>
              <FilterByCategory />
              <AdminSearch />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<AddIcon />}
                component={Link} 
                to='/admin/products/add'
                style= {{textDecoration: 'none'}}
                id='button'
              >
                Agregar Productos
              </Button>
          </Box>
          <br />
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                      products.length === 0
                      ? <h6>No se encontraron productos</h6>
                      : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              if(column.id === 'delete'){
                                return(
                                  <TableCell align='center'>
                                    <IconButton value={row.id} onClick={(e) => {handleClickOpen(e)}}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                )
                              } else if (column.id === 'edit'){
                                return (
                                  <TableCell align='center'>
                                    <IconButton component={Link} to={`/admin/products/modify/${row.id}` } >
                                      <EditIcon/>
                                    </IconButton>
                                  </TableCell>
                                )
                              } else {
                                return (
                                <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                                );
                              }
                            
                            })}
                          </TableRow>
                        )
                      })
                    }
                </TableBody>
              </Table>
            </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          </Paper>
          <br />
          <div>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"Esta seguro que quiere eliminar este producto?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Esta acción no se puede deshacer
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button value='cancell' onClick={(e) => {handleClose(e)}} color="primary">
                  Cancelar
                </Button>
                <Button value='delete' onClick={(e) => {handleClose(e)}} color="primary">
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
      </Container>
    </>
  )

}
