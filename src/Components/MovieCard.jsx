import React from 'react'
import { RiMovie2Fill } from "react-icons/ri";
import { MdOutlineSlideshow } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { RiTvFill } from "react-icons/ri";

const MovieCard = ({ data, type }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className='group relative w-[40vw] md:w-[13vw] h-[50vw] md:h-[18vw] rounded-md overflow-hidden bg-zinc-900 transition-all duration-300 hover:scale-135 hover:z-30 shrink-0'>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title || data.name}
        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
      />
      {!isMobile && (
        <div className='absolute bottom-0 left-0 w-full p-3 bg-black/70 translate-y-full group-hover:translate-y-0 transition-all duration-300'>
          <h1 className='text-white text-base md:text-2xl font-bold truncate'>{data.title || data.name}</h1>
          <div className='flex gap-2 items-center mt-1 text-zinc-300 text-lg'>
            {type === "movie" ? <RiMovie2Fill /> : <RiTvFill />}
            <p>{data.release_date?.slice(0, 4) || data.first_air_date?.slice(0, 4)}</p>
            <p className='text-yellow-300 text-xl font-semibold'>{data.vote_average?.toFixed(1)}</p>
          </div>

          <Link to={`/${type}/${data.id}`} className='mt-3 inline-flex justify-center items-center w-20 h-20 bg-zinc-800 rounded-full hover:bg-white hover:text-black transition-all duration-300'>
            <MdOutlineSlideshow className='text-4xl' />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
