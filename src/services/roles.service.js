import axios from "axios";

const all = (token) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER_HOST}roles`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }
  );
};

const RoleService = {
  all
}

export default RoleService;
