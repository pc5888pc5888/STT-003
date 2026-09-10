import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProviders } from "./app/AppProviders";
import "./styles/tokens.css";
import "./index.css";
import "./styles/no-dark-theme.css";
import "./styles/approved-stt.css";
import "./styles/stt-refinement-v4.css";
import "./styles/stt-route-visuals-v1.css";
import "./styles/stt-stage2.css";
import "./styles/stt-stage2-polish.css";
import "./styles/stt-stage3.css";
import "./styles/stt-native-artwork.css";
import "./titleRules";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AppProviders><App /></AppProviders></React.StrictMode>
);
