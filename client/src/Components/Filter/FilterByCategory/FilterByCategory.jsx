import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByCategory } from "../../../actions/filterByCategory";
import { getCategories } from "../../../actions/getCategories";
import getProducts from "../../../actions/getProducts";

export default function FilterByCategory() {
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);

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
        {allCategories?.map((category) => {
          return <option value={`${category.name}`}>{category.name}</option>;
        })}
      </select>
    </div>
  );
}
