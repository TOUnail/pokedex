import { useSinglePokemon } from "../../hooks/useSinglePokemon";

const EvolutionProfile = ({ name, url }) => {
  const id = url.split("/").slice(-2, -1)[0];
  const { data, isLoading, isError, isSuccess } = useSinglePokemon(id);
  // console.log(data);
  return (
    <div className="text-center">
      <img
        width={250}
        height={250}
        src={data?.sprites["front_default"]}
        alt={data?.name}
        style={{ imageRendering: "pixelated" }}
        className="img-fluid mx-auto"
      />
      <p className="text-capitalize">
        {name}
        <br />#
        {data?.id.toLocaleString("en", {
          minimumIntegerDigits: 3,
        })}
      </p>
    </div>
  );
};

export default EvolutionProfile;
