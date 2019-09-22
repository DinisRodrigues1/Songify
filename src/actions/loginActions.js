import { USER_AUTH, USER_HAS_TOKEN, LOGOUT_USER } from "./types";
import axios from "axios";

export const userCheck = user => {
  return dispatch => {
    return axios
      .post("https://songs-api-ubiwhere.now.sh/api/auth/login", {
        password: user.password,
        email: user.email
      })
      .then(resp => {
        if (resp.message) {
        } else {
          localStorage.setItem("token", resp.data.token);
          console.log(resp.data);
          dispatch({
            type: USER_AUTH,
            payload: resp.data
          });
        }
      });
  };
};

export const getUser = () => {
  return dispatch => {
    const token = localStorage.token;
    console.log(token);
    if (token) {
      return axios
        .get("https://songs-api-ubiwhere.now.sh/api/users/me", {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          console.log(res);
          if (res.message) {
            localStorage.removeItem("token");
          } else {
            dispatch({
              type: USER_HAS_TOKEN,
              payload: res.data
            });
          }
        });
    }
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_USER
    });
  };
};
