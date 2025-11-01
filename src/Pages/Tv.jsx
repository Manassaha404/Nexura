import React, { useEffect } from "react";
import Wallpaper from "../Components/Wallpaper";
import HorizontalSlide from "../Components/HorizontalSlide";
import Footer from "../Components/Footer";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="w-full h-fit pb-[10vh] md:pb-[6vh] bg-[#00050D]">
      <Wallpaper api_req={"tv/top_rated"} />
      <HorizontalSlide
        title={"Treanding Now"}
        api_req={"trending/tv/week"}
        id={1}
        type={"all"}
        page={1}
      />
      <HorizontalSlide
        title={"Popular Tv Shows"}
        api_req={"tv/popular"}
        id={2}
        page={1}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"Top Rated Tv Shows"}
        api_req={"tv/top_rated"}
        id={3}
        page={1}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"Sci-Fi & Fantasy"}
        api_req={"discover/tv?with_genres=10765"}
        id={4}
        type={"tv"}
        page={3}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"Mystery"}
        api_req={"discover/tv?with_genres=9648"}
        id={5}
        type={"tv"}
        page={3}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"Indian Tv Series"}
        api_req={
          "discover/tv?with_origin_country=IN&sort_by=popularity.desc&page=1"
        }
        id={6}
        type={"tv"}
        page={3}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"Anime"}
        api_req={
          "discover/tv?with_origin_country=JP&with_genres=16&sort_by=vote_average.desc&vote_count.gte=1000"
        }
        id={7}
        type={"tv"}
        page={3}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"Netflix Best"}
        api_req={"discover/tv?with_networks=213&sort_by=popularity.desc"}
        id={8}
        type={"tv"}
        page={3}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"Amazon Prime Best"}
        api_req={"discover/tv?with_networks=1024&sort_by=popularity.desc"}
        id={9}
        type={"tv"}
        page={3}
      ></HorizontalSlide>
      <HorizontalSlide
        title={"HBO Best"}
        api_req={"discover/tv?with_networks=49&sort_by=popularity.desc"}
        id={10}
        type={"tv"}
        page={3}
      ></HorizontalSlide>
      <Footer />
    </div>
  );
};

export default Home;
