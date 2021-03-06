import "../components/pokemon/Pokemon.scss";
import Body from "../components/pokemon/Body";
import Types from "../components/Types";

import { useHistory } from "react-router-dom";
import { useSinglePokemon } from "../hooks/useSinglePokemon";

const Pokemon = (props) => {
  let id = props.match.params.id;
  const { data, isLoading, isError, isSuccess } = useSinglePokemon(id);
  let history = useHistory();
  const prevPage = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push("/");
    }
  };
  // console.log(data);
  return (
    <>
      {isLoading && <p>Loading Pokemon</p>}
      {isError && <p>Error</p>}
      {isSuccess && (
        <>
          <div className={`masthead ${data?.types[0].type.name}`}>
            <div className="container">
              <header className="row align-items-center justify-content-between">
                <div className="col">
                  <button
                    onClick={() => prevPage()}
                    className="btn btn-link p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.2971,11.707085 L0.59,7.999975 L4.2971,4.292875 C4.6876,3.902375 5.3208,3.902375 5.7113,4.292875 C6.10183,4.683375 6.10183,5.316575 5.7113,5.707075 L4.4184,6.999975 L14.0042,6.999975 C14.55649,6.999975 15.0042,7.447695 15.0042,7.999975 C15.0042,8.552255 14.55649,8.999975 14.0042,8.999975 L4.4184,8.999975 L5.7113,10.292865 C6.10183,10.683395 6.10183,11.316555 5.7113,11.707085 C5.3208,12.097605 4.6876,12.097605 4.2971,11.707085 Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="col text-end">
                  <div className="d-flex justify-content-end align-items-baseline">
                    <p className="mb-0 text-muted">
                      #
                      {data.id.toLocaleString("en", {
                        minimumIntegerDigits: 3,
                      })}
                    </p>
                    <div className="d-flex flex-column align-items-end">
                      <h1 className="mb-0 ms-2 text-capitalize">
                        {data?.name}
                      </h1>
                      <ul className="list-inline mb-0 d-flex">
                        {data.types.map((type) => (
                          <li key={type.type.name} className="list-inline-item">
                            <Types type={type.type.name} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </header>

              <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6">
                  <img
                    width={250}
                    height={250}
                    src={data?.sprites["front_default"]}
                    alt={data?.name}
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Body data={data} />
        </>
      )}
    </>
  );
};

export default Pokemon;
