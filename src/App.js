import "./App.css";
import Hangman from "./pages/Hangman";
import MemesGame from "./pages/MemesGame";
import Tenzies from "./pages/Tenzies";

import MainPage from "./pages/MainPage";
import Navbar from "./common/Navbar";
import { Route, Router, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainPage />} />
          <Route path="/Tenzies" element={<Tenzies />} />
          <Route path="/HangMan" element={<Hangman />} />
          <Route path="/MemesGame" element={<MemesGame />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
