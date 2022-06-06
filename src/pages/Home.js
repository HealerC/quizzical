import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section>
        <h1>Quizzical</h1>
        <p>Trivial questions for you :-)</p>
        <button onClick={() => navigate("/settings")}>Begin</button>
      </section>
      <aside>
        <table>
          <tr>
            <td>Wini</td>
            <td>80</td>
          </tr>
          <tr>
            <td>Deba</td>
            <td>80</td>
          </tr>
          <tr>
            <td>Nosasu</td>
            <td>80</td>
          </tr>
          <tr>
            <td>Chairman</td>
            <td>80</td>
          </tr>
        </table>
        <i>D</i>
      </aside>
    </>
  );
};

export default Home;
