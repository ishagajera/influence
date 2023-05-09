import axios from "axios";
const API_URL = "http://localhost:3000/";

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const getDisplayUser = () => {
  return JSON.parse(sessionStorage.getItem("display_user"));
};

const getDisplayBrand = () => {
  return JSON.parse(sessionStorage.getItem("display_brand"));
};

const getLoggedInUsername = () => {
  return JSON.parse(sessionStorage.getItem("loggedin_username"));
};

const getUserType = () => {
  return JSON.parse(sessionStorage.getItem("typeofuser"));
};

const logout = () => {
  sessionStorage.clear();
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const clear_data = () => {
  sessionStorage.clear();
 
  };
const AuthService = {
  
  getCurrentUser,
  getDisplayUser,
  logout,
  clear_data,
  getLoggedInUsername,
  getUserType,
  getDisplayBrand,
}
export default AuthService;
