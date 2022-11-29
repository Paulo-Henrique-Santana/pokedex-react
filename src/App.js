import React from "react";
import Header from "./Header";
import ContainerPokemons from "./ContainerPokemons";

function App() {
  const [urlPokemons, setUrlPokemons] = React.useState(null);

  React.useEffect(() => {
    const buscarApi = async () => {
      const req = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const json = await req.json();
      setUrlPokemons(json.results);
    };
    buscarApi();
  }, []);

  return (
    <>
      <Header />
      {urlPokemons && <ContainerPokemons urlPokemons={urlPokemons} />}
    </>
  );
}

export default App;
