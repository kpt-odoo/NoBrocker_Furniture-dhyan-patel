import { login } from "./actionTypes";
import axios from "axios";

let handleSignin = (e, form, setButtonLoading) => (dispatch) => {
  e.preventDefault();
  axios
    .post("http://localhost:8000/user/login", {
      ...form,
    })
    .then((res) => {
      if (res.data == "Password is wrong") {
        alert("Password is Wrong");
      } else {
        dispatch({ type: login, payload: true });
        let token = res.data.token;
        console.log("token , " , token)
        localStorage.setItem("rentifyToken", JSON.stringify(token));
        alert("Logged in successfully");
      }
      setButtonLoading(false);
    })
    .catch((err) => {
      alert("User not found");
      setButtonLoading(false);
      console.log(err);
    });
};

export { handleSignin };
