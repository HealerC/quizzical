import React from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";

const Game = ({ game }) => {
  return (
    <section>
      Game
      {game.game.map((question) => (
        <Question key={nanoid()} trivia={question} />
      ))}
      <button>Check answers</button>
    </section>
  );
};

export default Game;
