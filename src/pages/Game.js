import React from "react";
import { nanoid } from "nanoid";
import Question from "../components/Question";
import { getGame, TimeConverter } from "../components/controllers";
import Timer from "tiny-timer";
const timer = new Timer();

const Game = ({ game }) => {
  const [status, setStatus] = React.useState(-1);
  const [score, setScore] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);
  const [time, setTime] = React.useState("0:00");

  React.useEffect(() => {
    timer.on("tick", (ms) => {
      setTime(TimeConverter.millisToMinuteSecond(ms));
    });
    timer.on("done", () => {
      handleSubmit();
    });
    timer.on("statusChanged", (status) => {
      console.log(status);
    });
    return () => {
      timer.stop();
    };
  }, []);

  React.useEffect(() => {
    setQuiz(game.game);
    setStatus(0);
  }, [game]);

  React.useEffect(() => {
    switch (status) {
      case 0: // New game starts
        console.log("new game");
        timer.stop(); // Stop previous timing operation (if any)
        timer.start(TimeConverter.minutesToMillis(game.time));
        break;
      case 1: // Use has finished the game (but may continue)
        timer.pause();
        break;
      case 0.5: // User continued a game
        timer.resume();
        break;
      default:
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
    event && event.preventDefault(); // A timer can submit the game
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
