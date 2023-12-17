import "./App.css";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter, useParams } from "react-router-dom";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Main from "./pages/Main/Main";
import Frame from "./pages/Frame/Frame";
import MakeFrame from "./pages/Frame/MakeFrame";
import Photobook from "./pages/Photobook/Photobook";
import PhotobookUuid from "./pages/Photobook/PhotobookUuid";
import {
  BrowserView,
  MobileView,
} from "react-device-detect";
import FrameList from "./component/AllFrameCpn/FrameList";
import PhotoSelect from "./pages/Photobook/PhotoSelect";
// import { useAtom } from "jotai";
// import axios from "axios";
// import { accessTokenAtom, setAccessToken } from "./store/jotaiAtoms";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  window.addEventListener("resize", setScreenSize);

  return (
    <>
    <div className="App">
      <header className="App-header">
        <BrowserView>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/frame" element={<Frame />} />
              <Route path="/makeframe" element={<MakeFrame />} />
              <Route path="/photobook" element={<Photobook />} />
              <Route path="/photoselect" element={<PhotoSelect />} />
              <Route path="/photobook/:uuid" element={<PhotobookUuid />} />
            </Routes>
          </BrowserRouter>
        </BrowserView>
        <MobileView>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/frame" element={<Frame />} />
              <Route path="/makeframe" element={<MakeFrame />} />
              <Route path="/photobook" element={<Photobook />} />
              <Route path="/framelist" element={<FrameList />} />
              <Route path="/photoselect" element={<PhotoSelect />} />
            </Routes>
          </BrowserRouter>
        </MobileView>
      </header>
    </div>
    </>
  );
}

export default App;
