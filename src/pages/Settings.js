import React from "react";
import Loading from "../components/Loading";

const Settings = () => {
  const [loading, setLoading] = React.useState(false);
  const [settings, setSettings] = React.useState({
    username: "",
    difficulty: "any",
    questionCount: 10,
    time: 10,
  });
  function handleChange(event) {
    const name = event.target.name;
    const value = Number(event.target.value) || event.target.value;
    setSettings((settings) => ({ ...settings, [name]: value }));
  }
  console.log(settings);
  return (
    <section>
      <form>
        <label htmlFor="username">User</label>
        <input
          type="text"
          name="username"
          value={settings.username}
          onChange={handleChange}
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
