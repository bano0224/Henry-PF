import React, { useState } from "react";
import { connect } from "react-redux";
import getProductByQuery from "../../actions/getProductByQuery";


function Search(props) {
  const [input, setInput] = useState({ name: "" });

  function handleChange(e) {
    setInput({ name: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.getProductByQuery(input.name);
    setInput({ name: "" });
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Search..."
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
function mapStateToProps(state) {
  return {
    product: state.product,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getProductByQuery: (name) => dispatch(getProductByQuery(name)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
