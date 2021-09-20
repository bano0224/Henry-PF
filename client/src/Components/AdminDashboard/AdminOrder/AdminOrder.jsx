import React, { useDebugValue, useEffect } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core'
import getOrders from '../../../actions/order/getOrders'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

const columns = [
    { id: '_id', label: 'ID Orden', minWidth: 170 },
    { id: 'user', label: 'ID Usuario', minWidth: 100 },
    { id: 'status', label: 'Estado', minWidth: 100, align: 'center'},
    // { id: 'detail', label: 'Detalles', minWidth: 100, align: 'center' },
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

export default function AdminOrder() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const productReducer = useSelector(state => state.productReducer)
    const {orders} = productReducer

    useEffect(() => {
        setRows(orders)
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

      
    return (
        <>
            <AdminNav/>
            <br />
            <br />
            <Container>
                <h1>Ordenes</h1>
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
                                    <TableRow hover role="checkbox" tabIndex={-1} >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if(column.id === 'user'){
                                            // console.log('entra');
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value._id}
                                                </TableCell>
                                            )
                                        } else {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
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
