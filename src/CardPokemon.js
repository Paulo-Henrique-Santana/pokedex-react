import React from "react";

import "./css/CardPokemon.css";

const CardPokemon = ({ dados: { name, sprites, types } }) => {
  const urlImg =
    sprites.versions["generation-v"]["black-white"].animated["front_default"];
  return (
    <div className="container-pokemon">
      <h1>{name}</h1>
      <div className="box-imagem">
        <img src={urlImg} alt={name} />
      </div>
      {types.map(({ type }) => (
        <p key={type.name}>{type.name}</p>
      ))}
    </div>
  );
};

export default CardPokemon;
