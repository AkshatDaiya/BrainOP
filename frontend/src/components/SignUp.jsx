import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function SignUp() {
  const [eye, setEye] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    pass: "",
    rePass: "",
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/reg",
          data
        );
        setMessage(response.data.message);
      } catch (error) {
        setError(true);
        setMessage(error.response.data.message);
      }
    };

    sendData();
  };

  return (
    <section className="bg-custom-gradient h-screen flex items-center justify-center">
      <div className="w-2/6 bg-white p-8 py-4 rounded-lg">
        <div className="mb-4">
          <h3 className="text-xl font-extrabold">Sign Up</h3>
          <h5 className="text-md font-semibold">
            Create an account to continue
          </h5>
        </div>

        <p
          className={`text-sm ${
            error ? "text-red-700" : "text-green-700"
          } text-center w-full font-semibold`}
        >
          {message}
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="font-bold"
            >
              Name
            </label>
            <br />
            <input
              type="text"
              className="bg-[#d9d9d9] w-full text-xl px-2 py-3 rounded-lg changeOutLineCol"
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={handleValueChange}
              placeholder="Enter your full name..."
              minLength={3}
              required
            />
          </div>

          <div className="mt-2">
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
              onChange={handleValueChange}
              placeholder="Enter your email..."
              required
            />
          </div>

          <div className="mt-2">
            <label
              htmlFor="pass"
              className="font-bold"
            >
              Password
            </label>
            <br />
            <div className="relative">
              <input
                type={eye ? "text" : "password"}
                className="bg-[#d9d9d9] w-full text-xl px-2 py-3 rounded-lg changeOutLineCol"
                id="pass"
                name="pass"
                value={data.pass}
                onChange={handleValueChange}
                placeholder="Enter your password..."
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
            <span className="font-bold text-[#494848]">
              <small>Must be at least 8 characters</small>
            </span>
          </div>

          <div className="mt-2">
            <label
              htmlFor="rePass"
              className="font-bold"
            >
              Confirm Password
            </label>
            <br />
            <input
              type="password"
              className="bg-[#d9d9d9] w-full text-xl px-2 py-3 rounded-lg changeOutLineCol"
              id="rePass"
              name="rePass"
              value={data.rePass}
              onChange={handleValueChange}
              placeholder="Enter your password again..."
              required
            />
          </div>

          <div className="mt-1">
            <input
              type="checkbox"
              className="mx-1"
              name="T&C"
              id="T&C"
              required
            />
            <label htmlFor="T&C">
              I agree to the{" "}
              <span className="text-[#ff238d]">terms and conditions</span>.
            </label>
          </div>

          <button
            type="submit"
            className="text-2xl font-bold text-white hover:text-black bg-[#ff238d] w-full px-2 pt-2 pb-2 border hover:border-black hover:bg-white mt-5 rounded-lg transition-all duration-300 ease-out"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center w-full">
          <small>Already have an account? </small>
          <Link
            to="/"
            className="text-[#ff238d]"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
