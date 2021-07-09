import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useIsFetching, useQueryClient } from "react-query";
import { usePokemon } from "../hooks/usePokemon";

const Home = () => {
  // TODO: Figure out infinite queries/loading
  const queryClient = useQueryClient();
  const pokemon = usePokemon();
  const isFetching = useIsFetching();

  const getPokemonData = async (url) => {
    const baseUrl = () => {
      return axios.get(url);
    };
    const pokemonSpecies = () => {
      return axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${
          url.split("/").slice(-2, -1)[0]
        }`
      );
    };
    const data = await Promise.all([baseUrl(), pokemonSpecies()])
      .then((res) => {
        let combinedData = Object.assign({}, res[0].data, res[1].data);
        return combinedData;
      })
      .catch((err) => console.log(err));
    return data;
  };
  console.log(pokemon);
  return (
    <div>
      {pokemon.isLoading && <p>Loading Pokemon</p>}
      {pokemon.isError && <p>Error</p>}
      {pokemon.isSuccess && (
        <>
          <ul style={{ display: "inline-block" }}>
            {pokemon.data?.pages.map((p) =>
              p.results.map((res) => (
                <li
                  key={res.url}
                  onMouseEnter={async () => {
                    await queryClient.prefetchQuery(
                      ["singlePokemon", res.url],
                      () => getPokemonData(res.url),
                      { staleTime: 10 * 1000 }
                    );
                  }}
                >
                  <Link to={`/pokemon/${res.url.split("/").slice(-2, -1)[0]}`}>
                    {res.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
          <button onClick={() => pokemon.fetchNextPage()}>
            {pokemon.isFetchingNextPage
              ? "Loading more..."
              : pokemon.hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </>
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
