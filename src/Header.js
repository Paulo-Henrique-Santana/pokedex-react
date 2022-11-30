import React from "react";
import "./css/Header.css";
import imgPokeball from "./img/pokeball.webp";

const Header = () => {
  return (
    <header>
      <h1>Pokédex</h1>
      <img className="pokeball" src={imgPokeball} alt="" />
    </header>
  );
};

export default Header;
