//import { nanoid } from "nanoid";
const { nanoid } = require("nanoid");
const API_BASE_URL = "https://opentdb.com/api.php";

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

const createGame = (apiResult) => {
  const game = apiResult.map((result) => {
    const { category, difficulty, question, correct_answer } = result;
    const options = result.incorrect_answers.concat(correct_answer);
    options.sort((a, b) => 0.5 - Math.random());
    const selected = "";
    const id = nanoid();
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
