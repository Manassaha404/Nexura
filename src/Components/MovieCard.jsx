import React from "react";
import { RiMovie2Fill, RiTvFill } from "react-icons/ri";
import { MdOutlineSlideshow } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MovieCard = ({ data, type }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Link to={`/${type === "movie" ? `movies` : `tv`}/${data.id}`}>
      <div
        className="
        group relative 
        w-[33vw]  md:w-[28vw] lg:w-[20vw] xl:w-[13vw] 
        h-[50vw]  md:h-[42vw] lg:h-[30vw] xl:h-fit 
        rounded-xl overflow-hidden
        bg-zinc-900 shadow-md 
        transition-all duration-300 
        hover:scale-135 hover:z-30 shrink-0
      "
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {/* Poster Image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title || data.name}
          className="
          w-full h-full object-cover 
          group-hover:scale-110 
          transition-transform duration-300
        "
        />

        {/* Details (Hidden on mobile) */}
        {!isMobile && (
          <div
            className="
            absolute   bottom-0 left-0 right-0 scale-101 pb-5 p-5 !w-[100%] 
            bg-black/70 backdrop-blur-sm opacity-0
             group-hover:opacity-100 group-hover:translate-y-0 ease-in-out
             translate-y-full 
            transition-all duration-300 
          "
          >
            {/* Title */}
            <h1 className="text-white text-sm md:text-base lg:text-lg font-semibold truncate">
              {data.title || data.name}
            </h1>

            {/* Info Row */}
            <div className="flex flex-wrap gap-3 items-center mt-2 text-zinc-300 text-base md:text-lg xl:text-xl">
              {data.media_type === "movie" || type === "movie" ? (
                <RiMovie2Fill />
              ) : (
                <RiTvFill />
              )}
              <p>
                {data.release_date?.slice(0, 4) ||
                  data.first_air_date?.slice(0, 4)}
              </p>
              <p className="text-yellow-300 font-semibold">
                {data.vote_average?.toFixed(1)}
              </p>
            </div>

            {/* Watch Button */}
            <Link
              to={`/${type === "movie" ? `movies` : `tv`}/${data.id}`}
              className="
              mt-3 inline-flex justify-center items-center
              w-10 h-10 md:w-12 md:h-12 
              bg-zinc-800 rounded-full 
              hover:bg-white hover:text-black 
              transition-all duration-300
            "
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <MdOutlineSlideshow className="text-2xl md:text-3xl" />
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
