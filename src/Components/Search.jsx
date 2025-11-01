import axios from "../utils/Axios";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { SearchContext } from "../utils/Context";
import { useContext } from "react";
const Search = () => {
  const [val, setval] = useState([false, ""]);
  const [search, setSearch] = useState([]);
  const divClick = useRef(null);

  const { setdata } = useContext(SearchContext);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".Search-bar", {
      scale: 1,
      opacity: 1,
      ease: "power1.inOut",
    }).to(
      ".Search-overlay",
      {
        display: "block",
      },
      "<"
    );
  }, [val[0]]);

  const getSerch = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${val[1]}`);
      setSearch(data.results);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const handelChange = (e) => {
    setval([val[0], e.current.value]);
  };
  useEffect(() => {
    getSerch();
  }, [val[1]]);
  const inputRef = useRef(null);

  return (
    <>
      <IoIosSearch
        className="text-3xl font-semibold"
        onClick={() => {
          setval([!val[0], ""]);
        }}
      />
      {val[0] && (
        <div
          onClick={() => {
            setval([!val[0], ""]);
          }}
          ref={divClick}
          className="!w-[120vw]    Search-overlay h-[100vh] hidden !inset-0 absolute bg-black opacity-75 "
        ></div>
      )}
      {val[0] && (
        <div className="Search-bar absolute w-[90%] md:w-[80%] px-10  py-10 bg-[#151B23] left-1/2 -translate-x-1/2 top-15 rounded-md md:top-20 z-9999 flex flex-col items-center justify-center scale-0 opacity-0 ">
          <div className="w-full flex justify-center relative items-center">
            <Link
              onClick={() => {
                setval((prev) => [!prev[0], prev[1]]);
                setdata(search);
              }}
              to={"search"}
              className="-mr-8 md:-mr-12 z-10 md:text-3xl text-2xl "
            >
              <IoIosSearch />
            </Link>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              className="bg-[#33373D] md:w-[95%] w-[90%] h-[8vh] rounded-md pl-10 md:pl-17 pr-18 text-xl"
              onChange={() => {
                handelChange(inputRef);
              }}
            />
            {val[1] != "" ? (
              <h1
                onClick={() => {
                  inputRef.current.value = "";
                  handelChange(inputRef);
                }}
                className="-ml-12 md:-ml-16 md:text-xl font-semibold opacity-40 cursor-pointer"
              >
                Clear
              </h1>
            ) : (
              <h1></h1>
            )}
          </div>
          <div className="w-full max-h-[50vh] md:max-h-[40vh] overflow-y-auto flex flex-col items-center result-box">
            {search
              .filter(
                (val, index) =>
                  val.media_type === "movie" || val.media_type === "tv"
              )
              .map((val, index) => (
                <Link
                  onClick={() => {
                    divClick.current.click();
                  }}
                  to={`${
                    val.media_type === "movie"
                      ? `/movies/${val.id}`
                      : `/tv/${val.id}`
                  }`}
                  className="w-[90%] md:w-[95%] hover:bg-white hover:text-black font-semibold h- md:h-[5vh] px-4.5 text-lg md:text-xl  rounded-md flex items-center mt-6 shrink-0"
                >
                  {val.original_title || val.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
