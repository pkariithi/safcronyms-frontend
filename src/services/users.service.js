import axios from "axios";

const all = (token) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER_HOST}users`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }
  );
};

const UserService = {
  all
}

export default UserService;
