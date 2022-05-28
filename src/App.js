import React from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import StartGameSettings from "./components/StartGameSettings";
import Game from "./components/Game";

const App = () => {
  return (
    <div className="App">
      <WelcomeScreen />
      <StartGameSettings />
      <Game />
    </div>
  );
};

export default App;
