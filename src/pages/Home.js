import axios from "axios";
import { Link } from "react-router-dom";
import { useIsFetching, useQueryClient } from "react-query";
import { usePokemon } from "../hooks/usePokemon";
import PokemonCard from "../components/home/PokemonCard";

const Home = (props) => {
  let { gen, setGen } = props;
  const queryClient = useQueryClient();
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePokemon(gen);
  const isFetching = useIsFetching();
  const getPokemonData = async (url) => {
    try {
      const baseUrl = () => {
        return axios.get(url);
      };
      const pokemonSpecies = () => {
        return axios.get(url).then((response) => {
          return axios.get(response.data.species.url);
        });
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
      {isLoading && <p>Loading Pokemon</p>}
      {isError && <p>Error</p>}
      {isSuccess && (
        <div className="container-md home-container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-0 g-md-3">
            {data?.pages.map((p) =>
              p.results.map((res) => (
                <div key={res.name} className="col">
                  <Link
                    onMouseEnter={async () => {
                      await queryClient.prefetchQuery(
                        ["singlePokemon", res.url],
                        () => getPokemonData(res.url),
                        { staleTime: Infinity }
                      );
                    }}
                    key={res.name}
                    to={`/pokemon/${res.url.split("/").slice(-2, -1)[0]}`}
                    className="text-decoration-none"
                  >
                    <PokemonCard pokemon={res} />
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="row gx-0 gx-lg-3 justify-content-center">
            <div className="col">
              <button
                className="d-block w-100 btn py-4"
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
          </div>
          {/* <button onClick={() => handleGenClick(0)}>skip to 1st gen</button>
          <button onClick={() => handleGenClick(151)}>skip to 2nd gen</button>
          <button onClick={() => handleGenClick(251)}>skip to 3rd gen</button> */}
        </div>
      )}
      {isFetching ? (
        <p style={{ position: "fixed", top: "2%", right: "2%" }}>Fetching</p>
      ) : null}
    </div>
  );
};

export default Home;
