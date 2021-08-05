import { useState } from "react";
import { useAbility } from "../../hooks/useAbility";
import { effectEntry } from "../../helpers/ability";
const Ability = ({ url }) => {
  const [generation, setGeneration] = useState("sun-moon");
  const { data, isLoading, isError, isSuccess } = useAbility(url);
  let formattedEffect = effectEntry(data?.data.effect_entries);
  return (
    <>
      {isLoading && <p>Loading Ability</p>}
      {isError && <p>Error</p>}
      {isSuccess && <div>{formattedEffect.effect}</div>}
    </>
  );
};

export default Ability;
