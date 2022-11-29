import React from "react";
import CardPokemon from "./CardPokemon";

import "./css/ContainerPokemons.css";

const ContainerPokemons = ({ urlPokemons }) => {
  const [pokemons, setPokemons] = React.useState(null);

  React.useEffect(() => {
    const buscarPokemons = async () => {
      const dadosPokemons = await Promise.all(
        urlPokemons.map(async ({ url }) => {
          const req = await fetch(url);
          const json = await req.json();
          return json;
        })
      );
      setPokemons(dadosPokemons);
    };
    buscarPokemons();
  }, []);

  return (
    <main className="container-pokemons">
      {pokemons &&
        pokemons.map((dados) => <CardPokemon key={dados.id} dados={dados} />)}
    </main>
  );
};

export default ContainerPokemons;
