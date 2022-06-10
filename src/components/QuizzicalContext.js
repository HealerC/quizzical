import React from "react";
import { DEFAULT_STATE, quizzicalReducer } from "./reducer";

const QuizzicalContext = React.createContext();

const QuizzicalProvider = (props) => {
  const [state, dispatch] = React.useReducer(quizzicalReducer, DEFAULT_STATE);

  return (
    <QuizzicalContext.Provider value={{ state, dispatch}}>
      {props.children}
    </QuizzicalContext.Provider>
  );
};

export { QuizzicalContext, QuizzicalProvider };
