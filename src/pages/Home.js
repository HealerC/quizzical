import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizzicalContext } from "../components/QuizzicalContext";

const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch } = React.useContext(QuizzicalContext);

  return (
    <>
      <section className="home">
        <div>
          <h1>Quizzical</h1>
          <p>Trivial questions for you :-)</p>
          <button onClick={() => navigate("/settings")}>Begin</button>
        </div>
      </section>
      <aside className="leaderboard">
        <table>
          <tbody>
            {state.leaderboard.map((user) => (
              <tr>
                <td className="name">{user.name}</td>
                <td className="score">{user.string}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <i onClick={() => dispatch({ type: "CLEAR_LEADERBOARD" })}>D</i>
      </aside>
    </>
  );
};

export default Home;
