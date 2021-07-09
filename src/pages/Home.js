import React from "react";
import { useIsFetching, useQueryClient } from "react-query";
import { usePokemon, getPokemonData } from "../hooks/usePokemon";

const Home = () => {
  const queryClient = useQueryClient();
  const pokemon = usePokemon();
  //   const handleMouseOver = (url) => {
  //     UsePokemonData(url);
  //   };
  const isFetching = useIsFetching();
  return (
    <div>
      {pokemon.isLoading && <p>Loading Pokemon</p>}
      {pokemon.isError && <p>Error</p>}
      {pokemon.isSuccess && (
        <ul>
          {pokemon.data.results.map((res) => (
            <li
              key={res.url}
              onMouseEnter={async () => {
                await queryClient.prefetchQuery(
                  ["pokemon", res.url],
                  () => getPokemonData(res.url),
                  { staleTime: 10 * 1000 }
                );
              }}
            >
              {res.name}
            </li>
          ))}
        </ul>
      )}
      {/* {isFetching ? (
        <p style={{ position: "fixed", top: "2%", right: "2%" }}>Fetching</p>
      ) : null} */}
      {isFetching && (
        <p style={{ position: "fixed", top: "2%", right: "2%" }}>Fetching</p>
      )}
    </div>
  );
};

export default Home;
