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

  // atualiza sempre que o valor de limit for alterado
  React.useEffect(() => {
    searchPokemons();
  }, [limit]);

  // aumenta o valor de limit para buscar mais pokemons
  const viewMore = () => {
    setLimit((limit) => limit + 20);
  };

  const searchPokemon = async (event) => {
    event.preventDefault();
    if (input) {
      // limpa os pokemons enquanto pesquisa
      setPokemons(null);
      try {
        const pokemon = await fetchApi(
          `https://pokeapi.co/api/v2/pokemon/${input}`
        );
        // verifica se a imagem do pokemon existe antes de retorná-lo
        const urlImg =
          pokemon.sprites.versions["generation-v"]["black-white"].animated[
            "front_default"
          ];
        if (urlImg) {
          setPokemons(pokemon);
          setMsgLoading(null);
        } else setMsgLoading("Pokemon not found");
      } catch (error) {
        setMsgLoading("Pokemon not found");
      }
    } else {
      // busca os primeiros pokemons quando pesquisar com o campo vazio
      setLimit(20);
      searchPokemons();
    }
  };

  return (
    <main>
      <form>
        <input
          type="text"
          value={input}
          ref={inputElement}
          placeholder='Ex: "charmander", "37"'
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
