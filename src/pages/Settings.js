import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getGame } from "../components/controllers";
import { nanoid } from "nanoid";
import { QuizzicalContext } from "../components/QuizzicalContext";
const API_BASE_URL = "https://opentdb.com/api.php";
const API_CATEGORIES = "https://opentdb.com/api_category.php";

const Settings = ({ setGame }) => {
  const [loading, setLoading] = React.useState(false);
  const [settings, setSettings] = React.useState({
    username: "",
    difficulty: "any",
    questionCount: 10,
    time: 10,
    category: "0",
  });
  const [categories, setCategories] = React.useState(null);
  const { state, dispatch } = React.useContext(QuizzicalContext);

  const navigate = useNavigate();
  // Get the categories of the quiz
  React.useEffect(() => {
    getCategories();
    getLastSetup();
  }, [state.settings]);

  const getLastSetup = () => {
    if (state.settings.lastSetup) {
      const lastSetup = state.settings.lastSetup;
      setSettings(lastSetup);
    }
  };
  const getCategories = async () => {
    setLoading(true);
    const storedCategories = state.settings.categories;
    console.log(storedCategories);
    if (storedCategories.length > 0) {
      setCategories(storedCategories);
      setLoading(false);
      console.log("no need to go far");
      return;
    }
    try {
      const response = await fetch(API_CATEGORIES);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (!result.trivia_categories) {
        throw new Error("There is an error with received result");
      }
      console.log("we needed to go far");
      dispatch({ type: "SET_CATEGORIES", payload: result.trivia_categories });
      setCategories(result.trivia_categories);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  function handleChange(event) {
    const name = event.target.name;
    const value = Number(event.target.value) || event.target.value;
    setSettings((settings) => ({ ...settings, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (!settings.username) {
      return;
    }
    setLoading(true);
    const url =
      `${API_BASE_URL}?amount=${settings.questionCount}` +
      (settings.difficulty !== `any`
        ? `&difficulty=${settings.difficulty}`
        : ``) +
      (settings.category !== Number(0) && `&category=${settings.category}`);

    const game = await getGame(url);
    if (game) {
      dispatch({
        type: "SAVE_GAME_DATA",
        payload: {
          username: settings.username,
          url,
          time: settings.time,
          game,
        },
      });
      // setGame({ username: settings.username, game, url, time: settings.time });
      setLoading(false);
      dispatch({ type: "SAVE_PREV_SETTINGS", payload: settings });
      navigate("/game");
    }
  }
  // console.log(settings);
  console.log("settings", state, dispatch);
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User</label>
        <input
          type="text"
          name="username"
          value={settings.username}
          onChange={handleChange}
          required
        />
        <fieldset name="difficulty">
          <legend>Difficulty</legend>
          <input
            type="radio"
            name="difficulty"
            value="any"
            id="any-difficulty"
            onChange={handleChange}
            checked={settings.difficulty === "any"}
          />
          <label htmlFor="any-difficulty">Any</label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            id="easy-difficulty"
            onChange={handleChange}
            checked={settings.difficulty === "easy"}
          />
          <label htmlFor="easy-difficulty">Easy</label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            id="medium-difficulty"
            onChange={handleChange}
            checked={settings.difficulty === "medium"}
          />
          <label htmlFor="medium-difficulty">Medium</label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            id="hard-difficulty"
            onChange={handleChange}
            checked={settings.difficulty === "hard"}
          />
          <label htmlFor="hard-difficulty">Hard</label>
        </fieldset>
        <fieldset name="question-count">
          <legend>No. of questions</legend>
          <input
            type="radio"
            name="questionCount"
            value="5"
            id="5qc"
            onChange={handleChange}
            checked={settings.questionCount === 5}
          />
          <label htmlFor="5qc">5</label>
          <input
            type="radio"
            name="questionCount"
            value="10"
            id="10qc"
            onChange={handleChange}
            checked={settings.questionCount === 10}
          />
          <label htmlFor="10qc">10</label>
          <input
            type="radio"
            name="questionCount"
            value="20"
            id="20qc"
            onChange={handleChange}
            checked={settings.questionCount === 20}
          />
          <label htmlFor="20qc">20</label>
        </fieldset>
        {categories ? (
          <>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={settings.category}
              id="category"
              onChange={handleChange}
            >
              <option value="0">Any</option>
              {categories.map((category) => (
                <option key={nanoid()} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={settings.category}
              id="category"
              onChange={handleChange}
            >
              <option value="0">Any</option>
            </select>
          </>
        )}

        <fieldset name="time">
          <legend>Time (mins)</legend>
          <input
            type="radio"
            name="time"
            value="10"
            id="10t"
            onChange={handleChange}
            checked={settings.time === 10}
          />
          <label htmlFor="10t">10</label>
          <input
            type="radio"
            name="time"
            value="20"
            id="20t"
            onChange={handleChange}
            checked={settings.time === 20}
          />
          <label htmlFor="20t">20</label>
          <input
            type="radio"
            name="time"
            value="40"
            id="40t"
            onChange={handleChange}
            checked={settings.time === 40}
          />
          <label htmlFor="40t">40</label>
        </fieldset>
        <button type="submit">Start Quiz</button>
      </form>
      {loading && <Loading />}
    </section>
  );
};

export default Settings;
