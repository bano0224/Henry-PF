import {Redirect,Route} from 'react-router-dom';
import jwt from 'jsonwebtoken'


/* const PrivateRoute = (props) => {
    return  ( <Route exact={props.exact} path={props.path} component={props.component}/>
    )
} */
const numero = JSON.parse(sessionStorage.getItem("token"))?.token
const decoded = numero? jwt.verify(numero, 'secret'):null
const PrivateRoute = ({component:Component, ...rest}) => {
    console.log(decoded?.role[0]?.name)

    return(

    <Route {...rest} render={props => (
        decoded?.role[0]?.name === "admin" ?
            <Component {...props} />
            
        : <Redirect to="/" />
    )} />
    )
}
export default PrivateRoute;