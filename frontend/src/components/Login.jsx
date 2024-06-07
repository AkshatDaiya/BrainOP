import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [_, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    pass: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkData = async () => {
      try {
        const response = await axios.post(
          "https://brainop-back.onrender.com/api/login",
          data
        );
        setCookies("access_token", response.data.token, { path: "/" });
        localStorage.setItem("fullName", response.data.apiData);
        navigate("/posts");
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    checkData();
  };

  return (
    <section className="bg-custom-gradient h-screen flex items-center justify-center">
      <div className="w-2/6 bg-white p-8 rounded-lg">
        <div className="mb-4">
          <h3 className="text-xl font-extrabold">Login</h3>
          <h5 className="text-md font-semibold">
            Login your account to continue
          </h5>
        </div>

        <p className="text-xl text-red-700 text-center w-full font-semibold">
          {error}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label
              htmlFor="email"
              className="font-bold"
            >
              Email
            </label>
            <br />
            <input
              type="email"
              className="bg-[#d9d9d9] w-full text-xl px-2 py-3 rounded-lg changeOutLineCol"
              id="email"
              name="email"
              value={data.email}
              onChange={handleFormData}
              placeholder="Enter your email..."
              required
            />
          </div>

          <div className="mt-3">
            <label
              htmlFor="pass"
              className="font-bold"
            >
              Password
            </label>
            <br />
            <div className="relative">
              <input
                type={`${eye ? "text" : "password"}`}
                className="bg-[#d9d9d9] w-full text-xl px-2 py-3 rounded-lg changeOutLineCol"
                id="pass"
                name="pass"
                value={data.pass}
                onChange={handleFormData}
                placeholder="Enter your Password..."
                minLength={8}
                required
              />
              <button
                type="button"
                className="absolute top-4 right-2 text-2xl"
                onClick={() => setEye(!eye)}
              >
                {eye ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="text-2xl font-bold text-white hover:text-black bg-[#ff238d] w-full px-2 py-4 border hover:border hover:border-black hover:bg-white mt-5 rounded-lg transition-all duration-300 ease-out"
          >
            Login
          </button>
        </form>
        <div className="text-center w-full">
          <small>Didn't have an account </small>
          <Link
            to={"/reg"}
            className="text-[#ff238d]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
