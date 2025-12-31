import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import gsap from "gsap";
import { TiArrowBack } from "react-icons/ti";
import HorizontalSlide from "../Components/HorizontalSlide";
import Footer from "../Components/Footer";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { WishlistContext } from "../utils/WishlistContext";

const TvPlay = () => {
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { id } = useParams();
  const [data, setdata] = useState(null);
  const [video, setvideo] = useState([]);
  const [seasons, setseasons] = useState(1);
  const [seasonData, setseasonData] = useState(null);
  const [play, setPlay] = useState([seasons, 1]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  function formatDate(input) {
    const date = new Date(input);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const AddWishlist = (data) => {
    if (wishlist.some(obj => obj.id === data.id)) {
      setWishlist((prev) => prev.filter(item => item.id !== data.id));
    } else {
      setWishlist((prev) => [...prev, data]);
    }
  };
  const getSeasonData = async () => {
    try {
      const { data } = await axios.get(`tv/${id}/season/${seasons}`);
      setseasonData(data);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const getData = async () => {
    try {
      const { data } = await axios.get(`tv/${id}`);
      setdata(data);
    } catch (e) {
      console.log("Error: ", e);
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
    getSeasonData();
  }, [seasons, id]);
  const getVideo = async () => {
    try {
      const { data } = await axios.get(`tv/${id}/videos`);
      setvideo(data.results.filter((val, index) => val.type === "Trailer"));
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  useEffect(() => {
    getData();
    getVideo();
    window.scrollTo(0, 0);
  }, [id]);

  return (data != null) & (seasonData != null) ? (
    <div className="w-full h-fit pb-30 md:pb-0 bg-[#00050D]">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
        className="movie-heading w-[100%] h-[60vh] md:h-[85vh] bg-cover bg-[50%_30%] flex flex-col justify-end gap-1 md:gap-5 text-white p-5 md:p-20 relative"
      >
        <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-transparent via-[#00050D80] to-[#00050D]"></div>
        <h1 className="heading text-4xl md:text-[6vw] font-semibold w-[90%] md:w-[65%] leading-[100%] z-10">
          {data.original_title || data.name}
        </h1>
        <div className="z-10 text- md:text-[1.2vw] w-[85%] md:w-[65%] font-semibold">
          {isMobile ? data.tagline : seasonData.overview}
        </div>
        <div className="flex gap-2 md:gap-4 items-center mt-1 text-zinc-300 md:text-2xl  z-10">
          <p>{seasonData.air_date?.slice(0, 4)}</p>
          {Math.floor(seasonData.episodes[0].runtime / 60) !== 0 &&
            `${Math.floor(seasonData.episodes[0].runtime / 60)}h`}{" "}
          {seasonData.episodes[0].runtime % 60}min
          <p className="text-yellow-300  font-semibold">
            IMDB: {data.vote_average.toFixed(1)}
          </p>
          <p className="">{seasonData.episodes.length} episodes</p>
        </div>
        {!isMobile && video.length > 0 && (
          <div className="trailer-box absolute right-10 w-[23vw] h-[13.5vw] overflow-hidden rounded-md shadow-[50px_50px_50px_#00050Dd0] bg-amber-500">
            <div className="size-[100%] absolute inset-0  z-10 bg-transparent   "></div>
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
        <select
          value={seasons}
          onChange={(e) => {
            setseasons(Number(e.target.value));
            setPlay([Number(e.target.value), 1]);
          }}
          className="md:w-[10vw] w-[30vw] z-10 bg-[#0F172A] text-white border border-gray-600 rounded-md px-2  py-2 md:px-2 md:py-2 text-lg md:text-xl font-semibold outline-none hover:border-[#1A98FF] transition-all duration-300 hover:shadow-[0_0_18px_4px_rgba(26,152,255,0.5)] appearance-none cursor-pointer"
        >
          {data.seasons &&
            data.seasons
              .filter((val) => val.name !== "Specials")
              .map((val, index) => (
                <option
                  key={index}
                  value={val.season_number}
                  className="bg-[#00050D] text-white"
                >
                  {val.name}
                </option>
              ))}
        </select>
        <div className="w-full h-fit flex gap-2 md:gap-5">
          <button
            onClick={() => {
              playMovie();
            }}
            className="w-fit text-sm md:text-2xl h-fit px-4 md:px-7 md:py-4 py-3 bg-[#1A98FF] z-10 flex justify-center items-center rounded-md font-semibold transition-all duration-300 hover:shadow-[0_0_18px_4px_rgba(26,152,255,0.8)]"
          >
            Play Now
          </button>
          <button
            onClick={() => AddWishlist(data)}
            className="w-fit h-[12.5vw] md:h-[3.5vw] text-black text-2xl md:text-3xl px-4 md:px-7 md:py-4 py-3 bg-[#ffffff] z-10 flex justify-center items-center gap-4 rounded-md font-semibold cursor-pointer"
          >
            {data ? (
              wishlist.some((obj) => obj.id === data.id) ? (
                <p className="gap-3 w-full flex justify-center items-center">
                  <FaHeart className="text-red-600" />
                </p>
              ) : (
                <p className="gap-3 w-full flex justify-center items-center">
                  {" "}
                  <FaRegHeart className="" />
                </p>
              )
            ) : (
              ""
            )}
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="w-fit text-sm md:text-2xl h-fit px-4 md:px-7 md:py-4 py-3 bg-[#ff221a] z-10 flex justify-center items-center rounded-md font-semibold transition-all duration-300 hover:shadow-[0_0_18px_4px_rgba(255,34,26,0.8)]"
          >
            Back
          </button>
        </div>
      </div>
      <h1 className="text-white text-3xl md:text-5xl font-semibold slider-title md:px-27 px-5 md:mb-10 mb-6">
        Episodes
      </h1>
      {seasonData.episodes.map((val, index) => (
        <div
          onClick={() => {
            setPlay((prev) => [prev[0], index + 1]);
            playMovie();
            window.scrollTo(0, 0);
          }}
          key={index}
          className="w-[92%] mx-auto h-fit flex bg-[#33373D] md:bg-transparent gap-4 md:p-8 rounded-md transition-all duration-300 hover:bg-[#33373D] cursor-pointer md:-mt-5 mt-2"
        >
          {!isMobile && (
            <img
              className="h-[13vw] w-[18vw] object-cover rounded-md"
              src={`https://image.tmdb.org/t/p/original${val.still_path}`}
              alt=""
            />
          )}

          <div className="md:w-[60%] w-full  md:p-5 p-2 text-xl md:text-4xl font-semibold text-white flex flex-col justify-center md:gap-3">
            <p>
              S{seasons} E{index + 1}
            </p>
            {isMobile && <p className="text-xl text-zinc-300">{val.name}</p>}
            {!isMobile && (
              <>
                <div className="flex gap-3 text-3xl">
                  <p>{formatDate(val.air_date)}</p>
                  <p>
                    {Math.floor(val.runtime / 60) !== 0 &&
                      `${Math.floor(val.runtime / 60)}h`}{" "}
                    {val.runtime % 60}min
                  </p>
                </div>
                <p className="text-2xl text-zinc-300">{val.overview}</p>
              </>
            )}
          </div>
        </div>
      ))}
      <iframe
        className="video-player w-full h-[60vh] md:h-[83vh] hidden opacity-0 absolute inset-0 !z-[9999]"
        src={`https://vidsrcme.ru/embed/tv?tmdb=${id}&season=${play[0]}&episode=${play[1]}`}
        title="movie-player"
        allowFullScreen
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          pauseMovie();
        }}
        className="back-btn text-2xl w-fit h-fit opacity-0 bg-amber-300 rounded-md  md:text-6xl  text-white absolute top-12 left-20 z-[1110000]"
      >
        <TiArrowBack />
      </button>
      <HorizontalSlide
        title={"People Also Watch"}
        api_req={`tv/${id}/recommendations`}
        id={0}
        type={"tv"}
      />
      <HorizontalSlide
        title={"Similer"}
        api_req={`tv/${id}/similar`}
        id={1}
        type={"tv"}
      />
      {data.genres &&
        data.genres.map((val, index) => (
          <HorizontalSlide
            key={index}
            title={`${val.name}`}
            api_req={`discover/tv?with_genres=${val.id}`}
            id={index + 2}
            page={3}
            type="tv"
          />
        ))}
      <Footer />
    </div>
  ) : (
    <img src="\output-onlinegiftools.gif" alt="" className="w-full h-screen" />
  );
};
export default TvPlay;
