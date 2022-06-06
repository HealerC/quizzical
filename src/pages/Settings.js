import React from "react";
import Loading from "../components/Loading";

const Settings = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <section>
      <form>
        <label htmlFor="username">User</label>
        <input type="text" />
        <fieldset name="difficulty">
          <legend>Difficulty</legend>
          <input
            type="radio"
            name="difficulty"
            value="any"
            id="any-difficulty"
          />
          <label htmlFor="any-difficulty">Any</label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            id="easy-difficulty"
          />
          <label htmlFor="easy-difficulty">Easy</label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            id="medium-difficulty"
          />
          <label htmlFor="medium-difficulty">Medium</label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            id="hard-difficulty"
          />
          <label htmlFor="hard-difficulty">Hard</label>
        </fieldset>
        <fieldset name="question-count">
          <legend>No. of questions</legend>
          <input type="radio" name="question-count" value="5" id="5qc" />
          <label htmlFor="5qc">5</label>
          <input type="radio" name="question-count" value="10" id="10qc" />
          <label htmlFor="10qc">10</label>
          <input type="radio" name="question-count" value="20" id="20qc" />
          <label htmlFor="20qc">20</label>
        </fieldset>
        <fieldset name="time">
          <legend>Time (mins)</legend>
          <input type="radio" name="time" value="10" id="10t" />
          <label htmlFor="10t">10</label>
          <input type="radio" name="time" value="20" id="20t" />
          <label htmlFor="20t">20</label>
          <input type="radio" name="time" value="40" id="40t" />
          <label htmlFor="40t">40</label>
        </fieldset>
        <button type="submit">Start Quiz</button>
      </form>
      {loading && <Loading />}
    </section>
  );
};

export default Settings;
