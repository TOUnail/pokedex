import { useQuery } from "react-query";
import axios from "axios";
const fetchData = async (url) => {
  try {
    const data = await axios.get(url);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const usePokemonInitData = (url) => {
  return useQuery(["initData", url], () => fetchData(url), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
