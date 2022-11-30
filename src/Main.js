import React from "react";
import CardPokemon from "./CardPokemon";
import "./css/Main.css";

const Main = () => {
  const [limit, setLimit] = React.useState(20);
  const [pokemons, setPokemons] = React.useState(null);
  const [msgLoading, setMsgLoading] = React.useState(null);

  const fetchApi = async (url) => {
    const req = await fetch(url);
    const json = await req.json();
    return json.results;
  };

  // faz uma requisição na api passando o limite de pokemons para buscar
  // atualiza sempre que o valor de limit for alterado
  React.useEffect(() => {
    const buscarPokemons = async () => {
      setMsgLoading("Loading...");

      const urlPokemons = await fetchApi(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`
      );

      const dadosPokemons = await Promise.all(
        urlPokemons.map(async ({ url }) => {
          const req = await fetch(url);
          const json = await req.json();
          console.log(json);
          return json;
        })
      );

      setPokemons(dadosPokemons);
      setMsgLoading(null);
    };
    buscarPokemons();
  }, [limit]);

  // aumenta o valor de limit para buscar mais pokemons
  const viewMore = () => {
    setLimit((limit) => limit + 20);
  };

  const createPokemonCard = () => {
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
  };

  return (
    <main>
      {pokemons && (
        <section className="container-pokemons">{createPokemonCard()}</section>
      )}

      {msgLoading ? (
        <p className="msg-loading">{msgLoading}</p>
      ) : (
        <button className="btn-view-more" onClick={viewMore}>
          View more
        </button>
      )}
    </main>
  );
};

export default Main;
