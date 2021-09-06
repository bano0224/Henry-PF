import changeOrder from "../../actions/changeorder";
import { connect } from 'react-redux';

function ChangeOrder (props) {
  const handleSelect = (e) => {
    props.changeOrder(e.target.value);
  };
  return(
    <div id="filter">
            {props.products.length ? <label></label> : null}
            {props.products.length ? (
              <select name="select" onChange={(e) => handleSelect(e)}>
                <option value="order">ORDENAR</option>
                <option value="asc">Ascendente(A-z)</option>
                <option value="desc">Descendente(z-A)</option>
                <option value="max">Precios Más Altos</option>
                <option value="min">Precios Más Bajos</option>
              </select>
            ) : null}
          </div> 
  )


}
const mapStateToProps = (state) => {
  return {
    products: state.products,
    
  };
};

        export default connect(mapStateToProps, {changeOrder})(ChangeOrder);

        
       