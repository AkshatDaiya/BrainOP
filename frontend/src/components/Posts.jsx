import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useCookies } from "react-cookie";
import axios from "axios";
import Cards from "./partials/Cards";

function Posts() {
  const [cookies, setCookie, removeCookie] = useCookies(["jwtoken"]);
  const [postsData, setPostsData] = useState();
  const navigate = useNavigate();
  const userName = localStorage.getItem("fullName");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://brainop-back.onrender.com/api/posts", {
          withCredentials: true,
        });
        setPostsData(response.data.apiData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (cookies.jwtoken) {
      fetchData();
    }
  }, [cookies.jwtoken]);

  useEffect(() => {
    const token = cookies.jwtoken;
    if (!token) {
      navigate("/");
    }
  }, [cookies.jwtoken, navigate]);

  const handleLogOut = () => {
    localStorage.clear();
    removeCookie("jwtoken", { path: "/" });
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
