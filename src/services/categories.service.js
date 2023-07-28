import axios from "axios";

const all = (token) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER_HOST}categories`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }
  );
};

const CategoryService = {
  all
}

export default CategoryService;
