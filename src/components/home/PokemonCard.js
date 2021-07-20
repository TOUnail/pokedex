import axios from "axios";
import { Link } from "react-router-dom";
import Types from "../Types";
import { useQueryClient } from "react-query";
import { usePokemonInitData } from "../../hooks/usePokemonInitData";

const PokemonCard = ({ pokemon }) => {
  const { name, url } = pokemon;
  const { isLoading, isSuccess, data } = usePokemonInitData(url);
  const queryClient = useQueryClient();
  // console.log(initData);
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
  return (
    <Link
      onMouseEnter={async () => {
        await queryClient.prefetchQuery(
          ["singlePokemon", url],
          () => getPokemonData(url),
          { staleTime: Infinity }
        );
      }}
      className="text-decoration-none"
      to={`/pokemon/${url.split("/").slice(-2, -1)[0]}`}
    >
      <div className="card rounded-0 pokemon-card">
        <div className="card-body d-flex justify-content-between align-items-center py-0">
          <div className="d-flex align-items-center">
            <figure
              className="img-wrapper m-0 d-flex justify-content-center align-items-center"
              style={{ width: "96px", height: "96px" }}
            >
              {isLoading && (
                <div
                  className="spinner-border text-secondary p-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {isSuccess && (
                <img
                  src={data?.data.sprites["front_default"]}
                  alt={name}
                  style={{
                    display: isLoading ? "none" : "block",
                    imageRendering: "pixelated",
                  }}
                />
              )}
            </figure>
            <p className="mb-0 text-capitalize">
              {name}
              <br />
              {isSuccess && (
                <span className="text-muted">
                  #
                  {data?.data.id.toLocaleString("en", {
                    minimumIntegerDigits: 3,
                  })}
                </span>
              )}
            </p>
          </div>
          <ul className="list-inline mb-0 d-flex">
            {isSuccess &&
              data?.data.types.map((type) => (
                <li key={type.type.name} className="list-inline-item">
                  <Types type={type.type.name} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
