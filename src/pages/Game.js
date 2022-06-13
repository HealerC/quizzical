import React from "react";
import { nanoid } from "nanoid";
import { QuizzicalContext } from "../components/QuizzicalContext";
import Question from "../components/Question";
import { getGame, TimeConverter } from "../components/controllers";
import Timer from "tiny-timer";
const timer = new Timer();

const Game = ({ game }) => {
  const [status, setStatus] = React.useState(-1);
  const [score, setScore] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);
  const [time, setTime] = React.useState(0);
  const { state, dispatch } = React.useContext(QuizzicalContext);

  React.useEffect(() => {
    timer.on("tick", (ms) => {
      setTime(ms);
      // dispatch({ type: "SET_TIME_REMAINING", payload: ms });
    });
    timer.on("done", () => {
      handleSubmit();
    });
    timer.on("statusChanged", (status) => {
      console.log(status);
    });
    console.log("game", state, dispatch);
    return () => {
      timer.stop();
      // if (status > 0 && status < 1) {
      //   // A game is still playing
      //   dispatch({
      //     type: "SAVE_GAME_DATA",
      //     payload: {
      //       username: state.gameDetails.username,
      //       url: state.gameDetails,
      //       time: timer.time,
      //       game: quiz,
      //     },
      //   });
      // } else {
      //   // Status is -1 (no game) or 1 (game over)
      //   dispatch({
      //     type: "SAVE_GAME_DATA",
      //     payload: {
      //       username: "",
      //       url: "", // The url used to generate the game
      //       time: 0,
      //       game: [],
      //     },
      //   });
      // }
    };
  }, []);

  // React.useEffect(() => {
  //   // setQuiz(game.game);
  //   // if (state.gameDetails.game.length <= 0) {
  //   //   return;
  //   // }
  //   // setQuiz(state.gameDetails.game);
  //   if (
  //     state.gameDetails.game.status < 0 &&
  //     state.gameDetails.game.quiz.length > 0
  //   ) {
  //     console.log("Weeeeeeeee");
  //     dispatch({ type: "START_GAME" });
  //   }
  //   // setStatus(0);
  // }, [state.gameDetails]);

  React.useEffect(() => {
    if (state.gameDetails.game.status >= 0)
      timer.start(state.gameDetails.game.time);

    switch (state.gameDetails.game.status) {
      case 0: // New game starts
        console.log("new game");
        timer.stop(); // Stop previous timing operation (if any)
        timer.start(state.gameDetails.game.time);
        // if ([5, 10, 20].indexOf(state.gameDetails.time) < 0)
        //   timer.start(state.gameDetails.time);
        // else timer.start(TimeConverter.minutesToMillis(state.gameDetails.time));
        break;
      case 1: // User has finished the game (but may continue)
        timer.pause();
        break;
      case 0.5: // User continues a game
        timer.resume();
        // if (timer.status === "paused") timer.resume();
        // else timer.start(state.gameDetails.game.time);
        break;
      default:
    }
  }, [state.gameDetails.game.status]);

  const handleChange = (event, id) => {
    if (timer.time <= 0) {
      return;
    }
    if (state.gameDetails.game.status === 1) {
      // game is over but user still selected option
      // setStatus(0.5); // A continue game mode
      dispatch({ type: "CONTINUE_EXISTING_GAME" });
    }
    const timeRemaining = timer.time;
    dispatch({ type: "GAME_PLAYED", payload: { event, id, timeRemaining } });
    // const value = event.target.value;
    // setQuiz(
    //   quiz.map((question) => {
    //     if (question.id === id) return { ...question, selected: value };
    //     return question;
    //   })
    // );
  };

  const handleSubmit = (event) => {
    event && event.preventDefault(); // A timer can submit the game
    const timeRemaining = timer.time;
    dispatch({ type: "SUBMIT_GAME", payload: { timeRemaining } });
    // const userScore = quiz.reduce((cumulativeSum, question) => {
    //   if (question.selected === question.correct_answer) {
    //     let num = cumulativeSum + 1;
    //     return num;
    //   }
    //   return cumulativeSum;
    // }, 0);
    // setScore(userScore);
    // setStatus(1); // Game over
  };
  const handleNewGameClick = async () => {
    const newGame = await getGame(state.gameDetails.url);
    dispatch({ type: "START_NEW_GAME", payload: newGame });
    // setQuiz(newGame);
    // setStatus(0);
    // setScore(0);
  };
  return (
    <>
      <form id="game-form" onSubmit={handleSubmit}>
        {state.gameDetails.game.quiz.map((trivia) => (
          <Question
            key={trivia.id}
            trivia={trivia}
            handleChange={handleChange}
            status={state.gameDetails.game.status}
          />
        ))}
      </form>
      <footer>
        <h3>{state.gameDetails.username}</h3>
        <button type="submit" form="game-form">
          Check answers
        </button>
        {state.gameDetails.game.status === 1 && (
          <section>
            <p className="info">
              You got {state.gameDetails.game.score}/
              {state.gameDetails.game.quiz.length} correctly
            </p>
            <button onClick={handleNewGameClick}>Play again</button>
          </section>
        )}
        <p>{TimeConverter.millisToMinuteSecond(time)}</p>
      </footer>
    </>
  );
};

export default Game;
