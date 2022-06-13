import React from "react";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import ProtectedSettings from "./pages/ProtectedSettings";
import Game from "./pages/Game";
import SharedLayout from "./components/SharedLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DEFAULT_STATE, quizzicalReducer } from "./components/reducer";
//import QuizzicalContext from "./components/QuizzicalContext";
import { QuizzicalContext } from "./components/QuizzicalContext";

const App = () => {
  const [game, setGame] = React.useState({
    username: "",
    game: [],
    url: "",
    time: 0,
  });

  //const [state, dispatch] = React.useReducer(DEFAULT_STATE, quizzicalReducer);
  const { state, dispatch } = React.useContext(QuizzicalContext);
  React.useEffect(() => {
    try {
      const storage = window["localStorage"];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x); // Storage works

      const lastSession = storage.getItem("quizzical");
      if (lastSession) {
        const lastGameData = JSON.parse(lastSession);
        console.log("something here last time", lastGameData);
        dispatch({ type: "LOAD_PREV_GAME", payload: lastGameData });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "NO_STORAGE" });
    }
  }, []);
  console.log("app", state);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="settings"
            element={
              <ProtectedSettings>
                <Settings setGame={setGame} />
              </ProtectedSettings>
            }
          />
          <Route path="game" element={<Game game={game} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
// export { QuizzicalContext };
export default App;
