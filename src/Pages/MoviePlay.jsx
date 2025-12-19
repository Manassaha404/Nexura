import React, { useEffect, useRef, useState } from "react";
import { Link, Links, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { TiArrowBack } from "react-icons/ti";
import HorizontalSlide from "../Components/HorizontalSlide";
import Footer from "../Components/Footer";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { WishlistContext } from "../utils/WishlistContext";

const MoviePlay = () => {
  const { id } = useParams();
  console.log(id);
  const {wishlist , setWishlist} = useContext(WishlistContext);
  const [data, setdata] = useState(null);
  const [video, setvideo] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const navigate = useNavigate();
  const getVideo = async () => {
    try {
      const { data } = await axios.get(`movie/${id}/videos`);
      setvideo(
        data.results.filter(
          (val, index) => val.type === "Trailer" && val.size >= 1080
        )
      );
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const getData = async () => {
    try {
      const { data } = await axios.get(`movie/${id}`);
      setdata(data);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const AddWishlist = (data) => {
    if (wishlist.some(obj => obj.id === data.id)) {
      setWishlist((prev) => prev.filter(item => item.id !== data.id));
    } else {
      setWishlist((prev) => [...prev, data]);
    }
  };
  const playMovie = () => {
    gsap
      .timeline()
      .to(".movie-heading", {
        opacity: 0,
        // display: "none",
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(
        ".video-player",
        {
          display: "block",
          opacity: 1,
          duration: 0.5,
        },
        "<"
      )
      .to(
        ".back-btn",
        {
          display: "block",
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );
  };
  const pauseMovie = () => {
    gsap
      .timeline()
      .to(".video-player", {
        opacity: 0,
        display: "none",
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(
        ".back-btn",
        {
          opacity: 0,
          display: "none",
          duration: 0.5,
        },
        "<"
      )
      .to(
        ".movie-heading",
        {
          // display: "flex",
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );
  };
  useEffect(() => {
    getData();
    getVideo();
    window.scrollTo(0, 0);
  }, [id]);
  return data != null ? (
    <div className="w-full h-fit pb-30 bg-[#00050D]">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
        className="movie-heading w-[100%] h-[60vh] md:h-[85vh] bg-cover bg-[50%_30%] flex flex-col justify-end gap-3 md:gap-5 text-white p-5 md:p-20 relative"
      >
        <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-transparent via-[#00050D80] to-[#00050D]"></div>
        <h1 className="heading text-4xl md:text-[6vw] font-semibold w-[90%] md:w-[65%] leading-[100%] z-10">
          {data.original_title || data.name}
        </h1>
        <div className="z-10 text- md:text-[1.2vw] w-[85%] md:w-[65%]">
          {isMobile ? data.tagline : data.overview}
        </div>
        <div className="flex gap-2 md:gap-4 items-center mt-1 text-zinc-300 md:text-2xl  z-10">
          <p>{data.release_date?.slice(0, 4)}</p>
          <p>
            {Math.floor(data.runtime / 60)}h {data.runtime % 60}min
          </p>
          <p className="text-yellow-300  font-semibold">
            IMDB: {data.vote_average.toFixed(1)}
          </p>
        </div>
        {!isMobile & !isTablet && video.length > 0 && (
          <div className="trailer-box absolute right-10 w-[23vw] h-[13.5vw] overflow-hidden rounded-md shadow-[50px_50px_50px_#00050Dd0]">
            <div className="size-[100%] absolute inset-0 bg-transparent z-10"></div>
            <iframe
              frameBorder="0"
              className="trailer size-[100%] object-fill scale-153"
              src={`https://www.youtube.com/embed/${video[0].key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${video[0].key}`}
              allowFullscreen
            ></iframe>
          </div>
        )}
        {data.genres ? (
          <div className="flex gap-2 md:gap-4 items-center mt-1 text-zinc-300 md:text-2xl  z-10">
            {data.genres.map((val, index) => (
              <p className="text-white font-semibold underline underline-offset-4">
                {val.name}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="w-full h-fit flex gap-5">
          <button
            onClick={playMovie}
            className="w-fit text-xl md:text-2xl h-fit px-4 md:px-7 md:py-4 py-3 bg-[#1A98FF] z-10 flex justify-center items-center rounded-md font-semibold transition-all duration-300 hover:shadow-[0_0_18px_4px_rgba(26,152,255,0.8)]"
          >
            Play Now
          </button>
          <button
            onClick={() => AddWishlist(data)}
            className="w-fit h-[3.5vw] text-black text-xl md:text-3xl px-4 md:px-7 md:py-4 py-3 bg-[#ffffff] z-10 flex justify-center items-center gap-4 rounded-md font-semibold cursor-pointer"
          >
            {
              data ? (wishlist.some(obj => obj.id === data.id) ? <p className="gap-3 w-full flex justify-center items-center"><FaHeart className="text-red-600" /></p> : <p className="gap-3 w-full flex justify-center items-center"> <FaRegHeart className="" /></p>) : ""
            }
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="w-fit text-xl md:text-2xl h-fit px-4 md:px-7 md:py-4 py-3 bg-[#ff221a] z-10 flex justify-center items-center rounded-md font-semibold transition-all duration-300 hover:shadow-[0_0_18px_4px_rgba(255,34,26,0.8)]"
          >
            Back
          </button>
        </div>
      </div>
      <iframe
        className="video-player w-full h-[50%] md:h-[75vh] hidden opacity-0 absolute inset-0 z-[9999]"
        src={`https://vidsrc-embed.ru/embed/movie?tmdb=${id}`}
        title="movie-player"
        allowFullScreen
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          pauseMovie();
        }}
        className="back-btn text-2xl w-fit h-fit opacity-0 bg-amber-300 rounded-md  md:text-5xl  text-white absolute top-10 left-10 z-[110000]
                "
      >
        <TiArrowBack />
      </button>
      <HorizontalSlide
        title={"Similer"}
        api_req={`movie/${id}/recommendations`}
        id={0}
        type={"movie"}
      />
      {data.genres &&
        data.genres.map((val, index) => (
          <HorizontalSlide
            key={index}
            title={val.name}
            api_req={`discover/movie?with_genres=${val.id}`}
            id={index + 1}
            page={3}
            type="movie"
          />
        ))}
      <Footer />
    </div>
  ) : (
    <img src="\output-onlinegiftools.gif" alt="" className="w-full h-screen" />
  );
};
export default MoviePlay;
