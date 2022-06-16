import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import ProtectedSettings from "./pages/ProtectedSettings";
import Game from "./pages/Game";
import SharedLayout from "./components/SharedLayout";

import { QuizzicalContext } from "./components/QuizzicalContext";
import "./stylesheets/app.css";

const App = () => {
  const { dispatch } = React.useContext(QuizzicalContext);

  React.useEffect(() => {
    try {
      const storage = window["localStorage"];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x); // Storage works

      const lastSession = storage.getItem("quizzical");
      if (lastSession) {
        const lastGameData = JSON.parse(lastSession);
        dispatch({ type: "LOAD_PREV_GAME", payload: lastGameData });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "NO_STORAGE" });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="settings"
            element={
              <ProtectedSettings>
                <Settings />
              </ProtectedSettings>
            }
          />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
