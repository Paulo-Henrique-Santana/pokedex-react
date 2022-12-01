import React from "react";
import "./css/Header.css";
import imgPokedex from "./img/pokedex.webp";

const Header = () => {
  return (
    <header>
      <h1>Pokédex</h1>
      <img className="pokedex" src={imgPokedex} alt="" />
    </header>
  );
};

export default Header;
