import React from "react";
import logo from "./img/logo-pokemon.png";
import "./css/Header.css";

const Header = () => {
  return (
    <header>
      <img className="logo" src={logo} alt="logo-pokemon" />
    </header>
  );
};

export default Header;
