import changeOrder from "../../../actions/changeOrder";
import { connect, useDispatch, useSelector } from "react-redux";

export default function ChangeOrder(props) {
  const productReducer = useSelector(state => state.productReducer)
  const { products } = productReducer

  const dispatch = useDispatch()

  const handleSelect = (e) => {
    dispatch(changeOrder(e.target.value));
  };
  


  return (
    <div id="filter">
      {/* {props.products.length ? <label></label> : null} */}
      
        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label">
            Orden
          </label>
          <select
            required
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => handleSelect(e)}
          >
            <option selected>-</option>
            <option value="asc">Ascendente(A-z)</option>
            <option value="desc">Descendente(z-A)</option>
            <option value="max">Precios Más Altos</option>
            <option value="min">Precios Más Bajos</option>
          </select>
        </div>
    </div>
  );
}
