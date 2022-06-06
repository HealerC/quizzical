import React from "react";
import { nanoid } from "nanoid";

const Question = ({ trivia: quizQuestion }) => {
  const [trivia, setTrivia] = React.useState({
    question: "",
    correct_answer: "",
    options: [],
    selected: "",
    category: "",
    difficulty: "",
  });

  React.useEffect(() => {
    setTrivia(quizQuestion);
    console.log(quizQuestion);
  }, [quizQuestion]);

  const handleChange = (event) => {
    const value = event.target.value;
    setTrivia((trivia) => ({ ...trivia, selected: value }));
  };
  console.log(trivia);
  return (
    <article>
      <h2 dangerouslySetInnerHTML={{ __html: trivia.question }}></h2>
      {trivia.options.map((option) => {
        return (
          <span key={nanoid()}>
            <input
              type="radio"
              name={trivia.question}
              value={option}
              id={option}
              onChange={handleChange}
              checked={option === trivia.selected}
            />
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
