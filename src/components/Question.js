import React from "react";
import { nanoid } from "nanoid";

const Question = ({ trivia }) => {
  const { question, options } = trivia;
  return (
    <article>
      <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
      {options.map((option) => {
        return (
          <span key={nanoid()}>
            <input type="radio" name={question} value={option} />
            <label
              htmlFor={option}
              dangerouslySetInnerHTML={{ __html: option }}
            ></label>
          </span>
        );
      })}
    </article>
  );
};

export default Question;
