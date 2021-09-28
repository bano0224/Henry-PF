import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import filterByCategory from "../../../actions/filterByCategory";
import getCategories  from "../../../actions/getCategories";

export default function FilterByCategory({landing}) {
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(filterByCategory(landing));
  }, []);

  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer);
  const {categories} = productReducer

  function handleCategories(e) {
    dispatch(filterByCategory(e.target.value));
  }

  return (
    <div class="mb-2">
      <label for="exampleFormControlInput1" class="form-label">
        Categorías
      </label>
      <select
        required
        class="form-select"
        aria-label="Default select example"
        onChange={(e) => handleCategories(e)}
      >
        <option value="all">Todos</option>
        {categories?.map((category) => {
          return <option value={`${category.name}`}>{category.name}</option>;
        })}
      </select>
    </div>
  );
}
