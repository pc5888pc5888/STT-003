import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProviders } from "./app/AppProviders";
import "./styles/tokens.css";
import "./index.css";
import "./styles/no-dark-theme.css";

import "./styles/stt-g0-shell.css";
import "./styles/stt-g1-home.css";
import "./styles/stt-g2-problems.css";
import "./styles/stt-g3-method.css";
import "./styles/stt-g4-engagement.css";

import "./styles/stt-institutional-pages.css";
import "./styles/stt-g6-insights.css";
import "./styles/stt-g9-accessibility.css";

import "./styles/convergence-accessibility.css";

import "./styles/cis-page-system.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AppProviders><App /></AppProviders></React.StrictMode>
);
