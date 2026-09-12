import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProviders } from "./app/AppProviders";
import "./styles/tokens.css";
import "./index.css";
import "./styles/no-dark-theme.css";
import "./styles/stt-master-v20260911.css";
import "./styles/stt-fullpage-canonical-20260912.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AppProviders><App /></AppProviders></React.StrictMode>
);