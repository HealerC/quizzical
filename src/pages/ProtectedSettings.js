import React from "react";
import { QuizzicalContext } from "../components/QuizzicalContext";
import { useNavigate } from "react-router-dom";

const ProtectedSettings = ({ children }) => {
  const { state } = React.useContext(QuizzicalContext);
  const [showChildren, setShowChildren] = React.useState(false);
  const navigate = useNavigate();

  const gameDetails = state.gameDetails;

  const handleClick = (event) => {
    const id = event.target.id;
    if (id === "continue") {
      navigate("/game");
    } else {
      setShowChildren(true); // Show settings if user wants to quit previous game
    }
  };

  /* Show settings only if a game isn't ongoing */
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
