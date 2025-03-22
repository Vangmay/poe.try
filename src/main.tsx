import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactGA from "react-ga4";

ReactGA.initialize("G-71EP8PY3Z9");
ReactGA.send({
  hitview: "pageview",
  page: window.location.pathname,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
