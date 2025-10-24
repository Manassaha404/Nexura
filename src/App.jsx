import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";
import Tv from "./Pages/Tv";
import MoviePlay from "./Pages/MoviePlay";
import GenarelSearch from "./Pages/GenarelSearch";
import TvPlay from "./Pages/TvPlay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const queryClient = new QueryClient();
  const isMobile = useMediaQuery({ maxWidth: 768 })
  if (!isMobile) {
    useLayoutEffect(() => {
      if (typeof window !== "undefined") {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 2,
          effects: true,
          smoothTouch: true,
          speed: 1.3,
          ignoreMobileResize: true,
        });
      }
    }, []);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="movies" element={<Movie />} />
            <Route path="search" element={<GenarelSearch />} />
            <Route path="movies/:id" element={<MoviePlay />} />
            <Route path="tv/:id" element={<TvPlay />} />
            <Route path="tv" element={<Tv />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
