import React, { useEffect } from 'react'
import Wallpaper from '../Components/Wallpaper'
import HorizontalSlide from '../Components/HorizontalSlide'

const Home = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  return (
    <div className='w-full h-fit pb-50 bg-[#00050D]'>
      <Wallpaper api_req={"trending/movie/week"} />
      <HorizontalSlide title={"Treanding Now"} api_req={"trending/movie/week"} id={1} type={"movie"} page={1} />
      <HorizontalSlide title={"Top Rated"} api_req={"movie/top_rated"} id={2} type={"movie"} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Popular Movies"} api_req={"movie/popular"} id={3} type={"movie"} page={1}></HorizontalSlide>
      <HorizontalSlide title={"Horror Movies"} api_req={"discover/movie?with_genres=27"} id={4} page={3} type={"movie"}></HorizontalSlide>
      <HorizontalSlide title={"Sci Fi Movies"} api_req={"discover/movie?with_genres=878"} id={5} page={3} type={"movie"}></HorizontalSlide>
      <HorizontalSlide title={"Action Movies"} api_req={"discover/movie?with_genres=28"} id={6} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Indian Movies"} api_req={"discover/movie?with_original_language=hi&sort_by=popularity.desc"} id={7} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Thriller Movies"} api_req={"discover/movie?with_genres=53"} id={8} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Animation Movies"} api_req={"discover/movie?with_genres=16"} id={9} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Fantasy Movies"} api_req={"discover/movie?with_genres=14"} id={10} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Marvel Movies"} api_req={"discover/movie?with_companies=420"} id={11} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"DC Movies"} api_req={"discover/movie?with_companies=9993"} id={12} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Romantic Movies"} api_req={"discover/movie?with_genres=10749"} id={13} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Bollywood Romance"} api_req={"discover/movie?with_genres=10749&with_origin_country=IN"} id={14} type={"movie"} page={3}></HorizontalSlide>
      <HorizontalSlide title={"Comedy Movies"} api_req={"discover/movie?with_genres=35"} id={15} type={"movie"} page={3}></HorizontalSlide>
      {/* <HorizontalSlide title={"Comedy Movies"} api_req={"discover/movie?with_genres=35&with_origin_country=IN"} id={15} type={"movie"}></HorizontalSlide> */}
    </div>
  )
}

export default Home;