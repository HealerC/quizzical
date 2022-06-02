import React from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import StartGameSettings from "./components/StartGameSettings";
import Game from "./components/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/settings" element={<StartGameSettings />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<div>404 page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
