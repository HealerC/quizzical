import { TimeConverter } from "./controllers";

const DEFAULT_STATE = {
  /* Data for an instant game (could be saved in local storage
    for later continuation) */
  gameDetails: {
    username: "",
    url: "", // The url used to generate the game
    time: 0, // Time in minutes the game will last
    game: {
      status: -1,
      score: 0,
      quiz: [],
      time: 0, // Time in msecs. Will continously be saved/referenced
    },
  },

  /* Settings used to generate the game. Could be saved in localStorage
  so previous set up could be applied automatically */
  settings: {
    lastSetup: {
      username: "",
      difficulty: "any",
      questionCount: 10,
      time: 10,
      category: "0",
    },
    /* Categories user can choose from. Save it in local storage so
    it only needs to be saved once without continuously calling api */
    categories: [],
  },

  /* The users that have played the game and their sorted score.
  Present implementation is local so leaderboard is just for the 
  person's phone/computer (sad - :( ) */
  leaderboard: [],

  /* Continously save the game in localStorage to return to it (in case
    of a closed browser, a refresh etc.) */
  hasStorage: true,
};

const actionList = {
  SAVE_PREV_SETTINGS: "SAVE_PREV_SETTINGS",
  SET_CATEGORIES: "SET_CATEGORIES", // Save categories gotten from api
  LOAD_PREV_GAME: "LOAD_PREV_GAME",
  NO_STORAGE: "NO_STORAGE", // Not possible to save data in storage
  SAVE_GAME_DATA: "SAVE_GAME_DATA",
  CONTINUE_EXISTING_GAME: "CONTINUE_EXISTING_GAME",
  GAME_PLAYED: "GAME_PLAYED", // A user answered a question
  SUBMIT_GAME: "SUBMIT_GAME", // Game over
  START_NEW_GAME: "START_NEW_GAME",
  CLEAR_LEADERBOARD: "CLEAR_LEADERBOARD",
};

function quizzicalReducer(state, action) {
  let newState;

  switch (action.type) {
    case actionList.LOAD_PREV_GAME:
      newState = action.payload;
      break;

    case actionList.NO_STORAGE:
      newState = { ...state, hasStorage: false };
      break;

    case actionList.SET_CATEGORIES:
      newState = {
        ...state,
        settings: { ...state.settings, categories: action.payload },
      };
      break;

    case actionList.SAVE_PREV_SETTINGS:
      newState = {
        ...state,
        settings: { ...state.settings, lastSetup: action.payload },
      };
      break;
    // Save a game a start is (status: 0)
    case actionList.SAVE_GAME_DATA:
      const { username, url, time, game } = action.payload;
      newState = {
        ...state,
        gameDetails: {
          username,
          url,
          time,
          game: {
            ...state.gameDetails.game,
            quiz: game,
            /* Convert the time to milliseconds to be used by
            the game and start the game (status: 0) */
            time: TimeConverter.minutesToMillis(time),
            status: 0,
          },
        },
      };
      break;
    // (Status: 0.5) is continue game
    case actionList.CONTINUE_EXISTING_GAME:
      newState = {
        ...state,
        gameDetails: {
          ...state.gameDetails,
          game: { ...state.gameDetails.game, status: 0.5 },
        },
      };
      break;
    // A user choosed/answered a question
    // Also save the time remaining so user can get back to it in case
    // something (e.g. a browser refresh) happens
    case actionList.GAME_PLAYED:
      const { event, id, timeRemaining } = action.payload;
      const value = event.target.value;
      const newQuiz = state.gameDetails.game.quiz.map((question) => {
        if (question.id === id) return { ...question, selected: value };
        return question;
      });

      newState = {
        ...state,
        gameDetails: {
          ...state.gameDetails,
          game: {
            ...state.gameDetails.game,
            quiz: newQuiz,
            time: timeRemaining,
          },
        },
      };
      break;
    // End the game (Status: 1, continuable if there's time) and score it
    case actionList.SUBMIT_GAME:
      const userScore = state.gameDetails.game.quiz.reduce(
        (cumulativeSum, question) => {
          if (question.selected === question.correct_answer) {
            let num = cumulativeSum + 1;
            return num;
          }
          return cumulativeSum;
        },
        0
      );

      const percentage = Math.round(
        (100 * userScore) / state.gameDetails.game.quiz.length
      );
      const userScoreString = `${userScore}/${state.gameDetails.game.quiz.length} (${percentage}%)`;

      // Update the leaderboards sorted highest - lowest percentage
      const newLeaderboard = [
        ...state.leaderboard,
        {
          name: state.gameDetails.username,
          score: userScore,
          percentage: percentage,
          string: userScoreString,
        },
      ].sort((a, b) => b.percentage - a.percentage);

      newState = {
        ...state,
        gameDetails: {
          ...state.gameDetails,
          game: {
            ...state.gameDetails.game,
            score: userScore,
            status: 1,
            time: action.payload.timeRemaining,
          },
        },
        leaderboard: newLeaderboard,
      };
      break;

    case actionList.START_NEW_GAME:
      const newGame = action.payload;
      newState = {
        ...state,
        gameDetails: {
          ...state.gameDetails,
          game: {
            quiz: newGame,
            status: 0,
            score: 0,
            time: TimeConverter.minutesToMillis(state.gameDetails.time),
          },
        },
      };
      break;

    case actionList.CLEAR_LEADERBOARD:
      newState = {
        ...state,
        leaderboard: [],
      };
      break;

    default:
      throw new Error(`${action.type} is not specified`);
  }

  // Keep saving the state in local storage as far as it exists
  // (Checked when the <App /> just loaded)
  if (newState.hasStorage)
    window.localStorage.setItem("quizzical", JSON.stringify(newState));

  return newState;
}

export { DEFAULT_STATE, quizzicalReducer };
