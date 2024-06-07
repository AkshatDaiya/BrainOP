import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      <Route
        path="/reg"
        element={<SignUp />}
      />
      <Route
        path="/posts"
        element={<Posts />}
      />
      <Route
        path="/postDetails/:id"
        element={<PostDetails />}
      />
    </Routes>
  );
}

export default App;
