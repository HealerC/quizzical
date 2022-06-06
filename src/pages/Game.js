import React from "react";
import Question from "../components/Question";

const Game = ({ game }) => {
  console.log(game);
  return (
    <section>
      Game
      {JSON.stringify(game)}
      <button>Check answers</button>
    </section>
  );
};

export default Game;
