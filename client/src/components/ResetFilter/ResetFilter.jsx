import React from 'react';
import getProducts from '../../actions/getProducts';

export default function ResetFilter () {
    return(
        <div>
            <button onClick={getProducts}>Borrar Filtros</button>
        </div>
    )
}