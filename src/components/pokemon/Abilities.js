import { Fragment } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import Modal from "../Modal";
import useModal from "../../hooks/useModal";
import Ability from "./Ability";

const AbilityLabel = ({ ability, url }) => {
  const { open, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const getAbilityData = async (url) => {
    try {
      const data = await axios.get(url);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Fragment>
      <button
        onMouseEnter={async () => {
          await queryClient.prefetchQuery(
            ["ability", url],
            () => getAbilityData(url),
            { staleTime: Infinity }
          );
        }}
        onClick={openModal}
      >
        {ability}
      </button>
      <Modal title={ability} open={open} hide={closeModal}>
        <Ability url={url} />
      </Modal>
    </Fragment>
  );
};

const Abilities = ({ abilities }) => {
  return (
    <div>
      {abilities.map((ability) => (
        <Fragment key={ability.ability.name}>
          <AbilityLabel
            url={ability.ability.url}
            ability={ability.ability.name}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default Abilities;
