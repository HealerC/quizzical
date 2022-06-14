import React from "react";
import { QuizzicalContext } from "../components/QuizzicalContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedSettings = ({ children }) => {
  const { state, dispatch } = React.useContext(QuizzicalContext);
  const [showChildren, setShowChildren] = React.useState(false);
  const gameDetails = state.gameDetails;
  const navigate = useNavigate();

  const handleClick = (event) => {
    const id = event.target.id;
    if (id === "continue") {
      //   return <Navigate to="/game" />;
      navigate("/game");
    } else {
      setShowChildren(true);
    }
  };
  if ([0, 0.5].indexOf(gameDetails.game.status) >= 0) {
    return (
      <Info
        username={gameDetails.username}
        handleClick={handleClick}
        showChildren={showChildren}
        children={children}
      />
    );
  }
  return children;
};

const Info = ({ username, handleClick, showChildren, children }) => {
  if (showChildren) {
    return children;
  }
  return (
    <section className="protected-settings">
      <h2>
        <span className="name">{username}</span> - A game is ongoing
      </h2>
      <button id="continue" onClick={handleClick}>
        Continue
      </button>
      <button id="abandon" onClick={handleClick}>
        Abandon progress and start afresh...
      </button>
    </section>
  );
};

export default ProtectedSettings;
