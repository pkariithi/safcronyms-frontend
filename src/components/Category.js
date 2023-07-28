import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import CategoryService from "../services/categories.service";

const Category = () => {
  const navigate = useNavigate();
  const user = AuthService.getUser();
  const [categories, setCategories] = useState([]);

  // fetch categories
  useEffect(() => {
    if(!user) {
      navigate("/login");
    }
    if(!user.permissions.includes('Can view categories')) {
      navigate("/dashboard");
    }

    CategoryService.all(user.token)
      .then((res) => { setCategories(res.data); })
      .catch((err) => { console.log(err) });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Categories</h3>
        <p>Protected content with both authentication and authorization</p>
      </header>
      <main>
        <ul>
        {categories.map((a) => {
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

export default Category;