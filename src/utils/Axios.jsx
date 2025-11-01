import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWQ0YzcxMjZmYWFmN2UzOTNiZDVkZDY2NGI3ZjFiNyIsIm5iZiI6MTc2MDI3OTI3MC40MDksInN1YiI6IjY4ZWJiYWU2NGRhMjA2YjYwYWMzZTE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H5r0QIJd8Ot9-pmI4ehvBXoFiVqFFMvryXnpeKVUTYg",
  },
});

export default instance;
