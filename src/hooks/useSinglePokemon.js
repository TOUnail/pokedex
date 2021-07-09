import axios from "axios";
import { useQuery } from "react-query";

const fetchPokemonById = async (id) => {
  const baseUrl = () => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  };
  const pokemonSpecies = () => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  };

  const data = await Promise.all([baseUrl(), pokemonSpecies()])
    .then((res) => {
      let combinedData = Object.assign({}, res[0].data, res[1].data);
      return combinedData;
    })
    .catch((err) => console.log(err));
  return data;
};

export const useSinglePokemon = (id) => {
  return useQuery(
    ["singlePokemon", `https://pokeapi.co/api/v2/pokemon/${id}/`],
    () => fetchPokemonById(id),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  );
};
