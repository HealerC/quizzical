import React from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";

const Game = ({ game }) => {
  const [status, setStatus] = React.useState(0);
  const [scores, setScores] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);

  React.useEffect(() => {
    setQuiz(game.game);
  }, [game]);

  const handleChange = (event, id) => {
    const value = event.target.value;
    setQuiz(
      quiz.map((question) => {
        if (question.id === id) return { ...question, selected: value };
        return question;
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(1); // Game over
  };

  return (
    <>
      <h2>{game.username}</h2>
      <form id="game-form" onSubmit={handleSubmit}>
        {quiz.map((trivia) => (
          <Question
            key={nanoid()}
            trivia={trivia}
            handleChange={handleChange}
          />
        ))}
      </form>
      <footer>
        <button type="submit" form="game-form">
          Check answers
        </button>
        {status === 1 && (
          <p className="info">
            You got {scores}/{game.game.length} correctly
          </p>
        )}
      </footer>
    </>
  );
};

export default Game;
