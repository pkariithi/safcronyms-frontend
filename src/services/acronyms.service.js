import axios from "axios";

const all = (token) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER_HOST}acronyms`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }
  );
};

const AcronymService = {
  all
}

export default AcronymService;
