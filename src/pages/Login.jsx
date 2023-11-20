import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, login } = UserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full">
      <img
        className="hidden sm:block absolute w-full h-full object-cover default-ltr-cache-ve3cf8 eae08lb0"
        alt="///"
        aria-hidden="true"
        data-uia="nmhp-card-hero+background+image"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
      />

      <div className=" bg-black/70 fixed top-0 left-0 w-full h-screen" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-nsans-bold">Login</h1>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col py-4 "
            >
              <input
                type="email"
                className="p-3 my-2  bg-gray-700 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                autoComplete="email"
              />

              <input
                type="password"
                className="p-3 my-2  bg-gray-700 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                autoComplete="current-password"
              />

              <button className=" bg-red-600 py-3 my-6 rounded font-nsans-bold ">
                Login
              </button>

              <div className="flex justify-between items-center text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className=" mr-2 "
                    checked={rememberLogin}
                    onChange={() => setRememberLogin(!rememberLogin)}
                  />
                  Remember me
                </p>
                <p>Need Help ?</p>
              </div>
              <p className="my-4">
                <span className="text-gray-600 mr-2">
                  Don't have a Netflix account?
                </span>
                <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
