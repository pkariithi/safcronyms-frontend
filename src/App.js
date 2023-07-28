import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

import Events from "./common/Events";
import Acronym from "./components/Acronym";
import Category from "./components/Category";
import User from "./components/User";
import Role from "./components/Role";

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setUser(user);
    }

    Events.on("logout", () => {
      logOut();
    });

    return () => {
      Events.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand">
        <Link to={"/"} className="navbar-brand">
          SAFcronyms
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {user && (
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
          )}

          {user && user.permissions.includes('Can view acronyms') && (
            <li className="nav-item">
              <Link to={"/acronyms"} className="nav-link">
                Acronyms
              </Link>
            </li>
          )}

          {user && user.permissions.includes('Can view categories') && (
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Categories
              </Link>
            </li>
          )}

          {user && user.permissions.includes('Can view users') && (
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
          )}

          {user && user.permissions.includes('Can view roles') && (
            <li className="nav-item">
              <Link to={"/roles"} className="nav-link">
                Roles
              </Link>
            </li>
          )}
        </div>

        {user ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {user.name}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/acronyms" element={<Acronym />} />
          <Route exact path="/categories" element={<Category />} />
          <Route exact path="/users" element={<User />} />
          <Route exact path="/roles" element={<Role />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
