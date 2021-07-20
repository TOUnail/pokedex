import axios from "axios";
import { useQuery } from "react-query";

const Evolution = ({ url }) => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    "evolution",
    () => {
      return axios.get(url);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 1,
      staleTime: 1,
    }
  );
  return (
    <>
      {isLoading && <div>Loading</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <div>
          {data.data.chain.evolves_to.length === 0 ? (
            <div>does not evolve</div>
          ) : (
            <div>evolves</div>
          )}
        </div>
      )}
    </>
  );
};
export default Evolution;
