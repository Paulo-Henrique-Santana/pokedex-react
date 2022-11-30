import React from "react";

import "./css/CardPokemon.css";

const CardPokemon = ({ dados: { name, types }, urlImg }) => {
  return (
    <div className="container-pokemon">
      <h1>{name}</h1>

      <div className="box-image">
        <img src={urlImg} alt={name} />
      </div>

      <div className="box-type">
        {types.map(({ type }) => (
          <p className={`tipo ${type.name}`} key={type.name}>
            {type.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CardPokemon;
