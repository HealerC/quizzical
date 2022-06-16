import React from "react";
import Timer from "tiny-timer";

import { QuizzicalContext } from "../components/QuizzicalContext";
import Question from "../components/Question";
import { getGame, TimeConverter } from "../components/controllers";

const timer = new Timer();

const Game = () => {
  const [time, setTime] = React.useState(0); // Time remaining in ms
  const { state, dispatch } = React.useContext(QuizzicalContext);

  React.useEffect(() => {
    /* Initialize the event listeners on the tick-timer  */
    timer.on("tick", (ms) => {
      setTime(ms);
    });
    timer.on("done", () => {
      handleSubmit();
    });
    timer.on("statusChanged", (status) => {
      console.log(status);
    });

    return () => {
      timer.stop(); // Stop the timer when component unmounts
    };
  }, []);

  React.useEffect(() => {
    /* Always start a timer with the current time when
    status changes. To be possibly changed later though */
    if (state.gameDetails.game.status >= 0)
      timer.start(state.gameDetails.game.time);

    switch (state.gameDetails.game.status) {
      case 0: // New game starts
        console.log("new game");
        timer.stop(); // Stop previous timing operation (if any)
        timer.start(state.gameDetails.game.time);
        break;
      case 1: // User has finished the game (but may continue)
        timer.pause();
        break;
      case 0.5: // User continues a game
        timer.resume();
        break;
      default:
    }
  }, [state.gameDetails.game.status]);

  const handleChange = (event, id) => {
    if (timer.time <= 0) {
      // Prevent continuing the game when time is up
      return;
    }
    if (state.gameDetails.game.status === 1) {
      // User wants to continue a previous game but there is still time
      dispatch({ type: "CONTINUE_EXISTING_GAME" });
    }

    // Save the time remaining so in case components closes for any reason
    // we have a time we can start from
    const timeRemaining = timer.time;
    dispatch({ type: "GAME_PLAYED", payload: { event, id, timeRemaining } });
  };

  const handleSubmit = (event) => {
    // A timer can submit the game and may not pass an event object
    event && event.preventDefault();

    const timeRemaining = timer.time;
    dispatch({ type: "SUBMIT_GAME", payload: { timeRemaining } });
  };

  const handleNewGameClick = async () => {
    const newGame = await getGame(state.gameDetails.url);
    dispatch({ type: "START_NEW_GAME", payload: newGame });
  };

  return (
    <section className="game">
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

        {/* End game by checking the answers */}
        {state.gameDetails.game.status !== 1 && (
          <button type="submit" form="game-form">
            Check answers
          </button>
        )}

        {/* Game is over. Show the user the score. Start another
        game with same settings/url used for the previous */}
        {state.gameDetails.game.status === 1 && (
          <section className="info">
            <p>
              You got {state.gameDetails.game.score}/
              {state.gameDetails.game.quiz.length} correctly
            </p>
            <button onClick={handleNewGameClick}>Play again</button>
          </section>
        )}

        {/* The time remaining for the user to play the game */}
        <p className="remaining-time">
          {TimeConverter.millisToMinuteSecond(time)}
        </p>
      </footer>
    </section>
  );
};

export default Game;
