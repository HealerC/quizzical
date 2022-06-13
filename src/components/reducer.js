import { TimeConverter, getGame } from "./controllers";

const DEFAULT_STATE = {
  gameDetails: {
    username: "",
    url: "", // The url used to generate the game
    time: 0, // Time in minutes the game will last
    game: {
      status: -1,
      score: 0,
      quiz: [],
      time: 0, // Time in msecs
    },
  },
  settings: {
    lastSetup: {
      username: "",
      difficulty: "any",
      questionCount: 10,
      time: 10,
      category: "0",
    },
    categories: [],
  },
  leaderboard: [], // format -> { Deba: "4/10 (40%)" }
  hasStorage: true,
};

const actionList = {
  SAVE_PREV_SETTINGS: "SAVE_PREV_SETTINGS",
  SET_CATEGORIES: "SET_CATEGORIES",
  LOAD_PREV_GAME: "LOAD_PREV_GAME",
  NO_STORAGE: "NO_STORAGE",
  SAVE_GAME_DATA: "SAVE_GAME_DATA",
  // START_GAME: "START_GAME",
  SET_TIME_REMAINING: "SET_TIME_REMAINING",
  CONTINUE_EXISTING_GAME: "CONTINUE_EXISTING_GAME",
  GAME_PLAYED: "GAME_PLAYED",
  SUBMIT_GAME: "SUBMIT_GAME",
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
            time: TimeConverter.minutesToMillis(time),
            status: 0,
          },
        },
      };
      break;
    // case actionList.START_GAME:
    //   newState = {
    //     ...state,
    //     gameDetails: {
    //       ...state.gameDetails,
    //       game: { ...state.gameDetails.game, status: 0 },
    //     },
    //   };
    //   break;
    case actionList.SET_TIME_REMAINING:
      newState = {
        ...state,
        gameDetails: {
          ...state.gameDetails,
          game: { ...state.gameDetails.game, time: action.payload },
        },
      };
      break;
    case actionList.CONTINUE_EXISTING_GAME:
      newState = {
        ...state,
        gameDetails: {
          ...state.gameDetails,
          game: { ...state.gameDetails.game, status: 0.5 },
        },
      };
      break;
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
  if (newState.hasStorage)
    window.localStorage.setItem("quizzical", JSON.stringify(newState));
  return newState;
}

export { DEFAULT_STATE, quizzicalReducer };
