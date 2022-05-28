import React from "react";

const StartGameSettings = () => {
  return (
    <form>
      <label for="username">User:</label>
      <input type="text" />
      <div>
        <label>Difficulty:</label>
        <button>Easy</button>
        <button>Medium</button>
        <button>Hard</button>
      </div>
      <div>
        <label>No. of questions</label>
        <button>5</button>
        <button>10</button>
        <button>20</button>
      </div>
      <div>
        <label>Time (mins)</label>
        <button>10</button>
        <button>20</button>
        <button>40</button>
      </div>
      <button type="submit">Start Quiz</button>
    </form>
  );
};

export default StartGameSettings;
