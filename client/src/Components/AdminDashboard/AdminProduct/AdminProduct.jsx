import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav'
import Container from '@material-ui/core/Container'
import TableContainer from '@material-ui/core/TableContainer'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FilterByCategory from '../AdminFilter/FilterByCategory';
import AdminSearch from '../AdminSearch/AdminSearch'
import Box  from '@material-ui/core/Box';
import Button from '@material-ui/core/Button/Button'
import AddIcon from '@material-ui/icons/Add';
import getProducts from '../../../actions/getProducts';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import getCategories from '../../../actions/getCategories';



const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'category', label: 'Category', minWidth: 100 },
    {
      id: 'price',
      label: 'Price',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'stock',
      label: 'Stock',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'featured',
      label: 'Featured',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'edit',
      label: 'Edit',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'delete',
      label: 'Delete',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
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

export default function AdminProduct() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dispatch = useDispatch()
    
    useEffect(() => {  
      dispatch(getProducts())
      dispatch(getCategories())
    }, [])
    
    const products = useSelector( state => state.products)

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

    
    return (
        <>
        <AdminNav/>
        <br />
        <Container>
          <h1>Products</h1>
          <Box display="flex" justifyContent='space-around' alignItems='center'>
              <FilterByCategory />
              <AdminSearch />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<AddIcon />}
                component={Link} 
                to='products/add'
                style= {{textDecoration: 'none'}}
                id='button'
              >
                Add Product
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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} component={Link} to={`/admin/products/modify/${row.id}`} style= {{textDecoration:'none'}}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
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
          <br />
        </Container>
        </>
    )
}
