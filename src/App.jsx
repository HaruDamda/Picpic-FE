import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Main from "./pages/Main/Main";
import Frame from "./pages/Frame/Frame";
import MakeFrame from "./pages/Frame/MakeFrame";
import Photobook from "./pages/Photobook/Photobook";
import { BrowserView, MobileView } from "react-device-detect";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setScreenSize();

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
              </Routes>
            </BrowserRouter>
          </MobileView>
        </header>
      </div>
    </>
  );
}

export default App;
