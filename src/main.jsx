import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./utils/Context.jsx";
import WishlistCon from "./utils/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <WishlistCon>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </WishlistCon>
);
