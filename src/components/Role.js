import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/roles.service";

const Role = () => {
  const navigate = useNavigate();
  const user = AuthService.getUser();
  const [roles, setRoles] = useState([]);

  // fetch roles
  useEffect(() => {
    if(!user) {
      navigate("/login");
    }
    if(!user.permissions.includes('Can view roles')) {
      navigate("/dashboard");
    }

    UserService.all(user.token)
      .then((res) => { setRoles(res.data); })
      .catch((err) => { console.log(err) });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Roles</h3>
        <p>Protected content with both authentication and authorization</p>
      </header>
      <main>
        <ul>
        {roles.map((a) => {
          return (
            <li key={a._id}>
              <h3>{a.name}</h3>
              <p>{a.description}</p>
            </li>
          );
        })}
        </ul>
      </main>
    </div>
  );
};

export default Role;