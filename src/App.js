import React from "react";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Game from "./pages/Game";
import SharedLayout from "./components/SharedLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [game, setGame] = React.useState({ username: "", game: [] });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings setGame={setGame} />} />
          <Route path="game" element={<Game game={game} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
