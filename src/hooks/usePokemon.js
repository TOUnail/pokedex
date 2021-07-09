import axios from "axios";
import { useQuery } from "react-query";

const fetchPokemon = () =>
  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((res) => res.data);
// const fetchOnePokemon = (url) => axios.get(url).then((res) => res.data);

export const usePokemon = () => {
  return useQuery("pokemon", fetchPokemon, { refetchOnWindowFocus: false });
};

export const getPokemonData = async (url) => {
  const { data } = await axios.get(url).then((res) => res.data);
  return data;
  //   return useQuery(["pokemon", url], () => fetchOnePokemon(url), {
  //     refetchOnWindowFocus: false,
  //   });
  // console.log(url);
};
