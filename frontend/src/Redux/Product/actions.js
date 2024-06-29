import axios from "axios";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_PRODUCTS_BY_SUBCATEGORY
} from "./productActionTypes";

export const fetchProducts = () => (dispatch) => {
  axios
    .get("http://localhost:8000/product")
    .then((res) => {
      dispatch({ type: FETCH_PRODUCTS, payload: res.data });
    })
    .catch((err) => {
      console.log("Fetch Products Error: ", err);
    });
};

export const fetchProductById = (category, sub_category, id) => (dispatch) => {
  axios
    .get(`http://localhost:8000/product/${category}/${sub_category}/${id}`)
    .then((res) => {
      dispatch({ type: FETCH_PRODUCT, payload: res.data });
    })
    .catch((err) => {
      console.log("Fetch Product Error: ", err);
    });
};

export const fetchProductsByCategory = (category, sub_category) => (dispatch) => {
  axios
    .get(`http://localhost:8000/product/${category}/${sub_category}`)
    .then((res) => {
      dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY, payload: res.data });
    })
    .catch((err) => {
      console.log("Fetch Products by Category Error: ", err);
    });
};
