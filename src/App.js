import React from "react";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Game from "./pages/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<div>404 page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
