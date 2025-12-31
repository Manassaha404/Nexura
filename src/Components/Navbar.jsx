import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { FaHeart } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Search from "./Search";

const Navbar = () => {
  const [val, setVal] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1); // if scroll > 1px, set back the background
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (val) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".mov-nav",
        { height: 0 },
        { height: "45vw", ease: "power1.inOut", duration: 0.5 }
      ).fromTo(
        ".mov-nav-ele",
        { opacity: 0 },
        { opacity: 1, ease: "circ.in", stagger: 0.05 },
        "-=0.2"
      );
    } else {
      gsap.to(".mov-nav", {
        height: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
  }, [val]);

  return (
    <div className="Navbar fixed top-0 w-full flex justify-center  h-[15vw] md:h-[10vw] lg:h-[10vh] 2xl:h-[4vw] items-center text-white z-[99]">
      <nav
        className={`w-full justify-between flex md:w-[80%] h-full items-center md:rounded-b-lg px-[6vw] transition-all ${
          isMobile
            ? `bg-[#141921]`
            : `${
                isScrolled
                  ? "bg-black/50 lg:backdrop-blur-sm"
                  : "bg-transparent`} duration-300"
              }`
        }`}
      >
        {isMobile && val && (
          <div className="mov-nav w-[40%] h-0 absolute top-full left-0 flex flex-col justify-around px-4 bg-[#141921] rounded-b-md z-50 text-white">
            <NavLink
              onClick={() => setVal(false)}
              className="mov-nav-ele opacity-0 text-xl font-semibold py-3"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVal(false)}
              className="mov-nav-ele opacity-0 text-xl font-semibold py-3"
              to="/movies"
            >
              Movies
            </NavLink>
            <NavLink
              onClick={() => setVal(false)}
              className="mov-nav-ele opacity-0 text-xl font-semibold py-3"
              to="/tv"
            >
              Tv Shows
            </NavLink>
          </div>
        )}
        {isMobile && (
          <div className="flex items-center w-full gap-5">
            <MdOutlineMenu
              onClick={() => setVal(!val)}
              className="text-3xl cursor-pointer"
            />
            <h1 className="logo text-3xl">Nexura</h1>
          </div>
        )}
        {!isMobile && (
          <div className="flex w-[40%] md:w-[80%] 2xl:w-[40%] justify-between items-center mt-1 md:gap-5 xl:gap-2 flex-nowrap">
            <h1 className="logo text-3xl">Nexura</h1>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " md:text-[3vw] lg:text-[2vw] xl:text-2xl xl:w-fit md:w-fit md:px-2 h-fit xl:h-[3vw] flex items-center justify-center rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200 "
                  : " md:text-[3vw] lg:text-[2vw] xl:text-2xl  xl:w-fit md:w-fit md:px-2 h-fit xl:h-[3vw] flex items-center justify-center rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200 "
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black  md:text-[3vw] lg:text-[2vw] xl:text-2xl xl:w-fit md:w-fit md:px-2 h-fit xl:h-[3vw] flex items-center justify-center rounded-xl font-semibold transition-all duration-200 opacity-75"
                  : " md:text-[3vw] lg:text-[2vw] xl:text-2xl xl:w-fit md:w-fit md:px-2 h-fit xl:h-[3vw] flex items-center justify-center rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200"
              }
              to="/movies"
            >
              Movies
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black md:text-[3vw] lg:text-[2vw] xl:text-2xl xl:w-fit md:w-fit md:px-2 h-fit xl:h-[3vw] flex items-center justify-center rounded-xl font-semibold transition-all duration-200 opacity-75 shrink-0"
                  : "md:text-[3vw] lg:text-[2vw] xl:text-2xl  h-fit xl:h-[3vw] xl:w-fit md:w-fit md:px-2 flex items-center justify-center rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200"
              }
              to="/tv"
            >
              Tv show
            </NavLink>
          </div>
        )}
        <div className=" flex gap-5 items-center">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black md:text-[3vw] lg:text-[2vw] xl:text-2xl xl:w-fit md:w-fit px-2 py-3 md:px-2 h-fit xl:h-[3vw] flex items-center justify-center rounded-xl font-semibold transition-all duration-200 opacity-75 shrink-0"
                : "md:text-[3vw] lg:text-[2vw] xl:text-2xl  h-fit xl:h-[3vw] xl:w-fit md:w-fit px-2 py-3 md:px-2 flex items-center justify-center rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200"
            }
            to="/wishlist"
          >
            <FaHeart />
          </NavLink>
          <Search />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
