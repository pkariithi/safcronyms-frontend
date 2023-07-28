import axios from "axios";
import { getInitials } from "../utils/Util";

const register = (name, email, password) => {
  return axios.post(process.env.REACT_APP_SERVER_HOST + "auth/register", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(process.env.REACT_APP_SERVER_HOST + "auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        response.data["initials"] = getInitials(response.data.name);
        localStorage.setItem(
          process.env.REACT_APP_TOKEN_NAME,
          JSON.stringify(response.data)
        );
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
};

const getUser = () => {
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
  );
};

const AuthService = {
  register,
  login,
  logout,
  getUser,
}

export default AuthService;
