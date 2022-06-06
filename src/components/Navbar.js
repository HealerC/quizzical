import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/game">Game</NavLink>
    </nav>
  );
};

export default Navbar;
