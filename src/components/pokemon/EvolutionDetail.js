import { evolutionDetails } from "../../helpers/evolutionDetails";
const EvolutionDetail = ({ details }) => {
  // console.log(details);
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="list-unstyled m-0">{evolutionDetails(details)}</ul>
      <svg
        className="evo-arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path
          fill="#000000"
          fillRule="evenodd"
          d="M11.7071,4.29289 L15.4142,8 L11.7071,11.7071 C11.3166,12.0976 10.6834,12.0976 10.2929,11.7071 C9.90237,11.3166 9.90237,10.6834 10.2929,10.2929 L11.5858,9 L2,9 C1.44771,9 1,8.55228 1,8 C1,7.44772 1.44771,7 2,7 L11.5858,7 L10.2929,5.70711 C9.90237,5.31658 9.90237,4.68342 10.2929,4.29289 C10.6834,3.90237 11.3166,3.90237 11.7071,4.29289 Z"
        />
      </svg>
    </div>
  );
};

export default EvolutionDetail;
