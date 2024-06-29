import axios from "axios";
import {
  CartData,
  DecreaseCartData,
  IncreaseCartData,
  isAddedToCart,
  isNewItemAdded,
} from "./actionTypes.js";


let isadded = (id) => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("rentifyToken"));
  axios
    .get(`http://localhost:8000/cart/isadded/${id}`, {
      headers: {
        token,
      },
    })
    .then((res) => {
      if (res.data == true) {
        dispatch({ type: isAddedToCart, payload: true });
      } else {
        dispatch({ type: isAddedToCart, payload: false });
      }
    });
};
let getData = () => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("rentifyToken")) || null;
  console.log("token ")
  axios
    .get("http://localhost:8000/cart", {
      headers: {
        token,
      },
    })
    .then((res) => {
      console.log(res)
      ;
      dispatch({ type: CartData, payload: res.data });
    })
    .catch((err) => {
      console.log("CartData",err);
    });
};

let increaseCartData = (id) => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("rentifyToken"));
  axios
    .get(`http://cart/cartquantityadd/${id}`, {
      headers: {
        token,
      },
    })
    .then((res) => {
      dispatch({ type: IncreaseCartData, payload: res.data });
    });
};

let decreaseCartData = (id) => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("rentifyToken"));
  axios
    .get(`http://localhost:8000/cart/cartquantityreduce/${id}`, {
      headers: {
        token,
      },
    })
    .then((res) => {
      dispatch({ type: DecreaseCartData, payload: res.data });
    });
};

let deleteCartItem = (id) => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("rentifyToken"));
  axios
    .delete(`http://localhost:8000/cart/delete/${id}`, {
      headers: {
        token,
      },
    })
    .then((res) => {
      dispatch({ type: DecreaseCartData, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

let newProductAdded = (payload) => (dispatch) => {
  dispatch({ type: isNewItemAdded, payload });
};

export {
  isadded,
  getData,
  increaseCartData,
  decreaseCartData,
  deleteCartItem,
  newProductAdded,
};
