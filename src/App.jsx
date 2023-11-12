import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Frame from "./pages/Frame";
import MakeFrame from "./pages/MakeFrame";

function App() {
  console.log("isBrowser", isBrowser);
  console.log("isMobile", isMobile);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setScreenSize();

  window.addEventListener("resize", setScreenSize);

  return (
    <div className="App">
      <BrowserRouter>
        <BrowserView>
          <Routes>
            <Route path="/" element={<Frame />} />
            <Route path="/MakeFrame" element={<MakeFrame />} />
          </Routes>
        </BrowserView>
        <MobileView>
          <MakeFrame />
        </MobileView>
      </BrowserRouter>
    </div>
  );
}

export default App;
