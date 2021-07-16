import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useIsFetching, useQueryClient } from "react-query";
import { usePokemon } from "../hooks/usePokemon";

const Home = (props) => {
  let { gen, setGen } = props;
  const queryClient = useQueryClient();
  const pokemon = usePokemon(gen);
  const isFetching = useIsFetching();
  const getPokemonData = async (url) => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };
  const handleGenClick = (genNumber) => {
    setGen(genNumber);
  };
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
          {/* <button onClick={() => handleGenClick(0)}>skip to 1st gen</button>
          <button onClick={() => handleGenClick(151)}>skip to 2nd gen</button>
          <button onClick={() => handleGenClick(251)}>skip to 3rd gen</button> */}
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
