import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import getCategories from '../../../actions/getCategories'
import AdminNav from '../AdminNav/AdminNav'
import { Container } from 'react-bootstrap'
import TableContainer from '@material-ui/core/TableContainer'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { Box, Button, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import deleteUser from '../../../actions/users/deleteUser';


const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'description', label: 'Descripción', minWidth: 100 },
    { id: 'edit', label: 'Editar', minWidth: 100, align: 'center'},
    { id: 'delete', label: 'Eliminar', minWidth: 100, align: 'center' },
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    button: {
      margin: 10,
    }
  });

export default function AdminCategories() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])

    const dispatch = useDispatch()
    const productReducer = useSelector(state => state.productReducer)
    const {categories} = productReducer

    useEffect(() => {
      dispatch(getCategories())
    }, [page])

    useEffect(() => {
      setRows(categories)
    }, [categories])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleDelete = (e) => {
      dispatch(deleteUser(e.currentTarget.value))
    }

    const handleModify = (e) => {
      // dispatch()
      console.log(e.currentTarget.value)
    }

    
    return (
        <>
        <AdminNav/>
        <br />
        <Container>
          <h1>Categorías</h1>
          <Box display="flex" justifyContent='flex-end' alignItems='center'>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<AddIcon />}
                component={Link} 
                to='categories/add'
                style= {{textDecoration: 'none'}}
                id='button'
              >
                Agregar Categoría
              </Button>
          </Box>
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
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                      {columns.map((column) => {
                          const value = row[column.id];
                          if(column.id === 'delete'){
                            return(
                              <TableCell align='center'>
                                <IconButton value={row._id} onClick={(e) => {handleDelete(e)}}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            )
                          } else if (column.id === 'edit'){
                            return (
                              <TableCell align='center'>
                                <IconButton component={Link} to={`categories/${row._id}`}>
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
                  );
                  })}
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
        </Container>
        </>
    )
}
