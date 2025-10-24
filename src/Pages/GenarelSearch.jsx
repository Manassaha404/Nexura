import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../utils/Context'
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import MovieCard from '../Components/MovieCard';
import HorizontalSlide from '../Components/HorizontalSlide';
import Footer from '../Components/Footer';

const GenarelSearch = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data } = useContext(SearchContext);

    if (!data || data.length === 0) return <img className='w-[100vw] h-[100vh] object-cover' src="\output-onlinegiftools.gif" alt="" />;
    return (
        <div className='w-full h-fit bg-[#00050D] overflow-x-visible md:overflow-hidden'>
            <div
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data[0].backdrop_path})` }}
                className='w-full h-[60vh] md:h-[80vh] bg-cover bg-center flex flex-col justify-end gap-4 text-white p-5 md:p-20 relative'
            >
                <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-transparent via-[#00050Dd0] to-[#00050D]"></div>

                <h1 className='heading text-3xl md:text-[6vw] font-semibold w-[90%] md:w-[65%] leading-tight z-10'>
                    {data[0].original_title || data[0].name}
                </h1>

                <div className='z-10 text-sm md:text-[1.2vw] w-[90%] md:w-[45%] leading-relaxed'>
                    {data[0].overview.slice(0, 130)}
                    <span className='text-blue-300 cursor-pointer'>
                        <Link>...more</Link>
                    </span>
                </div>

                <Link
                    to={`${data[0].media_type === "movie" ? `/movies/${data[0].id}` : `/tv/${data[0].id}`}`}
                    className='w-fit text-base md:text-2xl px-5 md:px-7 py-3 md:py-4 bg-[#1A98FF] z-10 rounded-md font-semibold transition-all duration-300 hover:shadow-[0_0_18px_4px_rgba(26,152,255,0.8)]'
                >
                    Watch Now
                </Link>
            </div>
            <div className='flex h-fit flex-col w-full gap-8 px-4 md:px-20 mt-10'>
                <h1 className="text-white text-2xl md:text-5xl font-semibold slider-title">Top Search</h1>

                <div className='flex w-full overflow-x-auto pb-4 gap-5 md:gap-10  md:flex-wrap md:overflow-visible no-scrollbar'>
                    {data.map((val, index) => (
                        <MovieCard key={val.id || index} data={val} type={val.media_type || "movie"} />
                    ))}
                </div>
            </div>

            {data[0].genre_ids && data[0].genre_ids.slice(0, 1).map((val, index) => (
                <HorizontalSlide
                    key={`movie-${index}`}
                    title="Similar Movies"
                    api_req={`discover/movie?with_genres=${val}`}
                    id={0}
                    page={3}
                    type="movie"
                />
            ))}

            {data[0].genre_ids && data[0].genre_ids.slice(0, 1).map((val, index) => (
                <HorizontalSlide
                    key={`tv-${index}`}
                    title={"Similar TV Shows"}
                    api_req={`discover/tv?with_genres=${val}`}
                    id={1}
                    page={3}
                    type="tv"
                />
            ))}
            <Footer />
        </div>
    );
}
export default GenarelSearch;
