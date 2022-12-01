import React from "react";
import ContainerPokemons from "./ContainerPokemons";
import "./css/Main.css";

const Main = () => {
  const [limit, setLimit] = React.useState(20);
  const [pokemons, setPokemons] = React.useState(null);
  const [msgLoading, setMsgLoading] = React.useState(null);
  const [input, setInput] = React.useState("");
  const inputElement = React.useRef();

  const fetchApi = async (url) => {
    setMsgLoading("Loading...");
    const req = await fetch(url);
    const json = await req.json();
    return json;
  };

  // faz uma requisição na api passando o limite de pokemons para buscar
  // atualiza sempre que o valor de limit for alterado
  React.useEffect(() => {
    const searchPokemons = async () => {
      const { results } = await fetchApi(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`
      );

      const dadosPokemons = await Promise.all(
        results.map(async ({ url }) => {
          const req = await fetch(url);
          const json = await req.json();
          return json;
        })
      );

      setPokemons(dadosPokemons);
      setMsgLoading(null);
    };
    searchPokemons();
  }, [limit]);

  // aumenta o valor de limit para buscar mais pokemons
  const viewMore = () => {
    setLimit((limit) => limit + 20);
  };

  const searchPokemon = async (event) => {
    event.preventDefault();
    if (input) {
      setPokemons(null);
      setPokemons(await fetchApi(`https://pokeapi.co/api/v2/pokemon/${input}`));
      setMsgLoading(null);
    } else {
      setLimit(20);
    }
  };

  return (
    <main>
      <form>
        <input
          type="text"
          value={input}
          ref={inputElement}
          placeholder="Search for Pokemons"
          onChange={({ target }) => setInput(target.value)}
        />
        <button className="btn-search" onClick={searchPokemon}>
          Search
        </button>
      </form>

      {pokemons && <ContainerPokemons pokemons={pokemons} />}

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
