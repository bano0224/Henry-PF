import React from 'react'
import { Link } from 'react-router-dom';
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
import Button from '@material-ui/core/Button/Button'
import AddIcon from '@material-ui/icons/Add';


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
  ];

  function createData(name, category, price, stock, featured) {
    return { name, category, price, stock, featured };
  }

  const rows = [
    createData('Lacteos', 'Lacteo', 30, 3287263, 'SI'),
    createData('Bebidas', 'nose', 32, 9596961, 'NO'),
    createData('Limpieza', 'nose', 32, 9596961, 'NO'),
    createData('Bebidas', 'nose', 32, 9596961, 'NO'),
    createData('Lacteos', 'nose', 32, 9596961, 'NO'),
    
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export default function AdminCategories() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <hr />
        <Container>
        <h1>Categories</h1>
        <Container>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<AddIcon />}
            component={Link} 
            to='categories/add'
            style= {{textDecoration: 'none'}}
          >
            Add Category
          </Button>
        </Container>
        
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
        </Container>
        </>
    )
}
