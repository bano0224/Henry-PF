// import React, {useEffect, useState} from 'react';
// import {Pagination} from '@material-ui/lab';

// export default function Pages({totalPages, paginate}){
//     const[page, setPage]= useState(1)

//     useEffect(()=>{
//         setPage(1)
//     }, [totalPages])

//     const handleChange= (event, value)=>{
//         setPage(value)
//         paginate(value)
//     }
//     return(
//         <>
//             <Pagination count={totalPages} variant="outlined" page= {page} onChange={handleChange} />
//         </>
//     )

// }