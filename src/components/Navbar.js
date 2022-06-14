import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>Home</NavLink>
      <NavLink to="/settings" className={({ isActive }) => (isActive ? "link active" : "link")}>Settings</NavLink>
      <NavLink to="/game" className={({ isActive }) => (isActive ? "link active" : "link")}>Game</NavLink>
    </nav>
  );
};

export default Navbar;
