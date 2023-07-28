import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const user = AuthService.getUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3><strong>{user.name}</strong> Profile</h3>
      </header>
      <p><strong>Email:</strong> {user.email}</p>
      <strong>Permissions:</strong>
      <ul>
        {user.permissions &&
          user.permissions.map((permission, index) => <li key={index}>{permission}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
