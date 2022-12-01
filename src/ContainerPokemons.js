import React from "react";
import CardPokemon from "./CardPokemon";
import "./css/ContainerPokemons.css";

const ContainerPokemons = ({ pokemons }) => {
  const createPokemonCard = () => {
    if (Array.isArray(pokemons)) {
      const pokemonCards = pokemons.map((dados) => {
        // verifica se existe a imagem do pokemon antes de criar o card
        const urlImg =
          dados.sprites.versions["generation-v"]["black-white"].animated[
            "front_default"
          ];

        if (urlImg)
          return <CardPokemon key={dados.id} dados={dados} urlImg={urlImg} />;
      });
      return pokemonCards;
    } else {
      const urlImg =
        pokemons.sprites.versions["generation-v"]["black-white"].animated[
          "front_default"
        ];
      return <CardPokemon key={pokemons.id} dados={pokemons} urlImg={urlImg} />;
    }
  };

  return (
    <section className="container-pokemons">{createPokemonCard()}</section>
  );
};

export default ContainerPokemons;
