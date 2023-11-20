import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImage } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };

  return (
    <div>
      <div>
        <img
          className="block w-full h-[500px] object-cover default-ltr-cache-ve3cf8 eae08lb0"
          alt="///"
          aria-hidden="true"
          data-uia="nmhp-card-hero+background+image"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
        />

        <div className="bg-black/80 fixed top-0 left-0 w-full h-[500px]" />
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className=" text-3xl md:text-5xl font-nsans-bold my-2">
            My Shows
          </h1>
          <p className=" font-nsans-light text-gray-400 text-lg">
            {user?.email}
          </p>
        </div>
      </div>

      <h2 className=" font font-nsans-bold">Favourites</h2>

      <div className="relative flex items-center group ">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 placeholder-opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
            >
              <img
                className="w-full h-40 block object-cover object-top"
                src={createImage(
                  movie.backdrop_path ?? movie.poster_path,
                  "w500"
                )}
                alt={movie.title}
              />

              <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                  {movie.title}
                </p>
                <p>
                  <AiOutlineCloseCircle
                    size={40}
                    onClick={() => handleUnlikeShow(movie)}
                    className="absolute top-2 right-2"
                  ></AiOutlineCloseCircle>
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 placeholder-opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </div>
  );
};

export default Profile;
