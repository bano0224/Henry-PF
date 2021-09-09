import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
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
import Box from '@material-ui/core/Box'


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 100 },
  ];

  function createData(name, description) {
    return { name, description };
  }

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

    const productReducer = useSelector(state => state.productReducer)
    const {categories} = productReducer

    useEffect(() => {
      setRows(categories)
    }, [categories])


    console.log(rows)

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
          <h1>Categories</h1>
          <Box display="flex" justifyContent='flex-end' alignItems='center'>
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
