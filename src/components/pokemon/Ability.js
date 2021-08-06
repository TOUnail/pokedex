import { useState } from "react";
import { useAbility } from "../../hooks/useAbility";
import { effectEntry, flavorTextEntry } from "../../helpers/ability";
const Ability = ({ url }) => {
  const [generation, setGeneration] = useState("sun-moon");
  const { data, isLoading, isError, isSuccess } = useAbility(url);
  let formattedEffect = effectEntry(data?.data.effect_entries);
  let formattedFlavorText = flavorTextEntry(
    data?.data.flavor_text_entries,
    generation
  );
  console.log(formattedFlavorText);
  return (
    <>
      {isLoading && <p>Loading Ability</p>}
      {isError && <p>Error</p>}
      {isSuccess && (
        <>
          <p className="fw-bold mb-0">Description</p>
          <p>{formattedFlavorText.flavor_text}</p>
          <p className="fw-bold mb-0">Effect</p>
          <p>{formattedEffect.effect}</p>
        </>
      )}
    </>
  );
};

export default Ability;
