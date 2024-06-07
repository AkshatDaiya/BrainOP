import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useCookies } from "react-cookie";
import axios from "axios";
import Cards from "./partials/Cards";

function Posts() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [postsData, setPostsData] = useState();
  const navigate = useNavigate();
  const userName = localStorage.getItem("fullName");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts", {
          withCredentials: true,
        });
        setPostsData(response.data.apiData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (cookies.access_token) {
      fetchData();
    }
  }, [cookies.access_token]);

  useEffect(() => {
    const token = cookies.access_token;
    if (!token) {
      navigate("/");
    }
  }, [cookies.access_token, navigate]);

  const handleLogOut = () => {
    localStorage.clear();
    removeCookie("access_token", { path: "/" });
    navigate("/");
  };

  return (
    <section className="bg-custom-gradient flex items-center justify-center min-h-screen">
      <div className="bg-custom-gradient3 w-full max-w-7xl mx-11 my-11 border-2 border-pink-400 rounded-xl bg-white p-6">
        <div className="bg-custom-gradient2 flex items-center justify-between rounded-xl p-3 mb-3">
          <h2 className="text-2xl font-semibold">Welcome {userName}!</h2>
          <button onClick={handleLogOut}>
            <CiLogout className="text-red-600 text-3xl" />
          </button>
        </div>
        {postsData ? (
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <Cards postsData={postsData} />
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <span className="loader"></span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Posts;
