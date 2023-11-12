import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Main from "./pages/Main/Main"
import {
  BrowserView,
  MobileView,
} from "react-device-detect";

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <BrowserView>
          <h1>모바일로 접속해주세요</h1>
          <h2>PC 뷰는 준비 중 ...</h2>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
            </Routes>
          </BrowserRouter>
        </BrowserView>
        <MobileView>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
            </Routes>
          </BrowserRouter>
        </MobileView>
      </header>
    </div>
    </>
  )
}

export default App;
