import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./styles/color.css";
import "./styles/typography.css";
import "./styles/general.css";
import "./styles/shadows.css";
import "./styles/animation.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
