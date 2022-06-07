import React from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";

const Game = ({ game }) => {
  const [status, setStatus] = React.useState(0);
  const [score, setScore] = React.useState(0);
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
    const userScore = quiz.reduce((cumulativeSum, question) => {
      if (question.selected === question.correct_answer) {
        let num = cumulativeSum + 1;
        return num;
      }
      return cumulativeSum;
    }, 0);
    setScore(userScore);
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
            status={status}
          />
        ))}
      </form>
      <footer>
        <button type="submit" form="game-form">
          Check answers
        </button>
        {status === 1 && (
          <p className="info">
            You got {score}/{game.game.length} correctly
          </p>
        )}
      </footer>
    </>
  );
};

export default Game;
