import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProviders } from "./app/AppProviders";
import "./styles/tokens.css";
import "./index.css";
import "./styles/no-dark-theme.css";
import "./styles/stt-master-v20260911.css";
import "./styles/stt-fullpage-canonical-20260912.css";
import "./styles/stt-approved-heroes-20260915.css";
import "./styles/stt-hero-layer-fix-20260915.css";
import "./styles/stt-exact-source-fit-20260915.css";
import "./styles/stt-mobile-first-editorial.css";
import "./styles/stt-g0-shell.css";
import "./styles/stt-g1-home.css";
import "./styles/stt-g2-problems.css";
import "./styles/stt-g3-method.css";
import "./styles/stt-g4-engagement.css";
import "./titleRules";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AppProviders><App /></AppProviders></React.StrictMode>
);