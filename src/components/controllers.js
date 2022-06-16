const { nanoid } = require("nanoid");

/* Used by the /settings and /game to get a new game by
providing the api url parameters. It returns the new game object in the 
way understood by the program  */
const getGame = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    if (result.response_code !== 0) {
      throw new Error("There was an error in response");
    }

    const game = createGame(result.results);
    return game;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/* Rearrange the received game object in a way that is understood
by the program */
const createGame = (apiResult) => {
  const game = apiResult.map((result) => {
    const { category, difficulty, question, correct_answer } = result;

    /* Add all the options together and randomly sort them */
    const options = result.incorrect_answers.concat(correct_answer);
    options.sort((a, b) => 0.5 - Math.random());

    const selected = ""; // The option will be selected during the game
    const id = nanoid(); // Each question has a unique id

    return {
      question,
      correct_answer,
      options,
      category,
      difficulty,
      selected,
      id,
    };
  });

  return game;
};

/* Converts from minutes (which the user will choose) to ms (which is 
  understood by the timer) AND formats ms to mm:ss  */
const TimeConverter = {
  minutesToMillis(minutes) {
    return minutes * 60 * 1000;
  },
  millisToMinuteSecond(millis) {
    const seconds = millis / 1000;

    let minutes = Math.floor(seconds / 60).toString();
    let secondsRemaining = Math.floor(seconds % 60).toString();

    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }
    if (secondsRemaining.length < 2) {
      secondsRemaining = "0" + secondsRemaining;
    }

    return `${minutes}:${secondsRemaining}`;
  },
};

module.exports = { getGame, TimeConverter };
