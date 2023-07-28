import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/users.service";

const User = () => {
  const navigate = useNavigate();
  const user = AuthService.getUser();
  const [users, setUsers] = useState([]);

  // fetch users
  useEffect(() => {
    if(!user) {
      navigate("/login");
    }
    if(!user.permissions.includes('Can view users')) {
      navigate("/dashboard");
    }

    UserService.all(user.token)
      .then((res) => { setUsers(res.data); })
      .catch((err) => { console.log(err) });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Users</h3>
        <p>Protected content with both authentication and authorization</p>
      </header>
      <main>
        <ul>
        {users.map((a) => {
          return (
            <li key={a._id}>
              <h3>{a.name}</h3>
              <p><strong>Email:</strong> {a.email}</p>
            </li>
          );
        })}
        </ul>
      </main>
    </div>
  );
};

export default User;