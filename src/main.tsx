import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import CssBaseline from "@mui/material/CssBaseline";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <CssBaseline>
        <App />
      </CssBaseline>
    </RecoilRoot>
  </React.StrictMode>
);
