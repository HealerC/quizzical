import React from "react";
import { nanoid } from "nanoid";

const Question = ({ trivia, handleChange, status }) => {
  const showCorrectAnswer = (option) => {
    if (option === trivia.correct_answer) {
      return <span className="mark correct"></span>;
    } else if (option === trivia.selected) {
      return <span className="mark incorrect"></span>;
    }
  };
  return (
    <article className="question">
      <h2 dangerouslySetInnerHTML={{ __html: trivia.question }}></h2>
      <div className="options-group">
        {trivia.options.map((option) => {
          return (
            <label key={nanoid()} className="container">
              <span dangerouslySetInnerHTML={{ __html: option }}></span>
              <input
                type="radio"
                name={trivia.question}
                value={option}
                onChange={(event) => handleChange(event, trivia.id)}
                checked={option === trivia.selected}
              />

              {status === 1 ? (
                showCorrectAnswer(option)
              ) : (
                <span className="mark"></span>
              )}
            </label>
          );
        })}
      </div>
    </article>
  );
};

export default Question;
