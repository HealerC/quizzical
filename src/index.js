import ReactDOM from "react-dom";
import App from "./App";
import { QuizzicalProvider } from "./components/QuizzicalContext";

ReactDOM.render(
  <QuizzicalProvider>
    <App />
  </QuizzicalProvider>,
  document.getElementById("root")
);
