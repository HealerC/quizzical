const DEFAULT_STATE = {
  gameDetails: {
    username: "",
    url: "", // The url used to generate the game
    time: 0, // Time in minutes the game will last
    game: {
      status: -1,
      score: 0,
      questions: [],
      time: "00:00", // Instant time of the game
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
  EDIT_SETTINGS: "EDIT_SETTINGS",
  SET_CATEGORIES: "SET_CATEGORIES",
  LOAD_PREV_GAME: "LOAD_PREV_GAME",
  NO_STORAGE: "NO_STORAGE",
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

    default:
      throw new Error(`${action.type} is not specified`);
  }
  if (newState.hasStorage)
    window.localStorage.setItem("quizzical", JSON.stringify(newState));
  return newState;
}

module.exports = { DEFAULT_STATE, quizzicalReducer };
