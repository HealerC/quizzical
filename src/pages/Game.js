import React from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";
import { getGame, TimeConverter } from "../components/controllers";
import Timer from "tiny-timer";

const Game = ({ game }) => {
  const [status, setStatus] = React.useState(-1);
  const [score, setScore] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);
  const [time, setTime] = React.useState("0:00");

  const timer = new Timer();
  timer.on("tick", (ms) => {
    setTime(TimeConverter.millisToMinuteSecond(ms));
  });
  timer.on("done", () => {
    handleSubmit();
  });

  React.useEffect(() => {
    setQuiz(game.game);
    //setTime(game.time);
    setStatus(0);
  }, [game]);

  React.useEffect(() => {
    if (status === 0) {
      // New game starts
      timer.start(TimeConverter.minutesToMillis(game.time));
    } else if (status === 1) {
      // Game over
      timer.pause();
    } else {
      // (status === 0.5) Continue game
      timer.resume();
    }
  }, [status]);

  const handleChange = (event, id) => {
    if (status === 1) {
      // game is over but user still selected option
      setStatus(0.5); // A continue game mode
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
    event && event.preventDefault();
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
        <p>{time}</p>
      </footer>
    </>
  );
};

export default Game;
