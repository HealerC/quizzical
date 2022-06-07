import React from "react";
import { nanoid } from "nanoid";

const Question = ({ trivia, handleChange, status }) => {
  /*const [trivia, setTrivia] = React.useState({
    question: "",
    correct_answer: "",
    options: [],
    selected: "",
    category: "",
    difficulty: "",
  });

  React.useEffect(() => {
    setTrivia(quizQuestion);
  }, [quizQuestion]); */

  /**const handleChange = (event) => {
    const value = event.target.value;
    setTrivia((trivia) => ({ ...trivia, selected: value }));
  };**/
  //console.log(trivia);
  /* if (status === 1) {
    if (trivia.selected === trivia.correct_answer) {
      incrementScore((score) => score + 1);
    }
  }*/
  const showCorrectAnswer = () => {
    if (trivia.selected === trivia.correct_answer) {
      return (
        <div style={{ color: "green" }}>
          Correct answer chosen {trivia.selected}
        </div>
      );
    } else {
      return (
        <div style={{ color: "red" }}>
          Wrong answer chosen {trivia.selected}
          <span style={{ color: "green" }}>
            Correct answer {trivia.correct_answer}
          </span>
        </div>
      );
    }
  };
  return (
    <article>
      <h2 dangerouslySetInnerHTML={{ __html: trivia.question }}></h2>
      {trivia.options.map((option) => {
        let radioId = option + trivia.id;
        return (
          <span key={nanoid()}>
            <input
              type="radio"
              name={trivia.question}
              value={option}
              id={radioId}
              onChange={(event) => handleChange(event, trivia.id)}
              checked={option === trivia.selected}
            />
            <label
              htmlFor={radioId}
              dangerouslySetInnerHTML={{ __html: option }}
            ></label>
          </span>
        );
      })}
      {status === 1 && showCorrectAnswer()}
    </article>
  );
};

export default Question;
