import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "../utils/Axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useQuery } from '@tanstack/react-query';

const HorizontalSlide = ({ title, api_req, id, type, page }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const fetchMovies = async () => {
    let allResults = [];
    const totalPages = page || 1;

    for (let i = 1; i <= totalPages; i++) {
      const { data } = await axios.get(
        page > 1 ? `${api_req}&page=${i}` : api_req
      );
      allResults = [...allResults, ...data.results];
    }
    return allResults;
  };

  const { data: Details = [] } = useQuery({
    queryKey: [api_req, page], 
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 10, 
    cacheTime: 1000 * 60 * 15, 
  });



  return (
    Details.length > 0 && (
      <div className="p-5 md:px-20 w-full h-[50vw] md:h-[47vh] relative mt-15 md:mt-0">
        {!isMobile && (
          <>
            <div
              className={`swiper-button-next-${id} absolute z-50 flex items-center justify-center !top-50 !right-0 !h-[15vh] !w-[3%] bg-black opacity-30 hover:opacity-80 transition-all duration-200 hover:scale-110 rounded-l-lg cursor-pointer`}
            >
              <span className="text-white text-5xl ">›</span>
            </div>
            <div
              className={`swiper-button-prev-${id} absolute z-50 flex items-center justify-center !top-50 !left-0 !h-[15vh] !w-[3%] bg-black opacity-30 hover:opacity-80 transition-all duration-200 hover:scale-110 rounded-r-lg cursor-pointer`}
            >
              <span className="text-white text-5xl ">‹</span>
            </div>
          </>
        )}
        <h1 className="text-white text-xl md:text-5xl font-semibold slider-title">{title}</h1>

        <Swiper
          slidesPerView={isMobile ? 2.5 : 6}
          spaceBetween={5}
          pagination={false}
          navigation={{
            nextEl: `.swiper-button-next-${id}`,
            prevEl: `.swiper-button-prev-${id}`,
          }}
          slidesPerGroup={isMobile ? 1 : 4}
          speed={isMobile ? 300 : 1000}
          modules={[Pagination, Navigation]}
          className="mySwiper mt-4 md:mt-10"
        >
          {Details.map((val, index) => (
            <SwiperSlide key={index}>
              <Link to={`${type === "movie" ? `/movies/${val.id}` : `/tv/${val.id}`}`}>
                <MovieCard data={val} type={type} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default HorizontalSlide;
