import React, { useState } from "react";
import s from "./CreateProduct.module.css";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
//--FUNCTION CREATE PRODUCT--//
function CreateProduct() {
  const [errors, setErrors] = useState({ form: "complete form" });
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: 0,
    category: [],
    imageUrl: "",
  });
  const handleChange = (e) => {
    if (e.target.parentNode.parentNode.id === "category") {
      if (e.target.checked) {
        setForm((prevState) => ({
          ...prevState,
          category: form.category.concat(e.target.name),
        }));
      } else {
        setForm((prevState) => ({
          ...prevState,
          category: form.category.filter((x) => e.target.name !== x),
        }));
      }
    }
    if (e.target.type !== "checkbox") {
      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };
  const validate = (form) => {
    let errors = {};
    if (!form.name) {
      errors.name = "Name required";
    } else if (form.name.length < 4) {
      errors.name = "Product Name 4 characters";
    }
    if (!form.description) {
      errors.description = "Description is required";
    } else if (form.description.length < 9) {
      errors.description = "Description 9 characters";
    }
    if (!form.price) {
      errors.price = "Price is required";
    } else if (!/^[1-1000]$/.test(form.price)) {
      errors.price = "Price must be between 1 and 1000";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate(form);
    let checkboxsErrors = [];
    if (form.platforms.length < 1) checkboxsErrors.push("Category is required");
    if (Object.values(errors).length || checkboxsErrors.length) {
      return alert(Object.values(errors).concat(checkboxsErrors).join("\n"));
    }
    await axios.post("", form);
    alert(`${form.name}The product created`);
  };
  return (
    <div className={s.createproduct}>
      <NavBar />
      <div className={s.wrapper}>
        <div className={s.container}>
          <h1 className={s.title}>Create Product 🚀</h1>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <label htmlFor="name">Name: </label>
            <br />
            <input
              placeholder="Name"
              type="text"
              id="name"
              className={errors.name && s.error}
              name="name"
            />
            <br />
            <label htmlFor="description">Description: </label>
            <br />
            <textarea
              name="description"
              placeholder="write a lot"
              className={`${errors.description ? s.error : ""} ${s.textarea}`}
              id="description"
              cols="30"
              rows="3"
            />
            <br />
            <label htmlFor="price">Price: </label>
            <br />
            <input
              name="price"
              className={errors.rating && s.error}
              placeholder="Rate from 1 to 1000"
              type="tel"
              id="price"
              maxLength="1000"
            />
            <br />
            <div id="category" className={s.category}>
              <label className={s.label}>Category </label>
              <div className={s.divcategory}>
                <label htmlFor="drinks">Drinks</label>
                <input name="drinks" type="checkbox" id="drinks" />
              </div>
              <div className={s.divcategory}>
                <label htmlFor="bakery">Bakery</label>
                <input name="bakery" type="checkbox" id="bakery" />
              </div>
              <div className={s.divcategory}>
                <label htmlFor="meats">Meats</label>
                <input name="meats" type="checkbox" id="meats" />
              </div>
              <div className={s.divcategory}>
                <label htmlFor="dairy products">Dairy products</label>
                <input
                  name="dairy products"
                  type="checkbox"
                  id="dairy products"
                />
              </div>
              <div className={s.divcategory}>
                <label htmlFor="cleaning">Cleaning</label>
                <input name="cleaning" type="checkbox" id="cleaning" />
              </div>

              <br />
              <label htmlFor="date">Expiration</label>
              <br />
              <input
                name="releaseDate"
                className={errors.releaseDate && s.error}
                type="date"
                id="date"
                required
              />
              <br />
            </div>
            <br />
            <button className={s.btn} type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateProduct;
