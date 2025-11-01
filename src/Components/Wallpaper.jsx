import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Wallpaper = ({ api_req }) => {
  let fetchData = async () => {
    let allData = [];
    try {
      const { data } = await axios.get(`${api_req}`);
      allData = data.results;
    } catch (e) {
      console.log("Error: ", e);
    }
    return allData;
  };
  const { data: wallpaper = [] } = useQuery({
    queryKey: [api_req],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 15,
  });
  return wallpaper.length > 1 ? (
    <div className="w-full h-[50vh] xl:h-[75vh] relative -mb-15 md:-mb-0">
      <Swiper
        spaceBetween={0}
        centeredSlides={false}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={false}
        speed={1000}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        className="mySwiper h-full"
      >
        {wallpaper.map((val, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${val.backdrop_path})`,
              }}
              className="size-[100%] bg-cover bg-[50%_30%] flex flex-col justify-end gap-5 text-white p-5 md:p-20 relative"
            >
              <div className="absolute w-full !h-full inset-0 bg-gradient-to-b from-transparent via-[#00050D80] to-[#00050D]"></div>
              <h1 className="heading text-4xl md:text-[6vw] font-semibold w-[90%] md:w-[65%] leading-[100%] z-10">
                {val.original_title || val.name}
              </h1>
              <div className="z-10 text-xs md:text-[1.2vw] w-[85%] md:w-[45%]">
                {val.overview.slice(0, 130)}
                <span className="text-blue-300">
                  <Link>...more</Link>
                </span>
              </div>
              <Link
                to={`/${val.media_type === "movie" ? `movies` : `tv`}/${
                  val.id
                }`}
                className="w-fit text-xl md:text-2xl h-fit px-4 md:px-7 md:py-4 py-3 bg-[#1A98FF] z-10 flex justify-center items-center rounded-md font-semibold transition-all duration-300 hover:shadow-[0_0_18px_4px_rgba(26,152,255,0.8)]"
              >
                Watch Now
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <img
      className="w-[100vw] h-[100vh] object-cover"
      src="\output-onlinegiftools.gif"
      alt=""
    />
  );
};

export default Wallpaper;
