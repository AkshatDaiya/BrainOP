import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cards({ postsData }) {
  const navigate = useNavigate();
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    if (postsData && postsData.length) {
      setDisplayedData(postsData.slice(0, 6));
    }
  }, [postsData]);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setDisplayedData((prevDisplayedData) => [
        ...prevDisplayedData,
        ...postsData.slice(
          prevDisplayedData.length,
          prevDisplayedData.length + 6
        ),
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [postsData]);

  const handleShowMore = (id) => {
    navigate(`/postDetails/${id}`);
  };

  return (
    <>
      {postsData && displayedData ? (
        displayedData.map((data) => (
          <div
            className="card card-compact w-full lg:h-auto h-[550px] bg-base-100 rounded-xl shadow-xl mb-4"
            key={data._id}
          >
            <figure>
              <img
                src={data.img}
                alt="Shoes"
                className="rounded-xl w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body p-3 transition-all duration-300 ease-out">
              <h2 className="text-xl font-semibold">{data.title}</h2>
              <p>{data.desc.slice(0, 200) + "..."}</p>
              <div className="card-actions flex justify-between mt-3">
                <small>{new Date(data.createdAt).toLocaleDateString()}</small>
                <button
                  className="text-blue-600"
                  onClick={() => handleShowMore(data._id)}
                >
                  Show more...
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}

export default Cards;
