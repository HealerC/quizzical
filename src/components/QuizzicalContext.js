import React from "react";
import { DEFAULT_STATE, quizzicalReducer } from "./reducer";

const QuizzicalContext = React.createContext();

/* The provider provided here wraps the entire <App /> component providing
state and dispatch to the entire pages component. */
const QuizzicalProvider = (props) => {
  const [state, dispatch] = React.useReducer(quizzicalReducer, DEFAULT_STATE);

  return (
    <QuizzicalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </QuizzicalContext.Provider>
  );
};

export { QuizzicalContext, QuizzicalProvider };
