import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints, { createImage } from "../services/movieServices";

const Hero = () => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    axios.get(endpoints.popular).then((response) => {
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    });
  }, []);

  const truncate = (str, length) => {
    if (!str) {
      return "";
    }

    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  if (!movie) {
    return (
      <>
        <p>Fetching movies...</p>
      </>
    );
  }
  const { title, backdrop_path, release_date, overview } = movie;
  return (
    <div className="w-full h-[550px] lg:h-[850px] relative overflow-hidden">
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover object-top"
          src={createImage(backdrop_path, "original")}
          alt={title}
        />
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        <div className="absolute w-full top-[15%] lg:top-[35%] p-4 md:p-8 text-white">
          <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
          <div className="mt-8 mb-4 ">
            <button className="capitalize border bg-gray-300 text-black rounded py-2 px-5">
              Play
            </button>
            <button className="capitalize border border-gray-300 rounded py-2 px-5 ml-4">
              Watch later
            </button>
          </div>
          <p className="text-gray-400 text-sm ">{release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncate(overview, 165)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
