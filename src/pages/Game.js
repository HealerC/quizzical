import React from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";
import { getGame } from "../components/controllers";

const Game = ({ game }) => {
  const [status, setStatus] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);

  React.useEffect(() => {
    setQuiz(game.game);
  }, [game]);

  const handleChange = (event, id) => {
    if (status === 1) {
      // game is over but user still selected option
      setStatus(0); // Get back to game mode
    }
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
  const handleNewGameClick = async () => {
    const newGame = await getGame(game.url);
    setQuiz(newGame);
    setStatus(0);
    setScore(0);
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
        <h3>{game.username}</h3>
        <button type="submit" form="game-form">
          Check answers
        </button>
        {status === 1 && (
          <section>
            <p className="info">
              You got {score}/{game.game.length} correctly
            </p>
            <button onClick={handleNewGameClick}>Play again</button>
          </section>
        )}
      </footer>
    </>
  );
};

export default Game;
