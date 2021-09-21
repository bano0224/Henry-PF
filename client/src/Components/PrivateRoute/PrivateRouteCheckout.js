import {Redirect,Route} from 'react-router-dom';
import jwt from 'jsonwebtoken'
import { useEffect } from 'react';
import { useState } from 'react';


const PrivateRouteCheckout = ({component:Component, ...rest}) => {
    const [decoded, setDecoded] = useState([])
    const numero = JSON.parse(sessionStorage.getItem("token"))?.token
    
    useEffect(() => {
        setDecoded([
            numero? jwt.verify(numero, 'secret'):null
        ]) 
    }, [numero])

    console.log(decoded);

    return(
        <Route {...rest} render={props => (
            decoded[0] === null
            ? <Redirect to="/login" />
            : <Component {...props} /> 
        )} />
    )
}
export default PrivateRouteCheckout;