import axios from "axios";
import { useQuery } from "react-query";
import EvolutionProfile from "./EvolutionProfile";
import EvolutionDetail from "./EvolutionDetail";

const Evolution = ({ url }) => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["evolution", url],
    () => {
      return axios.get(url);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  let base = data?.data.chain.species;
  let firstEvolution =
    data?.data.chain.evolves_to.length > 0
      ? data?.data.chain.evolves_to
      : undefined;
  let secondEvolution;
  if (data?.data.chain.evolves_to[0] !== undefined) {
    if (data?.data.chain.evolves_to[0].evolves_to[0] !== undefined) {
      secondEvolution = data?.data.chain.evolves_to[0].evolves_to;
    }
  }
  console.log(data);
  return (
    <>
      {isLoading && <div>Loading</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <>
          {base.name === "eevee" ? (
            <>
              <div className="eevee-row align-items-center">
                <div className="base-eevee d-flex align-items-center justify-content-center">
                  <EvolutionProfile name={base.name} url={base.url} />
                </div>
                <>
                  {firstEvolution.slice(0, 3).map((pokemon, index) => (
                    <EvolutionDetail
                      key={`${pokemon.species.name}-arrow-${index}`}
                      details={pokemon.evolution_details[0]}
                    />
                  ))}
                </>
                <>
                  {firstEvolution.slice(0, 3).map((eevee) => (
                    <EvolutionProfile
                      name={eevee.species.name}
                      key={eevee.species.name}
                      url={eevee.species.url}
                    />
                  ))}
                </>
              </div>
              <div className="eevee-row eevee-gen-ii align-items-center">
                <div className="base-eevee d-flex align-items-center justify-content-center">
                  <EvolutionProfile name={base.name} url={base.url} />
                </div>
                {firstEvolution.slice(3, 5).map((pokemon, index) => (
                  <EvolutionDetail
                    key={`${pokemon.species.name}-arrow-${index}`}
                    details={pokemon.evolution_details[0]}
                  />
                ))}
                {firstEvolution.slice(3, 5).map((eevee) => (
                  <EvolutionProfile
                    name={eevee.species.name}
                    key={eevee.species.name}
                    url={eevee.species.url}
                  />
                ))}
              </div>
              <div className="eevee-row align-items-center">
                <div className="base-eevee d-flex align-items-center justify-content-center">
                  <EvolutionProfile name={base.name} url={base.url} />
                </div>
                {firstEvolution.slice(5, 8).map((pokemon, index) => (
                  <EvolutionDetail
                    key={`${pokemon.species.name}-arrow-${index}`}
                    details={pokemon.evolution_details[0]}
                  />
                ))}
                {firstEvolution.slice(5, 8).map((eevee) => (
                  <EvolutionProfile
                    name={eevee.species.name}
                    key={eevee.species.name}
                    url={eevee.species.url}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="row justify-content-center align-items-center flex-nowrap">
              {data.data.chain.evolves_to.length === 0 ? (
                <div className="col">does not evolve</div>
              ) : (
                <>
                  <div className="col base-evo">
                    <EvolutionProfile name={base.name} url={base.url} />
                  </div>
                  <div className="col arrow">
                    {firstEvolution.length > 1
                      ? firstEvolution.map((pokemon, index) => (
                          <EvolutionDetail
                            key={`${pokemon.species.name}-arrow-${index}`}
                            details={pokemon.evolution_details[0]}
                          />
                        ))
                      : firstEvolution.map((pokemon, index) => (
                          <EvolutionDetail
                            key={`${pokemon.species.name}-arrow-${index}`}
                            details={pokemon.evolution_details[0]}
                          />
                        ))}
                  </div>
                  <div className="col first-evo">
                    {firstEvolution.length > 1
                      ? firstEvolution.map((pokemon) => (
                          <EvolutionProfile
                            name={pokemon.species.name}
                            key={pokemon.species.name}
                            url={pokemon.species.url}
                          />
                        ))
                      : firstEvolution.map((pokemon) => (
                          <EvolutionProfile
                            name={pokemon.species.name}
                            key={pokemon.species.name}
                            url={pokemon.species.url}
                          />
                        ))}
                  </div>
                  {secondEvolution && (
                    <>
                      <div
                        className={`col arrow${
                          secondEvolution.length > 1
                            ? " d-flex flex-column flex-grow-1"
                            : ""
                        }`}
                      >
                        {secondEvolution.length > 1
                          ? secondEvolution.map((pokemon, index) => (
                              <EvolutionDetail
                                key={`${pokemon.species.name}-arrow-${index}`}
                                details={pokemon.evolution_details[0]}
                              />
                            ))
                          : secondEvolution.map((pokemon, index) => (
                              <EvolutionDetail
                                key={`${pokemon.species.name}-arrow-${index}`}
                                details={pokemon.evolution_details[0]}
                              />
                            ))}
                      </div>
                      <div className="col second-evo">
                        {secondEvolution.length > 1
                          ? secondEvolution.map((pokemon) => (
                              <EvolutionProfile
                                name={pokemon.species.name}
                                key={pokemon.species.name}
                                url={pokemon.species.url}
                              />
                            ))
                          : secondEvolution.map((pokemon) => (
                              <EvolutionProfile
                                name={pokemon.species.name}
                                key={pokemon.species.name}
                                url={pokemon.species.url}
                              />
                            ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Evolution;
