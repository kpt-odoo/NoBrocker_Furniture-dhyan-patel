import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT,
    FETCH_PRODUCTS_BY_CATEGORY,
    FETCH_PRODUCTS_BY_SUBCATEGORY
  } from "./productActionTypes";
  
  const initialState = {
    products: [],
    product: {},
    categoryProducts: []
  };
  
  const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_PRODUCTS:
        return { ...state, products: payload };
      case FETCH_PRODUCT:
        return { ...state, product: payload };
      case FETCH_PRODUCTS_BY_CATEGORY:
        return { ...state, categoryProducts: payload };
      default:
        return state;
    }
  };
  
  export default productReducer;
  