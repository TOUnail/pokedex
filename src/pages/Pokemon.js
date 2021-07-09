import React from "react";

import { useSinglePokemon } from "../hooks/useSinglePokemon";

const Pokemon = (props) => {
  let id = props.match.params.id;
  const pokemon = useSinglePokemon(id);
  console.log(pokemon);
  return (
    <div>
      {pokemon.isLoading && <p>Loading Pokemon</p>}
      {pokemon.isError && <p>Error</p>}
      {pokemon.isSuccess && <div>{pokemon.data?.name}</div>}
    </div>
  );
};

export default Pokemon;
