import { useIsFetching } from "react-query";
import { usePokemon } from "../hooks/usePokemon";
import PokemonCard from "../components/home/PokemonCard";

const Home = (props) => {
  let { gen, setGen } = props;
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
  const handleGenClick = (genNumber) => {
    setGen(genNumber);
  };
  // console.log(data);
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
                  <PokemonCard pokemon={res} />
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
