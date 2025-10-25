import React, { useEffect } from 'react'
import Wallpaper from '../Components/Wallpaper'
import HorizontalSlide from '../Components/HorizontalSlide'
import Footer from '../Components/Footer'

const Home = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  return (
    <div className='w-full  min-h-[100vh]  bg-[#00050D]'>
      <Wallpaper api_req={"trending/all/day"}/>
      <HorizontalSlide title={"Treanding Now"} api_req={"trending/all/day"} id={1} type={"all"} page={1}/>
      <HorizontalSlide title={"Top Rated"} api_req={"movie/top_rated"} id={2} type={"movie"} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Popular Movies"} api_req={"movie/popular"} id={3} type={"movie"} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Popular Tv Shows"} api_req={"tv/popular"} id={4} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Top Rated Tv Shows"} api_req={"tv/top_rated"} id={5} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Action Movies"} api_req={"discover/movie?with_genres=28"} id={6} type={"movie"} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Indian Movies"} api_req={"discover/movie?with_original_language=hi&sort_by=popularity.desc"} id={7} type={"movie"} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Indian Tv Series"} api_req={"discover/tv?with_origin_country=IN&sort_by=popularity.desc"} id={8} type={"tv"} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Best Anime"} api_req={"discover/tv?with_origin_country=JP&with_genres=16&sort_by=vote_average.desc&vote_count.gte=1000"} id={9} type={"tv"} page={1}></HorizontalSlide>
      <Footer/>
    </div>
  )
}

export default Home;