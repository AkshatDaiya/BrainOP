import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const [singleData, setSingleData] = useState({});
  console.log(singleData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/postDetails/${id}`
        );
        setSingleData(response.data.apiData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {singleData ? (
        <div className="h-screen w-full bg-custom-gradient4 flex items-start justify-center absolute top-0 left-0">
          <div className="relative">
            <img
              src={singleData.img}
              alt="Posts Images"
              className="h-screen w-full z-0 relative"
            />
            <div className="absolute right-9 bottom-0 h-72 z-10 bg-[#ffffffc9] w-11/12 rounded-t-xl p-4 overflow-y-scroll">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-extrabold">{singleData.title}</h2>
                <small className="text-sm">{singleData.name}</small>
              </div>
              <p className="pt-3 text-justify">{singleData.desc}</p>
              <small className="float-right">
                {new Date(singleData.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}

export default PostDetails;
