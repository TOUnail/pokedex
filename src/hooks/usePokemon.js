import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

const fetchPokemon = async ({ pageParams = 0 }) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParams}&limit=10`
  );
  return data;
};

export const usePokemon = () => {
  // return useQuery("pokemon", fetchPokemon, { refetchOnWindowFocus: false });
  return useInfiniteQuery("pokemon", fetchPokemon, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
};
