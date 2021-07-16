import qs from "qs";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

export const usePokemon = (gen) => {
  const {
    data,
    fetchNextPage,
    isSuccess,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchMore,
  } = useInfiniteQuery(
    ["pokemon", gen],
    async (pageParam) => {
      try {
        let offset;
        if (pageParam.pageParam !== undefined) {
          offset = Number(pageParam.pageParam);
        } else {
          offset = gen;
        }
        const pokemonData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
        );
        return pokemonData.data;
      } catch (e) {
        console.log(e);
      }
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const lastOffset = qs.parse(
          lastPage.next.replace("https://pokeapi.co/api/v2/pokemon", ""),
          { ignoreQueryPrefix: true }
        );
        if (lastOffset.offset > 1118) {
          return undefined;
        }
        return lastOffset.offset;
      },
      staleTime: 1000,
    }
  );

  return {
    data,
    fetchNextPage,
    isSuccess,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchMore,
  };
};
