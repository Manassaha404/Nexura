import React, { useContext } from 'react'
import { WishlistContext } from '../utils/WishlistContext'
import MovieCard from '../Components/MovieCard'
import Footer from '../Components/Footer'

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  return (
    <div className="w-full min-h-dvh bg-[#00050D] pb-[10vh] md:pb-[6vh] overflow-x-visible md:overflow-hidden pt-[10vh] flex flex-col justify-between">
      <div className="flex h-fit flex-col w-full gap-8 px-4 md:px-20 mt-10">
        <h1 className="text-white text-2xl md:text-5xl font-semibold slider-title">
          My Wishlist
        </h1>
        <div className="flex w-full overflow-x-auto pb-4 gap-5 md:gap-10  md:flex-wrap md:overflow-visible no-scrollbar">
          {wishlist.map((val, index) => (
            <MovieCard
              key={val.id || index}
              data={val}
              type={val.media_type || "movie"}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Wishlist