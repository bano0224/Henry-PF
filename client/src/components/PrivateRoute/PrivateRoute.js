import {Redirect,Route} from 'react-router-dom';
import jwt from 'jsonwebtoken'

const numero = JSON.parse(sessionStorage.getItem("token"))?.token
const decoded = numero? jwt.verify(numero, 'secret'):null
const PrivateRoute = ({component:Component, ...rest}) => {
    return(

    <Route {...rest} render={props => (
        decoded?.role[0]?.name === "admin" ?
            <Component {...props} />
            
        : <Redirect to="/" />
    )} />
    )
}
export default PrivateRoute;