import axios from "axios";
const API_URL = "http://localhost:3000/";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getDisplayUser = () => {
  return JSON.parse(localStorage.getItem("display_user"));
};
const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};
const AuthService = {
  
  getCurrentUser,
  getDisplayUser,
  logout,
}
export default AuthService;
