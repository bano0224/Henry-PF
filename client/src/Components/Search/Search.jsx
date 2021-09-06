import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import getProductByQuery from "../../actions/getProductByQuery";


export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductByQuery(input));
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Search product..."
            autoComplete="off"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}
/* function mapStateToProps(state) {
  return {
    product: state.product,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getProductByQuery: (name) => dispatch(getProductByQuery(name)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search); */