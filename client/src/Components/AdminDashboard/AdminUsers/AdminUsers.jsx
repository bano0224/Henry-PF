import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
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
import getUsers from '../../../actions/getUsers'

const columns = [
    { id: 'first_name', label: 'Nombre', minWidth: 170 },
    { id: 'last_name', label: 'Apellido', minWidth: 100 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'role',
      label: 'Rol',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //   id: 'phone',
    //   label: 'Teléfono',
    //   minWidth: 170,
    //   align: 'center',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'address',
    //   label: 'Dirección',
    //   minWidth: 170,
    //   align: 'center',
    //   format: (value) => value.toFixed(2),
    // },
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export default function AdminUsers() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])
    const dispatch = useDispatch()

    const productReducer = useSelector(state => state.productReducer)
    const { users } = productReducer


    useEffect(() => {
      dispatch(getUsers())
    }, [])

    useEffect(() => {
      setRows(users?.map(p => {
        return {
          firtName: p.firstName,
          lastName: p.lastName,
          email: p.email,
          role: p.role,
        }
      }))
    }, [users])

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
        <h1>Usuarios</h1>
            <Paper className={classes.root}>
            <TableContainer className={classes.container} style={{ maxHeight: 500 }}>
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
                    {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                count={rows?.length}
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
