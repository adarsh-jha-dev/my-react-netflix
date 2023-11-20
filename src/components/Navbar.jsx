import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link to="/">
        <h1 className="uppercase text-red-500 font font-nsans-bold cursor-pointer text-5xl">
          Netflix
        </h1>
      </Link>

      {user?.email ? (
        <div>
          <Link to="/profile">
            <button className="capitalize pr-4">Profile</button>
          </Link>

          <button
            onClick={handleLogout}
            className="capitalize px-6 py-2 bg-red-600 cursor-pointer rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="capitalize pr-4">Login</button>
          </Link>

          <Link to="/signup">
            <button className="capitalize px-6 py-2 bg-red-600 cursor-pointer rounded">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
