import React from "react";

const Settings = () => {
  return (
    <form>
      <label for="username">User</label>
      <input type="text" />
      <fieldset name="difficulty">
        <legend>Difficulty</legend>
        <input type="radio" name="difficulty" value="any" id="any-difficulty" />
        <label for="any-difficulty">Any</label>
        <input
          type="radio"
          name="difficulty"
          value="easy"
          id="easy-difficulty"
        />
        <label for="easy-difficulty">Easy</label>
        <input
          type="radio"
          name="difficulty"
          value="medium"
          id="medium-difficulty"
        />
        <label for="medium-difficulty">Medium</label>
        <input
          type="radio"
          name="difficulty"
          value="hard"
          id="hard-difficulty"
        />
        <label for="hard-difficulty">Hard</label>
      </fieldset>
      <fieldset name="question-count">
        <legend>No. of questions</legend>
        <input type="radio" name="question-count" value="5" id="5qc" />
        <label for="5qc">5</label>
        <input type="radio" name="question-count" value="10" id="10qc" />
        <label for="10qc">10</label>
        <input type="radio" name="question-count" value="20" id="20qc" />
        <label for="20qc">20</label>
      </fieldset>
      <fieldset name="time">
        <legend>Time (mins)</legend>
        <input type="radio" name="time" value="10" id="10t" />
        <label for="10t">10</label>
        <input type="radio" name="time" value="20" id="20t" />
        <label for="20t">20</label>
        <input type="radio" name="time" value="40" id="40t" />
        <label for="40t">40</label>
      </fieldset>
      <button type="submit">Start Quiz</button>
    </form>
  );
};

export default Settings;
