import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import AcronymService from "../services/acronyms.service";

const Acronym = () => {
  const navigate = useNavigate();
  const user = AuthService.getUser();
  const [acronyms, setAcronyms] = useState([]);

  // fetch acronyms
  useEffect(() => {
    if(!user) {
      navigate("/login");
    }
    if(!user.permissions.includes('Can view acronyms')) {
      navigate("/dashboard");
    }

    AcronymService.all(user.token)
      .then((res) => { setAcronyms(res.data); })
      .catch((err) => { console.log(err) });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Acronyms</h3>
        <p>Protected content with both authentication and authorization</p>
      </header>
      <main>
        <ul>
        {acronyms.map((a) => {
          return (
            <li key={a._id}>
              <h3>{a.acronym}</h3>
              <ul>
                {a.definitions.map((d) => <li key={d._id}>{d.meaning}</li>)}
              </ul>
            </li>
          );
        })}
        </ul>
      </main>
    </div>
  );
};

export default Acronym;