import { usePokemonInitData } from "../../hooks/usePokemonInitData";

const PokemonCard = ({ pokemon }) => {
  const { name, url } = pokemon;
  const initData = usePokemonInitData(url);
  console.log(initData);
  return (
    <div className="card rounded-0 pokemon-card">
      <div className="card-body d-flex justify-content-between align-items-center py-0">
        <div className="d-flex align-items-center">
          <figure
            className="img-wrapper m-0 d-flex justify-content-center align-items-center"
            style={{ width: "96px", height: "96px" }}
          >
            {initData.isLoading && (
              <div className="spinner-border text-secondary p-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {initData.isSuccess && (
              <img
                src={initData.data.data.sprites["front_default"]}
                alt={name}
                style={{
                  display: initData.isLoading ? "none" : "block",
                  imageRendering: "pixelated",
                }}
              />
            )}
          </figure>
          <p className="mb-0 text-capitalize">
            {name}
            <br />
            {initData.isSuccess && (
              <span className="text-muted">
                {initData.data.data.id.toLocaleString("en", {
                  minimumIntegerDigits: 3,
                })}
              </span>
            )}
          </p>
        </div>
        <ul className="list-inline mb-0 d-flex">
          {initData.isSuccess &&
            initData.data.data.types.map((type) => (
              <p key={type.type.name}>{type.type.name}</p>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
